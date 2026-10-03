"use client";

import {
  type ChangeEvent,
  type KeyboardEvent,
  type ReactNode,
  type SyntheticEvent,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

type PlaybackIntent = "playing" | "paused";
type PlayReason = "manual" | "autoplay" | "resume";

export type VideoPlayerProps = {
  children: ReactNode;
  autoPlay?: boolean;
  pauseOnHide?: boolean;
  pauseOnPageHide?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  poster?: string;
  className?: string;
  videoClassName?: string;
  preload?: "none" | "metadata" | "auto";
  playsInline?: boolean;
  initialVolume?: number;
  visibilityThreshold?: number;
  disablePictureInPicture?: boolean;
  autoHideControls?: boolean;
  controlsHideDelay?: number;
  seekStep?: number;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  onTimeUpdate?: (currentTime: number, duration: number) => void;
  onVolumeChange?: (volume: number, muted: boolean) => void;
  onFullscreenChange?: (fullscreen: boolean) => void;
  onError?: (error: MediaError | null) => void;
};

type WebkitDocument = Document & {
  webkitFullscreenElement?: Element | null;
  webkitExitFullscreen?: () => void | Promise<void>;
};

type WebkitVideo = HTMLVideoElement & {
  webkitEnterFullscreen?: () => void;
  webkitExitFullscreen?: () => void;
  webkitDisplayingFullscreen?: boolean;
};

type PictureInPictureDocument = Document & {
  pictureInPictureEnabled?: boolean;
  pictureInPictureElement?: Element | null;
  exitPictureInPicture?: () => Promise<void>;
};

type PictureInPictureVideo = HTMLVideoElement & {
  requestPictureInPicture?: () => Promise<PictureInPictureWindow>;
};

const DEFAULT_HIDE_DELAY = 2500;
const DEFAULT_SEEK_STEP = 5;
const VOLUME_STEP = 0.05;

function clamp(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
}

export function formatVideoTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds <= 0) return "00:00";

  const totalSeconds = Math.floor(seconds);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const remainingSeconds = totalSeconds % 60;

  const mm = String(minutes).padStart(2, "0");
  const ss = String(remainingSeconds).padStart(2, "0");

  return hours > 0
    ? `${String(hours).padStart(2, "0")}:${mm}:${ss}`
    : `${mm}:${ss}`;
}

function joinClasses(
  ...classes: Array<string | undefined | null | false>
): string {
  return classes.filter(Boolean).join(" ");
}

function getMediaErrorMessage(error: MediaError | null): string {
  if (!error) return "No se pudo reproducir el video.";

  switch (error.code) {
    case MediaError.MEDIA_ERR_ABORTED:
      return "La reproducción fue interrumpida.";
    case MediaError.MEDIA_ERR_NETWORK:
      return "Ocurrió un problema de red al cargar el video.";
    case MediaError.MEDIA_ERR_DECODE:
      return "El navegador no pudo decodificar el video.";
    case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
      return "La fuente no está disponible o el formato no es compatible.";
    default:
      return "Ocurrió un error inesperado al reproducir el video.";
  }
}

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  if (target.isContentEditable) return true;

  const tag = target.tagName.toLowerCase();
  if (tag === "textarea" || tag === "select") return true;
  if (tag !== "input") return false;

  return (target as HTMLInputElement).type !== "range";
}

function Icon({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={joinClasses("h-5 w-5", className)}
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

function PlayIcon() {
  return (
    <Icon>
      <path
        fill="currentColor"
        d="M8.4 4.8a1 1 0 0 0-1.4.9v12.6a1 1 0 0 0 1.5.8l9.8-6.3a1 1 0 0 0 0-1.6L8.4 4.8Z"
      />
    </Icon>
  );
}

function PauseIcon() {
  return (
    <Icon>
      <path
        fill="currentColor"
        d="M6 5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5Zm7 0a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1V5Z"
      />
    </Icon>
  );
}

function VolumeIcon({ muted }: { muted: boolean }) {
  return (
    <Icon>
      <path
        fill="currentColor"
        d="M4 9h4l5-4a1 1 0 0 1 1.6.8v12.4A1 1 0 0 1 13 19l-5-4H4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1Z"
      />
      {muted ? (
        <path
          fill="currentColor"
          d="m17.4 9 1.6 1.6L20.6 9 22 10.4 20.4 12l1.6 1.6-1.4 1.4-1.6-1.6-1.6 1.6-1.4-1.4 1.6-1.6-1.6-1.6L17.4 9Z"
        />
      ) : (
        <path
          fill="currentColor"
          d="M17.2 7.8a1 1 0 0 1 1.4 0 6 6 0 0 1 0 8.4 1 1 0 1 1-1.4-1.4 4 4 0 0 0 0-5.6 1 1 0 0 1 0-1.4Z"
        />
      )}
    </Icon>
  );
}

function FullscreenIcon({ active }: { active: boolean }) {
  return active ? (
    <Icon>
      <path
        fill="currentColor"
        d="M9 4v5H4V7h3V4h2Zm6 0h2v3h3v2h-5V4ZM4 15h5v5H7v-3H4v-2Zm11 0h5v2h-3v3h-2v-5Z"
      />
    </Icon>
  ) : (
    <Icon>
      <path
        fill="currentColor"
        d="M4 10V4h6v2H6v4H4Zm10-6h6v6h-2V6h-4V4ZM4 14h2v4h4v2H4v-6Zm14 0h2v6h-6v-2h4v-4Z"
      />
    </Icon>
  );
}

function PictureInPictureIcon() {
  return (
    <Icon>
      <path
        fill="currentColor"
        d="M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-5v-2h5V5H6v12h5v2H6a2 2 0 0 1-2-2V5Zm8 7a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1v-6Zm2 1v4h5v-4h-5Z"
      />
    </Icon>
  );
}

function Spinner({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-black/70 px-3 py-2 text-sm text-white">
      <span
        className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
        aria-hidden="true"
      />
      <span>{label}</span>
    </div>
  );
}

const controlButtonClass =
  "inline-flex min-h-10 min-w-10 items-center justify-center rounded bg-black/45 p-2 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black";

const VideoPlayer = ({
  children,
  autoPlay = false,
  pauseOnHide = true,
  pauseOnPageHide = true,
  muted = true,
  loop = false,
  controls = true,
  poster,
  className,
  videoClassName,
  preload = "metadata",
  playsInline = true,
  initialVolume = 1,
  visibilityThreshold = 0.25,
  disablePictureInPicture = false,
  autoHideControls = true,
  controlsHideDelay = DEFAULT_HIDE_DELAY,
  seekStep = DEFAULT_SEEK_STEP,
  onPlay,
  onPause,
  onEnded,
  onTimeUpdate,
  onVolumeChange,
  onFullscreenChange,
  onError,
}: VideoPlayerProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hideControlsTimerRef = useRef<number | null>(null);
  const blurAnimationFrameRef = useRef<number | null>(null);

  const mountedRef = useRef(false);
  const playbackIntentRef = useRef<PlaybackIntent>(
    autoPlay ? "playing" : "paused",
  );
  const inViewportRef = useRef(true);
  const pageVisibleRef = useRef(true);
  const pausedByViewportRef = useRef(false);
  const pausedByPageRef = useRef(false);
  const endedRef = useRef(false);
  const actualPlayingRef = useRef(false);
  const seekingRef = useRef(false);
  const adjustingVolumeRef = useRef(false);
  const controlsFocusedRef = useRef(false);
  const lastNonZeroVolumeRef = useRef(1);
  const autoplayAttemptedRef = useRef(false);
  const fullscreenStateRef = useRef(false);

  const progressId = useId();
  const volumeId = useId();

  const safeInitialVolume = useMemo(
    () => clamp(initialVolume, 0, 1),
    [initialVolume],
  );
  const safeThreshold = useMemo(
    () => clamp(visibilityThreshold, 0, 1),
    [visibilityThreshold],
  );
  const safeHideDelay = useMemo(
    () => Math.max(0, Number.isFinite(controlsHideDelay) ? controlsHideDelay : DEFAULT_HIDE_DELAY),
    [controlsHideDelay],
  );
  const safeSeekStep = useMemo(
    () => Math.max(1, Number.isFinite(seekStep) ? seekStep : DEFAULT_SEEK_STEP),
    [seekStep],
  );

  const [playbackIntent, setPlaybackIntentState] = useState<PlaybackIntent>(
    autoPlay ? "playing" : "paused",
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [bufferedPercentage, setBufferedPercentage] = useState(0);
  const [volume, setVolume] = useState(safeInitialVolume);
  const [isMuted, setIsMuted] = useState(muted || safeInitialVolume === 0);
  const [isLoading, setIsLoading] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [error, setError] = useState<MediaError | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [supportsPictureInPicture, setSupportsPictureInPicture] =
    useState(false);
  const [isPictureInPicture, setIsPictureInPicture] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const setPlaybackIntent = useCallback((intent: PlaybackIntent) => {
    playbackIntentRef.current = intent;
    setPlaybackIntentState(intent);
  }, []);

  const clearHideControlsTimer = useCallback(() => {
    if (hideControlsTimerRef.current !== null) {
      window.clearTimeout(hideControlsTimerRef.current);
      hideControlsTimerRef.current = null;
    }
  }, []);

  const keepControlsVisible = useCallback(() => {
    clearHideControlsTimer();
    setShowControls(true);
  }, [clearHideControlsTimer]);

  const scheduleControlsHide = useCallback(() => {
    if (!controls || !autoHideControls || prefersReducedMotion) return;

    clearHideControlsTimer();
    setShowControls(true);

    const canHide =
      actualPlayingRef.current &&
      !error &&
      !seekingRef.current &&
      !adjustingVolumeRef.current &&
      !controlsFocusedRef.current;

    if (!canHide) return;

    hideControlsTimerRef.current = window.setTimeout(() => {
      if (
        mountedRef.current &&
        actualPlayingRef.current &&
        !seekingRef.current &&
        !adjustingVolumeRef.current &&
        !controlsFocusedRef.current
      ) {
        setShowControls(false);
      }
    }, safeHideDelay);
  }, [
    autoHideControls,
    clearHideControlsTimer,
    controls,
    error,
    prefersReducedMotion,
    safeHideDelay,
  ]);

  const visibilityBlocksPlayback = useCallback((): boolean => {
    return (
      (pauseOnHide && !inViewportRef.current) ||
      (pauseOnPageHide && !pageVisibleRef.current)
    );
  }, [pauseOnHide, pauseOnPageHide]);

  const updateBufferedPercentage = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    const mediaDuration =
      Number.isFinite(video.duration) && video.duration > 0
        ? video.duration
        : 0;

    if (mediaDuration <= 0 || video.buffered.length === 0) {
      setBufferedPercentage(0);
      return;
    }

    try {
      const end = video.buffered.end(video.buffered.length - 1);
      setBufferedPercentage(clamp((end / mediaDuration) * 100, 0, 100));
    } catch {
      setBufferedPercentage(0);
    }
  }, []);

  const safelyPlay = useCallback(
    async (reason: PlayReason): Promise<boolean> => {
      const video = videoRef.current;
      if (!video || !mountedRef.current) return false;

      // Manual play should always be honored, even if the visibility observer
      // temporarily reports a low intersection ratio on mobile browsers.
      if (reason !== "manual" && visibilityBlocksPlayback()) {
        return false;
      }

      const needsInitialData =
        video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA;

      setIsLoading(needsInitialData);
      setIsBuffering(false);

      try {
        await video.play();
        return true;
      } catch (caughtError) {
        if (!mountedRef.current) return false;

        actualPlayingRef.current = false;
        setIsPlaying(false);
        setIsLoading(false);
        setIsBuffering(false);

        const domError =
          caughtError instanceof DOMException ? caughtError : null;
        const expectedRestriction =
          domError?.name === "NotAllowedError" ||
          domError?.name === "AbortError";

        if (reason !== "resume" || expectedRestriction) {
          setPlaybackIntent("paused");
        }

        if (!expectedRestriction && video.error) {
          setError(video.error);
          onError?.(video.error);
        }

        return false;
      }
    },
    [onError, setPlaybackIntent, visibilityBlocksPlayback],
  );

  const resumeWhenAllowed = useCallback(async () => {
    const video = videoRef.current;
    if (!video || !mountedRef.current) return;

    if (
      playbackIntentRef.current !== "playing" ||
      endedRef.current ||
      error ||
      visibilityBlocksPlayback()
    ) {
      return;
    }

    if (!video.paused && !video.ended) {
      pausedByViewportRef.current = false;
      pausedByPageRef.current = false;
      return;
    }

    const played = await safelyPlay("resume");
    if (played) {
      pausedByViewportRef.current = false;
      pausedByPageRef.current = false;
    }
  }, [error, safelyPlay, visibilityBlocksPlayback]);

  const togglePlayback = useCallback(async () => {
    const video = videoRef.current;
    if (!video || error) return;

    keepControlsVisible();

    const actuallyPlaying = !video.paused && !video.ended;

    if (actuallyPlaying) {
      pausedByViewportRef.current = false;
      pausedByPageRef.current = false;
      setPlaybackIntent("paused");
      setIsLoading(false);
      setIsBuffering(false);
      video.pause();
      return;
    }

    if (
      video.ended ||
      (Number.isFinite(video.duration) &&
        video.duration > 0 &&
        video.currentTime >= video.duration - 0.05)
    ) {
      video.currentTime = 0;
      setCurrentTime(0);
      endedRef.current = false;
    }

    pausedByViewportRef.current = false;
    pausedByPageRef.current = false;
    setPlaybackIntent("playing");

    const played = await safelyPlay("manual");
    if (!played && visibilityBlocksPlayback()) {
      // Se conserva la intención para reproducir cuando vuelva a ser visible.
      setPlaybackIntent("playing");
    }
  }, [
    error,
    keepControlsVisible,
    safelyPlay,
    setPlaybackIntent,
    visibilityBlocksPlayback,
  ]);

  const seekTo = useCallback(
    (requestedTime: number) => {
      const video = videoRef.current;
      if (!video) return;

      const mediaDuration =
        Number.isFinite(video.duration) && video.duration > 0
          ? video.duration
          : duration;

      if (!Number.isFinite(mediaDuration) || mediaDuration <= 0) return;

      const safeTime = clamp(requestedTime, 0, mediaDuration);
      video.currentTime = safeTime;
      setCurrentTime(safeTime);

      if (safeTime < mediaDuration) endedRef.current = false;
      scheduleControlsHide();
    },
    [duration, scheduleControlsHide],
  );

  const seekBy = useCallback(
    (delta: number) => {
      const video = videoRef.current;
      if (!video) return;
      seekTo((Number.isFinite(video.currentTime) ? video.currentTime : 0) + delta);
    },
    [seekTo],
  );

  const setMediaVolume = useCallback(
    (requestedVolume: number) => {
      const video = videoRef.current;
      if (!video) return;

      const nextVolume = clamp(requestedVolume, 0, 1);
      video.volume = nextVolume;

      if (nextVolume === 0) {
        video.muted = true;
      } else {
        lastNonZeroVolumeRef.current = nextVolume;
        video.muted = false;
      }

      setVolume(nextVolume);
      setIsMuted(video.muted || nextVolume === 0);
      scheduleControlsHide();
    },
    [scheduleControlsHide],
  );

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.muted || video.volume === 0) {
      const restoredVolume = clamp(lastNonZeroVolumeRef.current || 1, 0, 1);
      video.volume = restoredVolume;
      video.muted = false;
      setVolume(restoredVolume);
      setIsMuted(false);
    } else {
      if (video.volume > 0) lastNonZeroVolumeRef.current = video.volume;
      video.muted = true;
      setIsMuted(true);
    }

    keepControlsVisible();
  }, [keepControlsVisible]);

  const emitFullscreenState = useCallback(
    (fullscreen: boolean) => {
      if (fullscreenStateRef.current === fullscreen) return;
      fullscreenStateRef.current = fullscreen;
      setIsFullscreen(fullscreen);
      onFullscreenChange?.(fullscreen);
    },
    [onFullscreenChange],
  );

  const toggleFullscreen = useCallback(async () => {
    const container = containerRef.current;
    const video = videoRef.current as WebkitVideo | null;
    if (!container || !video || typeof document === "undefined") return;

    const webkitDocument = document as WebkitDocument;

    try {
      if (
        video.webkitDisplayingFullscreen &&
        typeof video.webkitExitFullscreen === "function"
      ) {
        video.webkitExitFullscreen();
        return;
      }

      if (document.fullscreenElement) {
        await document.exitFullscreen();
        return;
      }

      if (
        webkitDocument.webkitFullscreenElement &&
        typeof webkitDocument.webkitExitFullscreen === "function"
      ) {
        await webkitDocument.webkitExitFullscreen();
        return;
      }

      if (typeof container.requestFullscreen === "function") {
        await container.requestFullscreen();
        return;
      }

      if (typeof video.webkitEnterFullscreen === "function") {
        video.webkitEnterFullscreen();
      }
    } catch {
      // Fullscreen puede ser rechazado si no parte de una interacción válida.
    }
  }, []);

  const togglePictureInPicture = useCallback(async () => {
    if (disablePictureInPicture || typeof document === "undefined") return;

    const video = videoRef.current as PictureInPictureVideo | null;
    const pipDocument = document as PictureInPictureDocument;

    if (
      !video ||
      !pipDocument.pictureInPictureEnabled ||
      typeof video.requestPictureInPicture !== "function"
    ) {
      return;
    }

    try {
      if (
        pipDocument.pictureInPictureElement &&
        typeof pipDocument.exitPictureInPicture === "function"
      ) {
        await pipDocument.exitPictureInPicture();
      } else {
        await video.requestPictureInPicture();
      }
    } catch {
      // PiP puede no estar permitido o tener soporte parcial.
    }
  }, [disablePictureInPicture]);

  const handleKeyboard = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (isEditableTarget(event.target)) return;

      if (
        event.target instanceof HTMLButtonElement &&
        (event.key === " " || event.key === "Enter")
      ) {
        return;
      }

      if (
        event.target instanceof HTMLInputElement &&
        event.target.type === "range" &&
        ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(
          event.key,
        )
      ) {
        return;
      }

      let handled = true;

      switch (event.key) {
        case " ":
        case "k":
        case "K":
          void togglePlayback();
          break;
        case "f":
        case "F":
          void toggleFullscreen();
          break;
        case "m":
        case "M":
          toggleMute();
          break;
        case "ArrowRight":
          seekBy(safeSeekStep);
          break;
        case "ArrowLeft":
          seekBy(-safeSeekStep);
          break;
        case "ArrowUp":
          setMediaVolume(volume + VOLUME_STEP);
          break;
        case "ArrowDown":
          setMediaVolume(volume - VOLUME_STEP);
          break;
        case "Home":
          seekTo(0);
          break;
        case "End":
          seekTo(duration);
          break;
        default:
          handled = false;
      }

      if (handled) {
        event.preventDefault();
        keepControlsVisible();
      }
    },
    [
      duration,
      keepControlsVisible,
      safeSeekStep,
      seekBy,
      seekTo,
      setMediaVolume,
      toggleFullscreen,
      toggleMute,
      togglePlayback,
      volume,
    ],
  );

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
      clearHideControlsTimer();

      if (blurAnimationFrameRef.current !== null) {
        window.cancelAnimationFrame(blurAnimationFrameRef.current);
      }
    };
  }, [clearHideControlsTimer]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.volume = safeInitialVolume;
    video.muted = muted || safeInitialVolume === 0;

    if (safeInitialVolume > 0) {
      lastNonZeroVolumeRef.current = safeInitialVolume;
    }

    setVolume(safeInitialVolume);
    setIsMuted(video.muted || safeInitialVolume === 0);
  }, [muted, safeInitialVolume]);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(query.matches);
    updatePreference();

    if (query.addEventListener) {
      query.addEventListener("change", updatePreference);
      return () => query.removeEventListener("change", updatePreference);
    }

    query.addListener(updatePreference);
    return () => query.removeListener(updatePreference);
  }, []);

  useEffect(() => {
    if (!pauseOnHide || typeof IntersectionObserver === "undefined") return;

    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = Boolean(
          entry &&
            entry.isIntersecting &&
            entry.intersectionRatio >= safeThreshold,
        );

        inViewportRef.current = visible;

        if (!visible) {
          if (!video.paused && !video.ended) {
            pausedByViewportRef.current = true;
            video.pause();
          }
          return;
        }

        void resumeWhenAllowed();
      },
      { threshold: [0, safeThreshold] },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [pauseOnHide, resumeWhenAllowed, safeThreshold]);

  useEffect(() => {
    if (!pauseOnPageHide || typeof document === "undefined") return;

    const syncPageVisibility = () => {
      const visible = !document.hidden;
      pageVisibleRef.current = visible;

      const video = videoRef.current;
      if (!video) return;

      if (!visible) {
        if (!video.paused && !video.ended) {
          pausedByPageRef.current = true;
          video.pause();
        }
        return;
      }

      void resumeWhenAllowed();
    };

    syncPageVisibility();
    document.addEventListener("visibilitychange", syncPageVisibility);
    return () =>
      document.removeEventListener("visibilitychange", syncPageVisibility);
  }, [pauseOnPageHide, resumeWhenAllowed]);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const video = videoRef.current as WebkitVideo | null;
    const webkitDocument = document as WebkitDocument;

    const syncFullscreen = () => {
      emitFullscreenState(
        Boolean(
          document.fullscreenElement ||
            webkitDocument.webkitFullscreenElement ||
            video?.webkitDisplayingFullscreen,
        ),
      );
    };

    document.addEventListener("fullscreenchange", syncFullscreen);
    document.addEventListener(
      "webkitfullscreenchange",
      syncFullscreen as EventListener,
    );
    video?.addEventListener(
      "webkitbeginfullscreen",
      syncFullscreen as EventListener,
    );
    video?.addEventListener(
      "webkitendfullscreen",
      syncFullscreen as EventListener,
    );

    return () => {
      document.removeEventListener("fullscreenchange", syncFullscreen);
      document.removeEventListener(
        "webkitfullscreenchange",
        syncFullscreen as EventListener,
      );
      video?.removeEventListener(
        "webkitbeginfullscreen",
        syncFullscreen as EventListener,
      );
      video?.removeEventListener(
        "webkitendfullscreen",
        syncFullscreen as EventListener,
      );
    };
  }, [emitFullscreenState]);

  useEffect(() => {
    const video = videoRef.current as PictureInPictureVideo | null;
    if (!video || typeof document === "undefined") return;

    const pipDocument = document as PictureInPictureDocument;
    video.disablePictureInPicture = disablePictureInPicture;

    setSupportsPictureInPicture(
      !disablePictureInPicture &&
        pipDocument.pictureInPictureEnabled === true &&
        typeof video.requestPictureInPicture === "function",
    );

    const entered = () => setIsPictureInPicture(true);
    const left = () => setIsPictureInPicture(false);

    video.addEventListener("enterpictureinpicture", entered);
    video.addEventListener("leavepictureinpicture", left);

    return () => {
      video.removeEventListener("enterpictureinpicture", entered);
      video.removeEventListener("leavepictureinpicture", left);
    };
  }, [disablePictureInPicture]);

  /* eslint-disable react-hooks/set-state-in-effect -- playback intent intentionally mirrors autoplay prop changes */
  useEffect(() => {
    if (autoPlay) {
      autoplayAttemptedRef.current = false;
      setPlaybackIntent("playing");
    } else if (!actualPlayingRef.current) {
      setPlaybackIntent("paused");
    }
  }, [autoPlay, setPlaybackIntent]);
  /* eslint-enable react-hooks/set-state-in-effect */

  /* eslint-disable react-hooks/set-state-in-effect -- control visibility is synchronized with playback/error state and timer lifecycle */
  useEffect(() => {
    if (!isPlaying || error || !autoHideControls) {
      keepControlsVisible();
      return;
    }

    scheduleControlsHide();
  }, [
    autoHideControls,
    error,
    isPlaying,
    keepControlsVisible,
    scheduleControlsHide,
  ]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const attemptAutoplay = useCallback(() => {
    if (
      !autoPlay ||
      autoplayAttemptedRef.current ||
      playbackIntentRef.current !== "playing" ||
      error ||
      visibilityBlocksPlayback()
    ) {
      return;
    }

    autoplayAttemptedRef.current = true;
    void safelyPlay("autoplay");
  }, [autoPlay, error, safelyPlay, visibilityBlocksPlayback]);

  const handleLoadStart = useCallback(() => {
    endedRef.current = false;
    autoplayAttemptedRef.current = false;
    setError(null);

    // `loadstart` also fires during passive preload. The visual loader should
    // only appear when playback has actually been requested.
    setIsLoading(playbackIntentRef.current === "playing");
    setIsBuffering(false);
    setBufferedPercentage(0);
  }, []);

  const handleLoadedMetadata = useCallback(
    (event: SyntheticEvent<HTMLVideoElement>) => {
      const video = event.currentTarget;
      const nextDuration =
        Number.isFinite(video.duration) && video.duration > 0
          ? video.duration
          : 0;
      const nextTime = Number.isFinite(video.currentTime)
        ? clamp(video.currentTime, 0, nextDuration || Number.MAX_SAFE_INTEGER)
        : 0;

      setDuration(nextDuration);
      setCurrentTime(nextTime);

      // Metadata alone does not mean that a frame is ready to be rendered.
      setIsLoading(
        playbackIntentRef.current === "playing" &&
          video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA,
      );

      updateBufferedPercentage();
      attemptAutoplay();
    },
    [attemptAutoplay, updateBufferedPercentage],
  );

  const handleLoadedData = useCallback(
    (event: SyntheticEvent<HTMLVideoElement>) => {
      if (
        event.currentTarget.readyState >=
        HTMLMediaElement.HAVE_CURRENT_DATA
      ) {
        setIsLoading(false);
      }
    },
    [],
  );

  const handleCanPlay = useCallback(() => {
    setIsLoading(false);
    setIsBuffering(false);
    attemptAutoplay();
  }, [attemptAutoplay]);

  const handlePlay = useCallback(
    (event: SyntheticEvent<HTMLVideoElement>) => {
      const video = event.currentTarget;
      const wasPlaying = actualPlayingRef.current;
    actualPlayingRef.current = true;
    endedRef.current = false;
    pausedByViewportRef.current = false;
    pausedByPageRef.current = false;

      setPlaybackIntent("playing");
      setIsPlaying(true);
      setIsLoading(
        video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA,
      );
      setIsBuffering(false);

      if (!wasPlaying) onPlay?.();
      scheduleControlsHide();
    },
    [onPlay, scheduleControlsHide, setPlaybackIntent],
  );

  const handlePause = useCallback(
    (event: SyntheticEvent<HTMLVideoElement>) => {
      const video = event.currentTarget;
      const wasPlaying = actualPlayingRef.current;
      actualPlayingRef.current = false;

      setIsPlaying(false);
      setIsLoading(false);
      setIsBuffering(false);
      keepControlsVisible();

      const temporaryPause =
        pausedByViewportRef.current || pausedByPageRef.current;

      if (!temporaryPause && !video.ended) {
        setPlaybackIntent("paused");
      }

      if (wasPlaying) onPause?.();
    },
    [keepControlsVisible, onPause, setPlaybackIntent],
  );

  const handlePlaying = useCallback(() => {
    setIsLoading(false);
    setIsBuffering(false);
  }, []);

  const handleWaiting = useCallback(
    (event: SyntheticEvent<HTMLVideoElement>) => {
      const video = event.currentTarget;

      // `waiting` and `stalled` may also fire while the browser is preloading
      // a paused video. They only represent a visible loading state when the
      // user currently expects playback to continue.
      if (
        video.paused ||
        video.ended ||
        playbackIntentRef.current !== "playing"
      ) {
        setIsLoading(false);
        setIsBuffering(false);
        return;
      }

      const waitingForFirstFrame =
        video.currentTime <= 0 &&
        video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA;

      setIsLoading(waitingForFirstFrame);
      setIsBuffering(!waitingForFirstFrame);
    },
    [],
  );

  const handleTimeUpdate = useCallback(
    (event: SyntheticEvent<HTMLVideoElement>) => {
      const video = event.currentTarget;
      const nextDuration =
        Number.isFinite(video.duration) && video.duration > 0
          ? video.duration
          : 0;
      const nextTime = Number.isFinite(video.currentTime)
        ? clamp(video.currentTime, 0, nextDuration || Number.MAX_SAFE_INTEGER)
        : 0;

      setCurrentTime(nextTime);
      if (nextDuration > 0) setDuration(nextDuration);

      if (
        playbackIntentRef.current === "playing" &&
        video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA
      ) {
        setIsLoading(false);
        setIsBuffering(false);
      }

      onTimeUpdate?.(nextTime, nextDuration);
    },
    [onTimeUpdate],
  );

  const handleDurationChange = useCallback(
    (event: SyntheticEvent<HTMLVideoElement>) => {
      const video = event.currentTarget;
      setDuration(
        Number.isFinite(video.duration) && video.duration > 0
          ? video.duration
          : 0,
      );
      updateBufferedPercentage();
    },
    [updateBufferedPercentage],
  );

  const handleSeeking = useCallback(
    (event: SyntheticEvent<HTMLVideoElement>) => {
      const video = event.currentTarget;
      seekingRef.current = true;
      keepControlsVisible();

      const shouldShowBuffering =
        playbackIntentRef.current === "playing" &&
        !video.paused &&
        !video.ended &&
        video.readyState < HTMLMediaElement.HAVE_FUTURE_DATA;

      setIsLoading(false);
      setIsBuffering(shouldShowBuffering);
    },
    [keepControlsVisible],
  );

  const handleSeeked = useCallback(() => {
    seekingRef.current = false;
    setIsBuffering(false);
    updateBufferedPercentage();
    scheduleControlsHide();
  }, [scheduleControlsHide, updateBufferedPercentage]);

  const handleEnded = useCallback(
    (event: SyntheticEvent<HTMLVideoElement>) => {
      const video = event.currentTarget;
      const endDuration =
        Number.isFinite(video.duration) && video.duration > 0
          ? video.duration
          : duration;

      actualPlayingRef.current = false;
      setIsPlaying(false);
      setIsLoading(false);
      setIsBuffering(false);

      if (endDuration > 0) {
        setDuration(endDuration);
        setCurrentTime(endDuration);
      }

      if (!loop) {
        endedRef.current = true;
        setPlaybackIntent("paused");
      }

      onEnded?.();
      keepControlsVisible();
    },
    [duration, keepControlsVisible, loop, onEnded, setPlaybackIntent],
  );

  const handleError = useCallback(
    (event: SyntheticEvent<HTMLVideoElement>) => {
      const mediaError = event.currentTarget.error;
      actualPlayingRef.current = false;
      setError(mediaError);
      setIsPlaying(false);
      setIsLoading(false);
      setIsBuffering(false);
      setPlaybackIntent("paused");
      onError?.(mediaError);
      keepControlsVisible();
    },
    [keepControlsVisible, onError, setPlaybackIntent],
  );

  const handleVolumeChange = useCallback(
    (event: SyntheticEvent<HTMLVideoElement>) => {
      const video = event.currentTarget;
      const nextVolume = clamp(video.volume, 0, 1);
      const nextMuted = video.muted || nextVolume === 0;

      if (nextVolume > 0) lastNonZeroVolumeRef.current = nextVolume;

      setVolume(nextVolume);
      setIsMuted(nextMuted);
      onVolumeChange?.(nextVolume, nextMuted);
    },
    [onVolumeChange],
  );

  const handleProgressChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const percentage = clamp(Number(event.target.value), 0, 100);
      if (duration <= 0) return;
      seekTo((percentage / 100) * duration);
    },
    [duration, seekTo],
  );

  const progressPercentage =
    duration > 0 ? clamp((currentTime / duration) * 100, 0, 100) : 0;

  // Loading indicators are driven exclusively by real media events and an
  // active playback request. A passive preload or a manual/automatic pause
  // must never display "Cargando…" or "Almacenando…".
  const effectiveIsPlaying = isPlaying;
  const showLoadingOverlay =
    !error &&
    playbackIntent === "playing" &&
    isLoading &&
    !isBuffering;
  const showBufferingOverlay =
    !error &&
    playbackIntent === "playing" &&
    isPlaying &&
    isBuffering;

  const controlsVisible =
    showControls || !effectiveIsPlaying || Boolean(error) || prefersReducedMotion;
  const errorMessage = error ? getMediaErrorMessage(error) : null;

  const liveStatus = errorMessage
    ? errorMessage
    : showBufferingOverlay
      ? "El video está almacenando datos"
      : showLoadingOverlay
        ? "Cargando video"
        : effectiveIsPlaying
          ? "Video reproduciéndose"
          : "Video en pausa";

  return (
    <div
      ref={containerRef}
      className={joinClasses(
        "group relative isolate flex w-full overflow-hidden bg-black text-white",
        className,
      )}
      tabIndex={0}
      onKeyDown={handleKeyboard}
      onPointerMove={scheduleControlsHide}
      onPointerDown={keepControlsVisible}
      onTouchStart={keepControlsVisible}
      onFocusCapture={() => {
        controlsFocusedRef.current = true;
        keepControlsVisible();
      }}
      onBlurCapture={() => {
        if (blurAnimationFrameRef.current !== null) {
          window.cancelAnimationFrame(blurAnimationFrameRef.current);
        }

        blurAnimationFrameRef.current = window.requestAnimationFrame(() => {
          const container = containerRef.current;
          controlsFocusedRef.current = Boolean(
            container &&
              document.activeElement &&
              container.contains(document.activeElement),
          );

          if (!controlsFocusedRef.current) scheduleControlsHide();
        });
      }}
      aria-label="Reproductor de video"
      aria-keyshortcuts="Space K F M ArrowRight ArrowLeft ArrowUp ArrowDown Home End"
      data-playback-intent={playbackIntent}
    >
      <video
        ref={videoRef}
        className={joinClasses(
          "h-full w-full cursor-pointer object-contain",
          videoClassName,
        )}
        preload={preload}
        loop={loop}
        muted={isMuted}
        playsInline={playsInline}
        poster={poster}
        autoPlay={false}
        controls={false}
        disablePictureInPicture={disablePictureInPicture}
        onClick={() => void togglePlayback()}
        onLoadStart={handleLoadStart}
        onLoadedMetadata={handleLoadedMetadata}
        onLoadedData={handleLoadedData}
        onCanPlay={handleCanPlay}
        onPlaying={handlePlaying}
        onWaiting={handleWaiting}
        onStalled={handleWaiting}
        onPlay={handlePlay}
        onPause={handlePause}
        onTimeUpdate={handleTimeUpdate}
        onDurationChange={handleDurationChange}
        onProgress={updateBufferedPercentage}
        onSeeking={handleSeeking}
        onSeeked={handleSeeked}
        onEnded={handleEnded}
        onVolumeChange={handleVolumeChange}
        onError={handleError}
      >
        {children}
      </video>

      <div className="sr-only" role="status" aria-live="polite">
        {liveStatus}
      </div>

      {(showLoadingOverlay || showBufferingOverlay) && (
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-black/30">
          <Spinner
            label={showBufferingOverlay ? "Almacenando…" : "Cargando…"}
          />
        </div>
      )}

      {errorMessage && (
        <div
          className="absolute inset-x-3 top-3 z-30 rounded border border-red-300/60 bg-red-950/90 px-3 py-2 text-sm"
          role="alert"
        >
          {errorMessage}
        </div>
      )}

      {controls && !effectiveIsPlaying && !error && !showLoadingOverlay && (
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
          <button
            type="button"
            className="pointer-events-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-black/60 transition hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            onClick={() => void togglePlayback()}
            aria-label="Reproducir video"
            title="Reproducir video"
          >
            <PlayIcon />
          </button>
        </div>
      )}

      {controls && (
        <div
          className={joinClasses(
            "absolute inset-x-0 bottom-0 z-30 flex flex-col gap-2 bg-gradient-to-t from-black/95 via-black/75 to-transparent px-3 pb-3 pt-10 transition-opacity",
            prefersReducedMotion ? "duration-0" : "duration-300",
            controlsVisible ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        >
          <div className="relative h-5">
            <div
              className="pointer-events-none absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 overflow-hidden rounded-full bg-white/20"
              aria-hidden="true"
            >
              <div
                className="absolute inset-y-0 left-0 bg-white/35"
                style={{ width: `${bufferedPercentage}%` }}
              />
              <div
                className="absolute inset-y-0 left-0 bg-cyan-400"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>

            <label htmlFor={progressId} className="sr-only">
              Posición del video
            </label>
            <input
              id={progressId}
              type="range"
              min={0}
              max={100}
              step={0.1}
              value={progressPercentage}
              aria-disabled={duration <= 0}
              onChange={handleProgressChange}
              onPointerDown={() => {
                seekingRef.current = true;
                keepControlsVisible();
              }}
              onPointerUp={() => {
                seekingRef.current = false;
                scheduleControlsHide();
              }}
              onPointerCancel={() => {
                seekingRef.current = false;
                scheduleControlsHide();
              }}
              className={joinClasses(
                "absolute inset-0 h-full w-full appearance-none bg-transparent accent-cyan-300",
                duration > 0 ? "cursor-pointer" : "cursor-default",
              )}
              aria-valuetext={`${formatVideoTime(currentTime)} de ${formatVideoTime(duration)}`}
            />
          </div>

          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <button
              type="button"
              className={controlButtonClass}
              onClick={() => void togglePlayback()}
              aria-label={effectiveIsPlaying ? "Pausar video" : "Reproducir video"}
              aria-pressed={effectiveIsPlaying}
              title={effectiveIsPlaying ? "Pausar video" : "Reproducir video"}
            >
              {effectiveIsPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>

            <span
              className="shrink-0 text-xs tabular-nums sm:text-sm"
              aria-label="Tiempo de reproducción"
            >
              {formatVideoTime(currentTime)} / {formatVideoTime(duration)}
            </span>

            <div className="flex min-w-0 items-center gap-1 sm:gap-2">
              <button
                type="button"
                className={controlButtonClass}
                onClick={toggleMute}
                aria-label={isMuted ? "Activar sonido" : "Silenciar"}
                aria-pressed={isMuted}
                title={isMuted ? "Activar sonido" : "Silenciar"}
              >
                <VolumeIcon muted={isMuted} />
              </button>

              <label htmlFor={volumeId} className="sr-only">
                Volumen
              </label>
              <input
                id={volumeId}
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setMediaVolume(Number(event.target.value))
                }
                onPointerDown={() => {
                  adjustingVolumeRef.current = true;
                  keepControlsVisible();
                }}
                onPointerUp={() => {
                  adjustingVolumeRef.current = false;
                  scheduleControlsHide();
                }}
                onPointerCancel={() => {
                  adjustingVolumeRef.current = false;
                  scheduleControlsHide();
                }}
                className="hidden h-1.5 w-20 cursor-pointer accent-cyan-300 sm:block lg:w-28"
                aria-valuetext={`${Math.round(volume * 100)} por ciento`}
              />
            </div>

            <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2">
              {supportsPictureInPicture && (
                <button
                  type="button"
                  className={controlButtonClass}
                  onClick={() => void togglePictureInPicture()}
                  aria-label={
                    isPictureInPicture
                      ? "Salir de Picture-in-Picture"
                      : "Entrar en Picture-in-Picture"
                  }
                  aria-pressed={isPictureInPicture}
                  title="Picture-in-Picture"
                >
                  <PictureInPictureIcon />
                </button>
              )}

              <button
                type="button"
                className={controlButtonClass}
                onClick={() => void toggleFullscreen()}
                aria-label={
                  isFullscreen
                    ? "Salir de pantalla completa"
                    : "Entrar en pantalla completa"
                }
                aria-pressed={isFullscreen}
                title={
                  isFullscreen
                    ? "Salir de pantalla completa"
                    : "Entrar en pantalla completa"
                }
              >
                <FullscreenIcon active={isFullscreen} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;