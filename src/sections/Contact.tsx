import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [buttonText, setButtonText] = useState('INITIATE CONTACT SEQUENCE');

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.from(contentRef.current, {
          scale: 0.9,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none none',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrambleText = () => {
    const original = 'INITIATE CONTACT SEQUENCE';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let iteration = 0;
    const interval = setInterval(() => {
      setButtonText(
        original
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return original[index];
            }
            if (letter === ' ') return ' ';
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );
      if (iteration >= original.length) {
        clearInterval(interval);
      }
      iteration += 1 / 2;
    }, 30);
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-base flex items-center justify-center relative overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(173,255,0,0.05) 0%, transparent 70%)',
        }}
      />

      <div
        ref={contentRef}
        className="max-w-[1400px] mx-auto px-[5vw] w-full flex flex-col items-center text-center"
      >
        <div className="font-mono text-[0.85rem] text-text-secondary tracking-[0.2em] uppercase mb-8">
          AVAILABLE FOR OPPORTUNITIES
        </div>

        <a
          href="mailto:bhargav0912@gmail.com"
          className="group relative w-[80vw] max-w-[900px] h-[120px] md:h-[200px] border border-[#333] flex items-center justify-center transition-all duration-500 hover:border-accent"
          onMouseEnter={() => {
            scrambleText();
          }}
          onMouseLeave={() => {
            setButtonText('INITIATE CONTACT SEQUENCE');
          }}
        >
          <span className="font-display text-text-primary text-xl md:text-3xl lg:text-4xl font-medium tracking-[-0.02em] transition-colors duration-500 group-hover:text-accent">
            {buttonText}
          </span>
        </a>

        <div className="mt-12 flex flex-col md:flex-row gap-6 md:gap-12">
          <a
            href="mailto:bhargav0912@gmail.com"
            className="font-mono text-[0.85rem] text-text-tertiary hover:text-text-primary transition-colors duration-300"
          >
            bhargav0912@gmail.com
          </a>
          <a
            href="tel:+919676479354"
            className="font-mono text-[0.85rem] text-text-tertiary hover:text-text-primary transition-colors duration-300"
          >
            +91-9676479354
          </a>
        </div>
      </div>
    </section>
  );
}
