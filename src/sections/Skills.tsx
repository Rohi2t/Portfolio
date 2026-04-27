import { useRef } from 'react';

const skillsRow1 = [
  'C', 'C++', 'EMBEDDED C', 'EMBEDDED C++', 'BASH SCRIPTING',
  'OBJECT ORIENTED PROG', 'DATA STRUCTURES & ALGORITHMS',
];

const skillsRow2 = [
  'TCP/IP', 'CAN', 'UDS', 'USB', 'ETHERNET',
  'OPERATING SYSTEMS', 'GIT & VERSION CONTROL',
];

function MarqueeRow({ skills, direction }: { skills: string[]; direction: 'left' | 'right' }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const content = (
    <>
      {skills.map((skill, i) => (
        <span key={i} className="flex items-center gap-6 shrink-0">
          <span className="text-text-primary hover:text-accent transition-colors duration-300 cursor-default whitespace-nowrap">
            {skill}
          </span>
          <span className="text-accent text-lg">•</span>
        </span>
      ))}
    </>
  );

  return (
    <div
      className="overflow-hidden py-6"
      onMouseEnter={() => {
        if (trackRef.current) {
          trackRef.current.style.animationPlayState = 'paused';
        }
      }}
      onMouseLeave={() => {
        if (trackRef.current) {
          trackRef.current.style.animationPlayState = 'running';
        }
      }}
    >
      <div
        ref={trackRef}
        className={`flex gap-6 ${direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'}`}
        style={{ width: 'max-content' }}
      >
        {content}
        {content}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section className="bg-base py-[clamp(80px,15vh,150px)] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-[5vw] mb-12">
        <h2
          className="font-display font-medium text-text-primary leading-[1.1]"
          style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)' }}
        >
          TECHNICAL SPECIFICATIONS
        </h2>
      </div>
      <div className="border-y border-elevated">
        <MarqueeRow skills={skillsRow1} direction="left" />
        <div className="border-t border-elevated" />
        <MarqueeRow skills={skillsRow2} direction="right" />
      </div>
    </section>
  );
}
