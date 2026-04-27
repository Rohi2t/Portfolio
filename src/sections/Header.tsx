import { useEffect, useState, useRef } from 'react';

export default function Header() {
  const [visible, setVisible] = useState(true);
  const lastScroll = useRef(0);
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const h = hours % 12 || 12;
      const m = minutes.toString().padStart(2, '0');
      const s = seconds.toString().padStart(2, '0');
      setTime(`${h}:${m}:${s} ${ampm} IST`);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      if (current > lastScroll.current && current > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScroll.current = current;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className="fixed top-[40px] left-[40px] right-[40px] z-50 flex justify-between items-center transition-opacity duration-500"
      style={{ opacity: visible ? 1 : 0, pointerEvents: visible ? 'auto' : 'none' }}
    >
      <div className="font-mono text-[0.85rem] tracking-[0.05em] text-text-primary uppercase">
        Bhargav Rohit
      </div>
      <div className="font-mono text-[0.85rem] text-text-tertiary">
        {time}
      </div>
    </header>
  );
}
