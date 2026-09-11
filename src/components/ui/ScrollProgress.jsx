import React, { useEffect, useState } from 'react';

export function ScrollProgress() {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const totalScroll = documentHeight - windowHeight;
      const percentage = (scrollTop / totalScroll) * 100;
      setScrollPercentage(percentage);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] bg-slate-900/40 z-50 pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-orange-600 via-amber-400 to-yellow-300 transition-all duration-150 ease-out shadow-[0_0_12px_#FF6B00]"
        style={{ width: `${scrollPercentage}%` }}
      />
    </div>
  );
}
