import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const links = [
  { label: 'HERO', href: '#hero' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'SKILLS', href: '#skills' },
  { label: 'EDUCATION', href: '#education' },
  { label: 'CONTACT', href: '#contact' },
];

export default function Menu({ isOpen, onClose }: MenuProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!overlayRef.current) return;

    if (isOpen) {
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
        pointerEvents: 'auto',
      });
      if (linksRef.current) {
        const items = linksRef.current.querySelectorAll('.menu-link');
        gsap.from(items, {
          y: 60,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.08,
          delay: 0.2,
        });
      }
    } else {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        pointerEvents: 'none',
      });
    }
  }, [isOpen]);

  const handleClick = (href: string) => {
    onClose();
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 400);
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[60] bg-base/95 backdrop-blur-[20px] flex items-center justify-center opacity-0 pointer-events-none"
    >
      <div ref={linksRef} className="flex flex-col items-center gap-4">
        {links.map((link, i) => (
          <button
            key={i}
            onClick={() => handleClick(link.href)}
            className="menu-link font-display font-medium text-text-primary hover:text-accent transition-colors duration-300"
            style={{ fontSize: 'clamp(2rem, 6vw, 4rem)' }}
          >
            {link.label}
          </button>
        ))}
      </div>
    </div>
  );
}
