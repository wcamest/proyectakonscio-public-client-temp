"use client";

import {
  type ButtonHTMLAttributes,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "bootstrap-icons/font/bootstrap-icons.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.25;

type ViewMode = "fit-width" | "custom";

export type PDFViewerClientProps = {
  src: string | File;
  fileName?: string;
  initialPage?: number;
  height?: CSSProperties["height"];
  className?: string;
};

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: string;
  label: string;
  showLabel?: boolean;
};

function IconButton({
  icon,
  label,
  showLabel = false,
  className = "",
  ...props
}: IconButtonProps) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      className={`
        inline-flex h-9 shrink-0 items-center justify-center gap-2
        rounded-md border border-neutral-300 bg-white px-2.5
        text-sm text-neutral-800 transition-colors
        hover:bg-neutral-100 active:bg-neutral-200
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-blue-500
        disabled:cursor-not-allowed disabled:opacity-40
        ${className}
      `}
      {...props}
    >
      <i className={`bi ${icon} text-base leading-none`} aria-hidden="true" />

      {showLabel && (
        <span className="hidden xl:inline">{label}</span>
      )}
    </button>
  );
}

export default function PDFViewerClient({
  src,
  fileName,
  initialPage = 1,
  height = "82dvh",
  className = "",
}: PDFViewerClientProps) {
  const viewerRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  // <article> entrega HTMLElement, no HTMLDivElement.
  const pagesRef = useRef<Map<number, HTMLElement>>(new Map());

  const animationFrameRef = useRef<number | null>(null);
  const currentPageRef = useRef(initialPage);

  const [numberOfPages, setNumberOfPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageInput, setPageInput] = useState(String(initialPage));

  const [viewportWidth, setViewportWidth] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [viewMode, setViewMode] = useState<ViewMode>("fit-width");
  const [rotation, setRotation] = useState(0);

  const [pagesPanelOpen, setPagesPanelOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [loadProgress, setLoadProgress] = useState<number | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [sourceUrl, setSourceUrl] = useState<string | null>(
    typeof src === "string" ? src : null
  );

  const updateCurrentPage = useCallback((page: number) => {
    currentPageRef.current = page;
    setCurrentPage(page);
    setPageInput(String(page));
  }, []);

  /* eslint-disable react-hooks/set-state-in-effect -- source state mirrors an external string/File prop and browser-created object URL */
  useEffect(() => {
    if (typeof src === "string") {
      setSourceUrl(src);
      return;
    }

    const objectUrl = URL.createObjectURL(src);
    setSourceUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [src]);
  /* eslint-enable react-hooks/set-state-in-effect */

  /* eslint-disable react-hooks/set-state-in-effect -- changing document identity intentionally resets the viewer session */
  useEffect(() => {
    const nextPage = Math.max(1, initialPage);

    pagesRef.current.clear();
    currentPageRef.current = nextPage;

    setNumberOfPages(0);
    setCurrentPage(nextPage);
    setPageInput(String(nextPage));
    setLoadProgress(null);
    setLoadError(null);
    setRotation(0);
    setPagesPanelOpen(false);
    setMobileToolsOpen(false);
  }, [src, initialPage]);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    const updateWidth = () => setViewportWidth(viewport.clientWidth);

    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(viewport);

    return () => observer.disconnect();
  }, [numberOfPages, pagesPanelOpen]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === viewerRef.current);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener(
        "fullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);

  useEffect(() => {
    const closeDesktopMobileTools = () => {
      if (window.innerWidth >= 768) {
        setMobileToolsOpen(false);
      }
    };

    window.addEventListener("resize", closeDesktopMobileTools);

    return () => {
      window.removeEventListener("resize", closeDesktopMobileTools);

      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const clampPage = useCallback(
    (page: number) =>
      Math.min(Math.max(page, 1), Math.max(numberOfPages, 1)),
    [numberOfPages]
  );

  const scrollToPage = useCallback(
    (requestedPage: number, behavior: ScrollBehavior = "smooth") => {
      if (!numberOfPages) {
        return;
      }

      const page = clampPage(requestedPage);
      const viewport = viewportRef.current;
      const pageElement = pagesRef.current.get(page);

      updateCurrentPage(page);

      if (!viewport || !pageElement) {
        return;
      }

      const viewportRect = viewport.getBoundingClientRect();
      const pageRect = pageElement.getBoundingClientRect();
      const targetTop =
        viewport.scrollTop + pageRect.top - viewportRect.top - 16;

      viewport.scrollTo({
        top: targetTop,
        behavior,
      });

      if (window.innerWidth < 768) {
        setPagesPanelOpen(false);
      }
    },
    [clampPage, numberOfPages, updateCurrentPage]
  );

  useEffect(() => {
    if (!numberOfPages) {
      return;
    }

    const frameId = requestAnimationFrame(() => {
      scrollToPage(clampPage(initialPage), "auto");
    });

    return () => cancelAnimationFrame(frameId);
  }, [numberOfPages, initialPage, clampPage, scrollToPage]);

  const handleViewportScroll = () => {
    if (animationFrameRef.current !== null) {
      return;
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      const viewport = viewportRef.current;

      if (!viewport) {
        animationFrameRef.current = null;
        return;
      }

      const viewportRect = viewport.getBoundingClientRect();
      let mostVisiblePage = currentPageRef.current;
      let largestVisibleArea = 0;
      let smallestTopDistance = Number.POSITIVE_INFINITY;

      pagesRef.current.forEach((pageElement, pageNumber) => {
        const pageRect = pageElement.getBoundingClientRect();
        const visibleTop = Math.max(pageRect.top, viewportRect.top);
        const visibleBottom = Math.min(pageRect.bottom, viewportRect.bottom);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        const topDistance = Math.abs(pageRect.top - viewportRect.top);

        if (
          visibleHeight > largestVisibleArea ||
          (visibleHeight === largestVisibleArea &&
            topDistance < smallestTopDistance)
        ) {
          largestVisibleArea = visibleHeight;
          smallestTopDistance = topDistance;
          mostVisiblePage = pageNumber;
        }
      });

      if (
        largestVisibleArea > 0 &&
        mostVisiblePage !== currentPageRef.current
      ) {
        updateCurrentPage(mostVisiblePage);
      }

      animationFrameRef.current = null;
    });
  };

  const commitPageInput = () => {
    const parsedPage = Number.parseInt(pageInput, 10);

    if (Number.isNaN(parsedPage)) {
      setPageInput(String(currentPageRef.current));
      return;
    }

    scrollToPage(parsedPage);
  };

  const getCurrentZoom = () => {
    if (viewMode === "custom") {
      return zoom;
    }

    const horizontalPadding = viewportWidth < 640 ? 24 : 48;
    const availableWidth = Math.max(viewportWidth - horizontalPadding, 280);
    const baseWidth = Math.min(availableWidth, 900);

    return availableWidth / baseWidth;
  };

  const changeZoom = (amount: number) => {
    setViewMode("custom");
    setZoom(
      Math.min(
        MAX_ZOOM,
        Math.max(MIN_ZOOM, getCurrentZoom() + amount)
      )
    );
  };

  const selectZoom = (value: string) => {
    if (value === "fit-width") {
      setViewMode("fit-width");
      return;
    }

    const nextZoom = Number(value);

    if (!Number.isNaN(nextZoom)) {
      setZoom(nextZoom);
      setViewMode("custom");
    }
  };

  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await viewerRef.current?.requestFullscreen();
      }
    } catch {
      // Algunos navegadores pueden rechazar Fullscreen API.
    }
  };

  const getDownloadFileName = () => {
    if (fileName) {
      return fileName;
    }

    if (typeof src !== "string") {
      return src.name;
    }

    try {
      const url = new URL(src, window.location.href);
      const name = url.pathname.split("/").pop();

      return name ? decodeURIComponent(name) : "documento.pdf";
    } catch {
      return "documento.pdf";
    }
  };

  const downloadDocument = () => {
    if (!sourceUrl) {
      return;
    }

    const anchor = document.createElement("a");
    anchor.href = sourceUrl;
    anchor.download = getDownloadFileName();
    anchor.rel = "noopener noreferrer";

    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  };

  const openDocument = () => {
    if (sourceUrl) {
      window.open(sourceUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleViewerKeyDown = (
    event: ReactKeyboardEvent<HTMLElement>
  ) => {
    const target = event.target as HTMLElement;

    if (["INPUT", "SELECT", "TEXTAREA"].includes(target.tagName)) {
      return;
    }

    if (
      (event.ctrlKey || event.metaKey) &&
      ["+", "="].includes(event.key)
    ) {
      event.preventDefault();
      changeZoom(ZOOM_STEP);
      return;
    }

    if (
      (event.ctrlKey || event.metaKey) &&
      event.key === "-"
    ) {
      event.preventDefault();
      changeZoom(-ZOOM_STEP);
      return;
    }

    if (
      (event.ctrlKey || event.metaKey) &&
      event.key === "0"
    ) {
      event.preventDefault();
      setZoom(1);
      setViewMode("custom");
      return;
    }

    if (event.key === "PageUp") {
      event.preventDefault();
      scrollToPage(currentPageRef.current - 1);
    }

    if (event.key === "PageDown") {
      event.preventDefault();
      scrollToPage(currentPageRef.current + 1);
    }
  };

  const horizontalPadding = viewportWidth < 640 ? 24 : 48;
  const availableWidth = Math.max(
    viewportWidth - horizontalPadding,
    280
  );
  const basePageWidth = Math.min(availableWidth, 900);
  const renderedPageWidth =
    viewMode === "fit-width"
      ? availableWidth
      : Math.max(280, basePageWidth * zoom);

  return (
    <section
      ref={viewerRef}
      tabIndex={0}
      style={{ height: isFullscreen ? "100dvh" : height }}
      onKeyDown={handleViewerKeyDown}
      className={`
        flex size-full flex-col overflow-hidden
        text-neutral-900 focus:outline-none
        ${className}
      `}
    >
      <header className="z-40 shrink-0 border-b border-neutral-300 bg-white">
        <div className="flex min-h-12 items-center justify-between gap-1 p-1.5 sm:gap-2 sm:p-2">
          <div className="flex min-w-0 items-center gap-1">
            <IconButton
              icon={pagesPanelOpen ? "bi-layout-sidebar-inset" : "bi-list-ul"}
              label={
                pagesPanelOpen
                  ? "Ocultar panel de páginas"
                  : "Mostrar panel de páginas"
              }
              aria-pressed={pagesPanelOpen}
              onClick={() => setPagesPanelOpen((open) => !open)}
              className={pagesPanelOpen ? "bg-neutral-200" : ""}
            />

            <span className="mx-0.5 hidden h-6 w-px bg-neutral-300 sm:block" />

            <IconButton
              icon="bi-chevron-bar-left"
              label="Primera página"
              disabled={currentPage <= 1}
              onClick={() => scrollToPage(1)}
              className="hidden sm:inline-flex"
            />

            <IconButton
              icon="bi-chevron-left"
              label="Página anterior"
              disabled={currentPage <= 1}
              onClick={() => scrollToPage(currentPage - 1)}
            />

            <label className="flex h-9 shrink-0 items-center overflow-hidden rounded-md border border-neutral-300 bg-white">
              <span className="sr-only">Número de página</span>

              <input
                type="text"
                inputMode="numeric"
                value={pageInput}
                onChange={(event) => {
                  setPageInput(event.target.value.replace(/\D/g, ""));
                }}
                onBlur={commitPageInput}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    commitPageInput();
                    event.currentTarget.blur();
                  }

                  if (event.key === "Escape") {
                    setPageInput(String(currentPage));
                    event.currentTarget.blur();
                  }
                }}
                className="h-full w-9 border-0 bg-transparent px-1 text-center text-sm outline-none sm:w-12"
              />

              <span
                aria-live="polite"
                className="border-l border-neutral-300 px-1.5 text-xs text-neutral-600 sm:px-2 sm:text-sm"
              >
                / {numberOfPages || "—"}
              </span>
            </label>

            <IconButton
              icon="bi-chevron-right"
              label="Página siguiente"
              disabled={!numberOfPages || currentPage >= numberOfPages}
              onClick={() => scrollToPage(currentPage + 1)}
            />

            <IconButton
              icon="bi-chevron-bar-right"
              label="Última página"
              disabled={!numberOfPages || currentPage >= numberOfPages}
              onClick={() => scrollToPage(numberOfPages)}
              className="hidden sm:inline-flex"
            />
          </div>

          <div className="hidden items-center gap-1 md:flex">
            <IconButton
              icon="bi-zoom-out"
              label="Reducir zoom"
              onClick={() => changeZoom(-ZOOM_STEP)}
            />

            <label>
              <span className="sr-only">Nivel de zoom</span>

              <select
                value={
                  viewMode === "fit-width"
                    ? "fit-width"
                    : String(zoom)
                }
                onChange={(event) => selectZoom(event.target.value)}
                className="h-9 max-w-40 rounded-md border border-neutral-300 bg-white px-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="fit-width">Ajustar al ancho</option>
                <option value="0.5">50%</option>
                <option value="0.75">75%</option>
                <option value="1">100%</option>
                <option value="1.25">125%</option>
                <option value="1.5">150%</option>
                <option value="2">200%</option>
                <option value="3">300%</option>
              </select>
            </label>

            <IconButton
              icon="bi-zoom-in"
              label="Aumentar zoom"
              onClick={() => changeZoom(ZOOM_STEP)}
            />

            <span className="mx-0.5 h-6 w-px bg-neutral-300" />

            <IconButton
              icon="bi-arrow-counterclockwise"
              label="Rotar hacia la izquierda"
              onClick={() =>
                setRotation((current) => (current + 270) % 360)
              }
            />

            <IconButton
              icon="bi-arrow-clockwise"
              label="Rotar hacia la derecha"
              onClick={() =>
                setRotation((current) => (current + 90) % 360)
              }
            />

            <IconButton
              icon={isFullscreen ? "bi-fullscreen-exit" : "bi-fullscreen"}
              label={
                isFullscreen
                  ? "Salir de pantalla completa"
                  : "Pantalla completa"
              }
              onClick={toggleFullscreen}
            />

            <IconButton
              icon="bi-box-arrow-up-right"
              label="Abrir PDF"
              disabled={!sourceUrl}
              onClick={openDocument}
            />

            <IconButton
              icon="bi-download"
              label="Descargar PDF"
              disabled={!sourceUrl}
              onClick={downloadDocument}
            />
          </div>

          <IconButton
            icon={mobileToolsOpen ? "bi-x-lg" : "bi-sliders"}
            label={
              mobileToolsOpen
                ? "Ocultar herramientas"
                : "Mostrar herramientas"
            }
            aria-expanded={mobileToolsOpen}
            onClick={() => setMobileToolsOpen((open) => !open)}
            className="md:hidden"
          />
        </div>

        {mobileToolsOpen && (
          <div className="flex items-center gap-1 overflow-x-auto border-t border-neutral-200 p-1.5 md:hidden">
            <IconButton
              icon="bi-zoom-out"
              label="Reducir zoom"
              onClick={() => changeZoom(-ZOOM_STEP)}
            />

            <label className="shrink-0">
              <span className="sr-only">Nivel de zoom</span>

              <select
                value={
                  viewMode === "fit-width"
                    ? "fit-width"
                    : String(zoom)
                }
                onChange={(event) => selectZoom(event.target.value)}
                className="h-9 w-28 rounded-md border border-neutral-300 bg-white px-2 text-xs outline-none"
              >
                <option value="fit-width">Ancho</option>
                <option value="0.5">50%</option>
                <option value="0.75">75%</option>
                <option value="1">100%</option>
                <option value="1.25">125%</option>
                <option value="1.5">150%</option>
                <option value="2">200%</option>
                <option value="3">300%</option>
              </select>
            </label>

            <IconButton
              icon="bi-zoom-in"
              label="Aumentar zoom"
              onClick={() => changeZoom(ZOOM_STEP)}
            />

            <IconButton
              icon="bi-arrow-counterclockwise"
              label="Rotar hacia la izquierda"
              onClick={() =>
                setRotation((current) => (current + 270) % 360)
              }
            />

            <IconButton
              icon="bi-arrow-clockwise"
              label="Rotar hacia la derecha"
              onClick={() =>
                setRotation((current) => (current + 90) % 360)
              }
            />

            <IconButton
              icon={isFullscreen ? "bi-fullscreen-exit" : "bi-fullscreen"}
              label={
                isFullscreen
                  ? "Salir de pantalla completa"
                  : "Pantalla completa"
              }
              onClick={toggleFullscreen}
            />

            <IconButton
              icon="bi-box-arrow-up-right"
              label="Abrir PDF"
              disabled={!sourceUrl}
              onClick={openDocument}
            />

            <IconButton
              icon="bi-download"
              label="Descargar PDF"
              disabled={!sourceUrl}
              onClick={downloadDocument}
            />
          </div>
        )}
      </header>

      <Document
        file={src}
        onLoadProgress={({ loaded, total }) => {
          if (total > 0) {
            setLoadProgress(Math.round((loaded / total) * 100));
          }
        }}
        onLoadSuccess={({ numPages }) => {
          setNumberOfPages(numPages);
          setLoadProgress(100);
          setLoadError(null);
        }}
        onLoadError={(error) => setLoadError(error.message)}
        loading={
          <div className="flex min-h-0 flex-1 items-center justify-center bg-neutral-800 p-8 text-white">
            <div className="text-center">
              <i
                className="bi bi-file-earmark-pdf mb-3 block text-3xl"
                aria-hidden="true"
              />

              <div className="mb-3 text-sm">Cargando documento…</div>

              {loadProgress !== null && (
                <div className="h-2 w-48 overflow-hidden rounded-full bg-neutral-600">
                  <div
                    className="h-full bg-blue-500 transition-[width]"
                    style={{ width: `${loadProgress}%` }}
                  />
                </div>
              )}
            </div>
          </div>
        }
        error={
          <div className="flex min-h-0 flex-1 items-center justify-center bg-neutral-800 p-8 text-center text-red-300">
            <div>
              <i
                className="bi bi-file-earmark-x mb-3 block text-3xl"
                aria-hidden="true"
              />

              <p className="font-medium">
                No fue posible cargar el documento.
              </p>

              {loadError && (
                <p className="mt-2 max-w-xl text-sm text-red-200">
                  {loadError}
                </p>
              )}
            </div>
          </div>
        }
        className="relative flex min-h-0 flex-1 overflow-hidden"
      >
        {pagesPanelOpen && (
          <>
            <button
              type="button"
              aria-label="Cerrar panel de páginas"
              onClick={() => setPagesPanelOpen(false)}
              className="absolute inset-0 z-20 bg-black/45 md:hidden"
            />

            <aside className="absolute inset-y-0 left-0 z-30 flex w-64 shrink-0 flex-col border-r border-neutral-300 bg-neutral-100 shadow-xl md:static md:z-auto md:w-52 md:shadow-none">
              <div className="flex shrink-0 items-center justify-between border-b border-neutral-200 px-3 py-2">
                <span className="text-sm font-medium">
                  {numberOfPages} páginas
                </span>

                <IconButton
                  icon="bi-x-lg"
                  label="Cerrar panel de páginas"
                  onClick={() => setPagesPanelOpen(false)}
                  className="border-0 bg-transparent md:hidden"
                />
              </div>

              <nav
                aria-label="Páginas del documento"
                className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto overscroll-contain p-2"
              >
                {Array.from(
                  { length: numberOfPages },
                  (_, index) => {
                    const pageNumber = index + 1;
                    const selected = pageNumber === currentPage;

                    return (
                      <button
                        key={pageNumber}
                        type="button"
                        aria-current={selected ? "page" : undefined}
                        onClick={() => scrollToPage(pageNumber)}
                        className={`
                          flex shrink-0 items-center gap-2 rounded-md border
                          px-3 py-2 text-left text-sm transition-colors
                          ${
                            selected
                              ? "border-blue-600 bg-blue-600 text-white"
                              : "border-transparent bg-white hover:border-neutral-300 hover:bg-neutral-200"
                          }
                        `}
                      >
                        <i
                          className="bi bi-file-earmark"
                          aria-hidden="true"
                        />
                        Página {pageNumber}
                      </button>
                    );
                  }
                )}
              </nav>
            </aside>
          </>
        )}

        <div
          ref={viewportRef}
          onScroll={handleViewportScroll}
          className="min-h-0 min-w-0 flex-1 touch-pan-x touch-pan-y overflow-auto overscroll-contain bg-neutral-800"
        >
          {viewportWidth > 0 && (
            <div className="flex w-max min-w-full flex-col items-center gap-4 p-3 sm:gap-6 sm:p-6">
              {Array.from(
                { length: numberOfPages },
                (_, index) => {
                  const pageNumber = index + 1;

                  return (
                    <article
                      key={pageNumber}
                      ref={(element) => {
                        if (element) {
                          pagesRef.current.set(pageNumber, element);
                        } else {
                          pagesRef.current.delete(pageNumber);
                        }
                      }}
                      data-page={pageNumber}
                      aria-label={`Página ${pageNumber}`}
                      className="relative shrink-0 bg-white shadow-xl"
                    >
                      <Page
                        pageNumber={pageNumber}
                        width={renderedPageWidth}
                        rotate={rotation}
                        renderTextLayer
                        renderAnnotationLayer
                        loading={
                          <div
                            className="flex items-center justify-center bg-white text-sm text-neutral-500"
                            style={{
                              width: renderedPageWidth,
                              aspectRatio: "1 / 1.414",
                            }}
                          >
                            <i
                              className="bi bi-hourglass-split mr-2"
                              aria-hidden="true"
                            />
                            Cargando página {pageNumber}…
                          </div>
                        }
                        error={
                          <div
                            className="flex items-center justify-center bg-white p-8 text-sm text-red-600"
                            style={{
                              width: renderedPageWidth,
                              minHeight: 300,
                            }}
                          >
                            <i
                              className="bi bi-exclamation-triangle mr-2"
                              aria-hidden="true"
                            />
                            No se pudo renderizar la página {pageNumber}.
                          </div>
                        }
                      />

                      <span className="pointer-events-none absolute bottom-2 right-2 rounded bg-black/65 px-2 py-1 text-xs text-white">
                        {pageNumber}
                      </span>
                    </article>
                  );
                }
              )}
            </div>
          )}
        </div>
      </Document>
    </section>
  );
}