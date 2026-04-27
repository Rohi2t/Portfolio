import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'OBJECT DETECTION & TRACKING USING LIDAR',
    tags: 'C, C++, PCL, ROS, RVIZ',
    body: 'LiDAR perception pipeline with ground segmentation and multi-object tracking using JPDA. Cross-compiled and deployed on NVIDIA Jetson AGX Orin with ROS-based middleware.',
    image: '/project-lidar.jpg',
  },
  {
    title: 'HARSH ACCELERATION & BRAKING DETECTION',
    tags: 'EMBEDDED C, IMU, GYROSCOPE',
    body: 'Real-time harsh event detection for acceleration, braking, and cornering. Noise filtering and latency-optimized logic for robust, low-false-positive embedded execution.',
    image: '/project-imu.jpg',
  },
  {
    title: 'LOCOMOTIVE SIMULATION INTEGRATION',
    tags: 'MODBUS, TCP/IP, MATLAB, WEBSOCKETS',
    body: 'HIL communication pipeline for Indian Railways. MATLAB auto-generated C code integrated with backend server over LAN WebSockets, interfacing PLC hardware via Modbus.',
    image: '/project-railway.jpg',
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.project-card');
        gsap.from(cards, {
          y: 100,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-text-primary py-[clamp(80px,15vh,150px)]">
      <div className="max-w-[1400px] mx-auto px-[5vw] mb-12">
        <h2
          className="font-display font-medium text-base leading-[1.1]"
          style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)' }}
        >
          PROJECTS
        </h2>
      </div>
      <div
        ref={cardsRef}
        className="max-w-[1400px] mx-auto px-[5vw] grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-text-secondary"
      >
        {projects.map((project, i) => (
          <div
            key={i}
            className="project-card group bg-text-primary overflow-hidden flex flex-col transition-colors duration-500 hover:bg-accent cursor-pointer"
          >
            {/* Project Image */}
            <div className="relative h-[220px] overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-text-primary/60 to-transparent" />
            </div>
            
            <div className="p-8 md:p-10 flex flex-col justify-between flex-1">
              <div>
                <div className="font-mono text-[0.75rem] text-text-secondary group-hover:text-base mb-4 tracking-[0.05em] uppercase transition-colors duration-500">
                  {project.tags}
                </div>
                <h3
                  className="font-display font-medium text-base leading-[1.1] mb-4 transition-colors duration-500"
                  style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)' }}
                >
                  {project.title}
                </h3>
                <p className="font-display text-base font-light leading-relaxed group-hover:text-base transition-colors duration-500">
                  {project.body}
                </p>
              </div>
              <div className="mt-8 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-8 h-[1px] bg-base" />
                <span className="font-mono text-[0.75rem] text-base uppercase tracking-[0.1em]">
                  View Details
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
