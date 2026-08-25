"use client";

import { useCallback, useEffect, useRef, useState, type AnimationEvent } from "react";

import styles from "./portal-layer.module.css";
import { PORTAL_LOGO_DESKTOP, PORTAL_LOGO_MOBILE } from "./portal-logo";

type PortalState = "idle" | "opening";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

const TRANSITION_FALLBACK_MS = 1_000;

function prefersReducedMotion() {
  return typeof window.matchMedia === "function" && window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

export default function PortalLayer() {
  const [isVisible, setIsVisible] = useState(true);
  const [state, setState] = useState<PortalState>("idle");

  const isTransitioningRef = useRef(false);

  const enterPortal = useCallback(() => {
    if (isTransitioningRef.current) {
      return;
    }

    isTransitioningRef.current = true;

    if (prefersReducedMotion()) {
      setIsVisible(false);

      return;
    }

    setState("opening");
  }, []);

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code !== "Space" || event.repeat) {
        return;
      }

      event.preventDefault();

      enterPortal();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [enterPortal, isVisible]);

  useEffect(() => {
    if (state !== "opening") {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setIsVisible(false);
    }, TRANSITION_FALLBACK_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [state]);

  const handleAnimationEnd = (event: AnimationEvent<HTMLElement>) => {
    if (event.target !== event.currentTarget || state !== "opening") {
      return;
    }

    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <section
      aria-label="블루점프 포털"
      className={`${styles.layer} fixed inset-0 isolate z-100 flex min-h-dvh items-center justify-center overflow-hidden px-6 py-10 text-white`}
      data-state={state}
      onAnimationEnd={handleAnimationEnd}
    >
      <div className="relative z-10 flex w-full flex-col items-center">
        <button
          type="button"
          aria-label="블루점프 메인으로 진입"
          className={styles.portalButton}
          disabled={state === "opening"}
          onClick={enterPortal}
        >
          <span aria-hidden="true" className={styles.portalMark}>
            <pre className={`${styles.portalLogo} ${styles.desktopLogo}`}>
              {PORTAL_LOGO_DESKTOP}
            </pre>

            <pre className={`${styles.portalLogo} ${styles.mobileLogo}`}>{PORTAL_LOGO_MOBILE}</pre>
          </span>
        </button>

        <div className={styles.portalCopy}>
          <p className={styles.brandName}>BLUE JUMP</p>

          <div className={styles.instruction}>
            <span aria-hidden="true" className={styles.instructionLine} />

            <p className={styles.desktopInstruction}>PRESS SPACE TO JUMP</p>

            <p className={styles.touchInstruction}>TOUCH TO JUMP</p>

            <span aria-hidden="true" className={styles.instructionLine} />
          </div>
        </div>
      </div>
    </section>
  );
}
