"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Carousel.module.css";
import Button from "./Button";

type Props = {
  slides: React.ReactNode[];
  autoSliding?: boolean;
};

const AUTO_SLIDING_INTERVAL = 5000;

const Carousel = ({ slides, autoSliding = true }: Props) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoSliding, setIsAutoSliding] = useState(autoSliding);

  const intervalRef = useRef<number | null>(null);

  const stopAutoSlidingInterval = useCallback(() => {
    if (intervalRef.current === null) return;

    window.clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);

  const startAutoSlidingInterval = useCallback(() => {
    stopAutoSlidingInterval();

    if (slides.length <= 1) return;

    intervalRef.current = window.setInterval(() => {
      setCurrentSlide((previousSlide) => {
        return (previousSlide + 1) % slides.length;
      });
    }, AUTO_SLIDING_INTERVAL);
  }, [slides.length, stopAutoSlidingInterval]);

  const pauseAutoSliding = useCallback(() => {
    setIsAutoSliding(false);
    stopAutoSlidingInterval();
  }, [stopAutoSlidingInterval]);

  const goToNextSlide = useCallback(() => {
    if (slides.length === 0) return;

    pauseAutoSliding();

    setCurrentSlide((previousSlide) => {
      return (previousSlide + 1) % slides.length;
    });
  }, [pauseAutoSliding, slides.length]);

  const goToPreviousSlide = useCallback(() => {
    if (slides.length === 0) return;

    pauseAutoSliding();

    setCurrentSlide((previousSlide) => {
      return previousSlide === 0
        ? slides.length - 1
        : previousSlide - 1;
    });
  }, [pauseAutoSliding, slides.length]);

  const toggleAutoSliding = useCallback(() => {
    setIsAutoSliding((previousValue) => !previousValue);
  }, []);

  /* eslint-disable react-hooks/set-state-in-effect -- controlled prop synchronization is intentional */
  useEffect(() => {
    setIsAutoSliding(autoSliding);
  }, [autoSliding]);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (isAutoSliding) {
      startAutoSlidingInterval();
    } else {
      stopAutoSlidingInterval();
    }

    return stopAutoSlidingInterval;
  }, [
    isAutoSliding,
    startAutoSlidingInterval,
    stopAutoSlidingInterval,
  ]);

  /* eslint-disable react-hooks/set-state-in-effect -- slide selection must be clamped when the external collection changes */
  useEffect(() => {
    if (slides.length === 0) {
      setCurrentSlide(0);
      return;
    }

    setCurrentSlide((previousSlide) => {
      return Math.min(previousSlide, slides.length - 1);
    });
  }, [slides.length]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const hasMultipleSlides = slides.length > 1;

  return (
    <div className="flex h-fit w-full flex-col gap-5">
      <div
        className={`${styles.carousel_component} relative w-full overflow-hidden rounded border border-solid border-black/15 shadow`}
      >
        {hasMultipleSlides && (
          <>
            <button
              type="button"
              aria-label="Mostrar diapositiva anterior"
              onClick={goToPreviousSlide}
              className="absolute left-0 z-20 h-full w-fit p-2 text-2xl text-neutral-500 hover:bg-neutral-950/10 active:bg-neutral-950/30"
            >
              <i className="bi bi-caret-left-fill" aria-hidden="true" />
            </button>

            <button
              type="button"
              aria-label="Mostrar siguiente diapositiva"
              onClick={goToNextSlide}
              className="absolute right-0 z-20 h-full w-fit p-2 text-2xl text-neutral-500 hover:bg-neutral-950/10 active:bg-neutral-950/30"
            >
              <i className="bi bi-caret-right-fill" aria-hidden="true" />
            </button>
          </>
        )}

        <div className="relative h-full w-full">
          {slides.map((slide, index) => {
            const isCurrentSlide = currentSlide === index;

            return (
              <div
                key={index}
                aria-hidden={!isCurrentSlide}
                className={`${styles.slide_animation} absolute left-0 top-0 size-full overflow-hidden ${
                  isCurrentSlide
                    ? "pointer-events-auto opacity-100"
                    : "pointer-events-none opacity-0"
                }`}
              >
                {slide}
              </div>
            );
          })}
        </div>
      </div>

      {hasMultipleSlides && (
        <Button
          color="blue"
          className="w-full"
          onClick={toggleAutoSliding}
        >
          {isAutoSliding ? "Pausar" : "Reanudar"}
        </Button>
      )}
    </div>
  );
};

export default Carousel;