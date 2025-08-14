// hooks/useCountUp.js
import { useState, useEffect, useRef } from 'react';

const useCountUp = ({
  end,
  duration = 2000,
  decimals = 0,
  start = 0,
  easingFn = (t) => 1 - Math.pow(1 - t, 3), // ease-out-cubic
  onComplete = () => {}
}) => {
  const [value, setValue] = useState(start);
  const [isAnimating, setIsAnimating] = useState(false);
  const rafRef = useRef(null);
  const startTimeRef = useRef(null);

  const animate = () => {
    if (!startTimeRef.current) {
      startTimeRef.current = Date.now();
    }

    const currentTime = Date.now();
    const elapsed = currentTime - startTimeRef.current;
    const progress = Math.min(elapsed / duration, 1);
    
    const easedProgress = easingFn(progress);
    const currentValue = start + (end - start) * easedProgress;
    
    setValue(currentValue);

    if (progress < 1) {
      rafRef.current = requestAnimationFrame(animate);
    } else {
      setIsAnimating(false);
      onComplete();
    }
  };

  const startAnimation = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    startTimeRef.current = null;
    animate();
  };

  const resetAnimation = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    setValue(start);
    setIsAnimating(false);
    startTimeRef.current = null;
  };

  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const formattedValue = value.toLocaleString('ko-KR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });

  return {
    value,
    formattedValue,
    isAnimating,
    start: startAnimation,
    reset: resetAnimation
  };
};

export default useCountUp;