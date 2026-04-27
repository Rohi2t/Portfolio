import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const p = Math.min((elapsed / duration) * 100, 100);
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        gsap.to('.preloader', {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.inOut',
          onComplete: () => {
            onComplete();
          },
        });
      }
    }, 16);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className="preloader fixed inset-0 z-[100] bg-base flex flex-col items-center justify-center"
      style={{ pointerEvents: progress >= 100 ? 'none' : 'auto' }}
    >
      <div className="font-mono text-xs tracking-[0.2em] text-text-secondary mb-8 uppercase">
        Booting Sequence...
      </div>
      <div className="w-64 h-[1px] bg-elevated relative overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-accent"
          style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
        />
      </div>
      <div className="font-mono text-xs text-text-tertiary mt-4">
        {Math.round(progress)}%
      </div>
    </div>
  );
}
