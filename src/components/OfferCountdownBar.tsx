import { useEffect, useRef, useState } from "react";
import { Clock } from "lucide-react";

const STORAGE_KEY = "shifacare-offer-deadline-ms";
const OFFER_DURATION_MS = 24 * 60 * 60 * 1000;

function readOrCreateDeadline(): number {
  const raw = sessionStorage.getItem(STORAGE_KEY);
  const parsed = raw ? parseInt(raw, 10) : NaN;
  if (!Number.isFinite(parsed) || parsed <= Date.now()) {
    const next = Date.now() + OFFER_DURATION_MS;
    sessionStorage.setItem(STORAGE_KEY, String(next));
    return next;
  }
  return parsed;
}

function formatUnit(n: number, suffix: string) {
  return `${n}${suffix}`;
}

const OfferCountdownBar = () => {
  const deadlineRef = useRef<number>(0);
  const [label, setLabel] = useState(() => "24h 00m 00s");

  useEffect(() => {
    deadlineRef.current = readOrCreateDeadline();

    const tick = () => {
      let end = deadlineRef.current;
      let diff = end - Date.now();

      if (diff <= 0) {
        end = Date.now() + OFFER_DURATION_MS;
        sessionStorage.setItem(STORAGE_KEY, String(end));
        deadlineRef.current = end;
        diff = end - Date.now();
      }

      const totalSec = Math.max(0, Math.floor(diff / 1000));
      const h = Math.floor(totalSec / 3600);
      const m = Math.floor((totalSec % 3600) / 60);
      const s = totalSec % 60;

      setLabel(
        `${formatUnit(h, "h")} ${String(m).padStart(2, "0")}m ${String(s).padStart(2, "0")}s`,
      );
    };

    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      className="relative z-50 border-b border-primary/20 bg-section-dark"
      role="region"
      aria-label="সীমিত সময়ের অফার"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-2 px-4 py-2.5 text-center sm:flex-row sm:gap-6 sm:text-left">
        <div className="flex items-center gap-2 text-sm font-medium text-primary-foreground/95 sm:text-base">
          <Clock className="size-4 shrink-0 text-accent sm:size-5" aria-hidden />
          <span>
            <span className="font-semibold text-accent">সীমিত সময়ের অফার</span>
            <span className="mx-1.5 text-primary-foreground/70">—</span>
            <span className="text-primary-foreground/90">এখনই অর্ডার করুন, মূল্য সুবিধা শেষ হওয়ার আগে</span>
          </span>
        </div>

        <div
          className="flex shrink-0 items-center gap-1.5 rounded-md border border-accent/40 bg-primary/30 px-3 py-1.5 font-mono text-base font-bold tracking-wide text-accent tabular-nums shadow-sm sm:text-lg"
          role="timer"
          aria-live="polite"
          aria-atomic="true"
        >
          {label}
        </div>
      </div>
    </div>
  );
};

export default OfferCountdownBar;
