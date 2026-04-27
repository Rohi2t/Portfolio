import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const education = [
  {
    label: 'UNIVERSITY',
    value: 'SRM UNIVERSITY',
    sub: 'B.TECH ECE, 71% (2017-2021)',
  },
  {
    label: 'INTERMEDIATE',
    value: 'SRI CHAITANYA JR COLLEGE',
    sub: 'BOARD OF INTERMEDIATE, 93% (2015-2017)',
  },
  {
    label: 'SECONDARY',
    value: 'KESHAVA REDDY CONCEPT EM HS',
    sub: 'CLASS 10, 9.3 CGPA (2015)',
  },
];

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (linesRef.current) {
        const lines = linesRef.current.querySelectorAll('.edu-line');
        gsap.from(lines, {
          scaleY: 0,
          duration: 1.2,
          ease: 'power3.out',
          stagger: 0.2,
          transformOrigin: 'top',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        });
      }

      const labels = sectionRef.current?.querySelectorAll('.edu-label');
      if (labels) {
        gsap.from(labels, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-base min-h-[60vh] py-[clamp(80px,15vh,150px)]"
    >
      <div className="max-w-[1400px] mx-auto px-[5vw]">
        <h2
          className="font-display font-medium text-text-primary leading-[1.1] mb-16"
          style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)' }}
        >
          EDUCATION
        </h2>
        <div ref={linesRef} className="grid grid-cols-1 md:grid-cols-3 relative">
          {education.map((edu, i) => (
            <div key={i} className="relative py-8 md:py-0 md:px-8">
              {i > 0 && (
                <div className="edu-line absolute left-0 top-0 h-full w-[1px] bg-elevated hidden md:block" />
              )}
              <div className="edu-label">
                <div className="font-mono text-[0.75rem] text-text-tertiary tracking-[0.1em] uppercase mb-4">
                  {edu.label}
                </div>
                <div className="font-display text-text-primary text-xl md:text-2xl font-medium mb-2">
                  {edu.value}
                </div>
                <div className="font-display text-text-secondary text-base font-light">
                  {edu.sub}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
