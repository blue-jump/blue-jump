"use client";

import { useCallback, useEffect, useRef, useState, type AnimationEvent } from "react";

import styles from "./portal-layer.module.css";

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
      className={`${styles.layer} fixed inset-0 isolate z-100 flex min-h-dvh items-center justify-center overflow-hidden bg-[#041225] px-6 py-10 text-white`}
      data-state={state}
      onAnimationEnd={handleAnimationEnd}
    >
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#071a34_0%,#041225_52%,#020916_100%)]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(25,197,229,0.14),transparent_34%)]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgba(36,107,253,0.18),transparent_44%)]" />

        <div className="bg-brand/10 absolute top-1/4 -left-24 size-72 rounded-full blur-3xl" />

        <div className="bg-accent/10 absolute -right-24 bottom-1/4 size-72 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center">
        <button
          type="button"
          aria-label="블루점프 메인으로 진입"
          className={`${styles.portalButton} focus-visible:ring-accent relative aspect-square w-[min(78vw,28rem)] shrink-0 rounded-full focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-offset-[#041225] focus-visible:outline-none disabled:cursor-default`}
          disabled={state === "opening"}
          onClick={enterPortal}
        >
          <span aria-hidden="true" className={`${styles.portalVisual} absolute inset-0`}>
            <span className="bg-accent/10 absolute inset-[7%] rounded-full blur-3xl" />

            <span
              className={`${styles.orbit} border-accent/20 absolute inset-x-[4%] top-1/2 h-[46%] -translate-y-1/2 rotate-12 rounded-[50%] border`}
            />

            <span
              className={`${styles.orbitReverse} border-brand/25 absolute inset-y-[4%] left-1/2 w-[46%] -translate-x-1/2 -rotate-12 rounded-[50%] border`}
            />

            <span
              className={`${styles.outerRipple} border-accent/20 absolute inset-[14%] rounded-full border`}
            />

            <span
              className={`${styles.portalRing} border-accent/65 absolute inset-[21%] rounded-full border-[3px] shadow-[0_0_32px_rgba(25,197,229,0.5),inset_0_0_28px_rgba(36,107,253,0.18)]`}
            />

            <span
              className={`${styles.portalCore} border-brand/65 absolute inset-[27%] rounded-full border bg-[#06152b] shadow-[0_0_52px_rgba(36,107,253,0.32)]`}
            />

            <span
              className={`${styles.portalLight} absolute inset-[34%] rounded-full bg-[radial-gradient(circle,rgba(25,197,229,0.34)_0%,rgba(36,107,253,0.16)_42%,rgba(4,18,37,0)_72%)]`}
            />

            <span className="bg-accent absolute top-[22%] left-[13%] size-1.5 rounded-full shadow-[0_0_14px_rgba(25,197,229,0.9)]" />
            <span className="bg-brand absolute top-[15%] right-[24%] size-1 rounded-full shadow-[0_0_12px_rgba(36,107,253,0.9)]" />
            <span className="bg-accent/80 absolute top-[45%] right-[7%] size-1 rounded-full shadow-[0_0_12px_rgba(25,197,229,0.8)]" />
            <span className="bg-brand/80 absolute right-[20%] bottom-[14%] size-1.5 rounded-full shadow-[0_0_14px_rgba(36,107,253,0.8)]" />
            <span className="bg-accent/70 absolute bottom-[19%] left-[18%] size-1 rounded-full shadow-[0_0_12px_rgba(25,197,229,0.7)]" />
            <span className="bg-brand/70 absolute top-[51%] left-[5%] size-1 rounded-full shadow-[0_0_12px_rgba(36,107,253,0.7)]" />
          </span>
        </button>

        <div className={`${styles.portalCopy} relative -mt-4 text-center sm:-mt-6`}>
          <p className="text-2xl font-semibold tracking-[0.28em] text-white sm:text-3xl">
            BLUE JUMP
          </p>

          <div className="mt-5 flex items-center justify-center gap-3">
            <span aria-hidden="true" className="bg-accent/40 h-px w-7" />

            <p
              className={`${styles.desktopInstruction} text-[0.7rem] font-semibold tracking-[0.24em] text-white/65`}
            >
              PRESS SPACE TO JUMP
            </p>

            <p
              className={`${styles.touchInstruction} text-[0.7rem] font-semibold tracking-[0.24em] text-white/65`}
            >
              TOUCH TO JUMP
            </p>

            <span aria-hidden="true" className="bg-accent/40 h-px w-7" />
          </div>
        </div>
      </div>
    </section>
  );
}
