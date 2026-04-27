import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      if (titleRef.current) {
        const lines = titleRef.current.querySelectorAll('.hero-line');
        tl.from(lines, {
          y: '100%',
          duration: 1.2,
          ease: 'expo.out',
          stagger: 0.1,
        });
      }

      if (subtitleRef.current) {
        tl.from(subtitleRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        }, '-=0.6');
      }

      if (metaRef.current) {
        tl.from(metaRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
        }, '-=0.4');
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-base flex flex-col justify-end px-[5vw] pb-[8vh] relative overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto w-full">
        <h1
          ref={titleRef}
          className="font-display font-medium text-text-primary leading-[0.9] tracking-[-0.04em] mb-8"
          style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}
        >
          <span className="hero-line block overflow-hidden">
            <span className="block">EMBEDDED /</span>
          </span>
          <span className="hero-line block overflow-hidden">
            <span className="block">SOFTWARE /</span>
          </span>
          <span className="hero-line block overflow-hidden">
            <span className="block">ENGINEER.</span>
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="font-display text-text-secondary text-lg md:text-xl lg:text-2xl font-light max-w-2xl mb-6"
        >
          Bridging hardware and intelligence for autonomous systems.
        </p>

        <div
          ref={metaRef}
          className="font-mono text-[0.85rem] text-text-tertiary flex flex-wrap gap-x-6 gap-y-2"
        >
          <span>BRIGOSHA TECHNOLOGIES</span>
          <span className="text-text-tertiary">•</span>
          <span>JULY 2022 — PRESENT</span>
          <span className="text-text-tertiary">•</span>
          <span>BENGALURU, KARNATAKA</span>
        </div>
      </div>
    </section>
  );
}
