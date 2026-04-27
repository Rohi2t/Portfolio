import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const assetPath = (filename: string) => `${import.meta.env.BASE_URL}${filename}`;

const slides = [
  {
    title: 'OBJECT DETECTION AND TRACKING USING LIDAR',
    sub: 'NVIDIA JETSON • ROS • C++ • PCL',
    detail: 'Architected and implemented a LiDAR perception pipeline with ground segmentation and object detection using JPDA, enabling reliable multi-object association in dynamic automotive environments. Achieved 60ms end-to-end inference latency.',
    image: assetPath('project-lidar.jpg'),
  },
  {
    title: 'HARSH ACCELERATION AND BRAKING DETECTION',
    sub: 'IMU • GYROSCOPE • EMBEDDED C • FILTERING',
    detail: 'Developed real-time harsh event detection algorithms for acceleration, braking, and cornering using IMU and gyroscope data. Implemented noise filtering and latency-optimized logic for embedded execution.',
    image: assetPath('project-imu.jpg'),
  },
  {
    title: 'LOCOMOTIVE SIMULATION INTEGRATION',
    sub: 'MODBUS • TCP/IP • MATLAB • HIL • PLC',
    detail: 'Delivered real-time locomotive simulation and control integration for Indian Railways. Integrated MATLAB auto-generated C code with a backend server over LAN-based WebSockets. Designed a Hardware-in-the-Loop (HIL) communication pipeline interfacing PLC hardware.',
    image: assetPath('project-railway.jpg'),
  },
];

function TextScramble({ text, active }: { text: string; active: boolean }) {
  const [display, setDisplay] = useState(text);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  useEffect(() => {
    if (!active) {
      setDisplay(text);
      return;
    }
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            if (letter === ' ') return ' ';
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );
      if (iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 1 / 2;
    }, 30);
    return () => clearInterval(interval);
  }, [active, text]);

  return <span>{display}</span>;
}

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const index = Math.min(Math.floor(progress * 3), 2);
          setActiveIndex(index);
          if (imageRef.current) {
            gsap.to(imageRef.current, {
              rotateY: progress * 360,
              rotateX: Math.sin(progress * Math.PI) * 10,
              duration: 0.5,
              ease: 'power2.out',
            });
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative" style={{ height: '300vh' }}>
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen bg-base overflow-hidden flex items-center justify-center"
      >
        {/* Rotating text decorations */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 origin-center -rotate-90 text-[8vh] font-display font-medium text-text-tertiary opacity-[0.08] whitespace-nowrap pointer-events-none select-none">
          AUTONOMOUS PERCEPTION
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 origin-center rotate-90 text-[8vh] font-display font-medium text-text-tertiary opacity-[0.08] whitespace-nowrap pointer-events-none select-none">
          REAL-TIME SYSTEMS
        </div>

        {/* Project Image */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <img
            ref={imageRef}
            src={slides[activeIndex].image}
            alt={slides[activeIndex].title}
            className="w-[55vw] max-w-[700px] h-auto object-contain opacity-40 transition-opacity duration-700"
            style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
          />
        </div>

        {/* Content slides */}
        <div className="relative z-10 max-w-[1400px] mx-auto w-full px-[5vw] flex flex-col items-start">
          {slides.map((slide, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-[5vw] -translate-y-1/2 max-w-xl transition-all duration-500"
              style={{
                opacity: i === activeIndex ? 1 : 0,
                transform: i === activeIndex ? 'translateY(-50%)' : 'translateY(-40%)',
                pointerEvents: i === activeIndex ? 'auto' : 'none',
              }}
            >
              <div className="font-mono text-[0.85rem] text-accent mb-4 tracking-[0.1em] uppercase">
                <TextScramble text={slide.sub} active={i === activeIndex} />
              </div>
              <h2
                className="font-display font-medium text-text-primary leading-[1.1] mb-6"
                style={{ fontSize: 'clamp(1.25rem, 3vw, 2.25rem)' }}
              >
                <TextScramble text={slide.title} active={i === activeIndex} />
              </h2>
              <p className="font-display text-text-secondary text-lg font-light leading-relaxed">
                {slide.detail}
              </p>
            </div>
          ))}

          {/* Progress indicator */}
          <div className="absolute right-[5vw] top-1/2 -translate-y-1/2 flex flex-col gap-3">
            {slides.map((_, i) => (
              <div
                key={i}
                className="w-[2px] h-8 bg-elevated transition-colors duration-300"
                style={{ backgroundColor: i === activeIndex ? '#ADFF00' : '#2A2A2A' }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
