// hooks/useAutoHighlight.js
import { useState, useEffect, useCallback } from 'react';

const useAutoHighlight = ({
  totalItems,
  intervalDuration = 10000,
  enabled = true,
  onHighlight = () => {}
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // 다음 아이템으로 이동
  const next = useCallback(() => {
    setActiveIndex((prev) => {
      const nextIndex = (prev + 1) % totalItems;
      onHighlight(nextIndex);
      return nextIndex;
    });
  }, [totalItems, onHighlight]);

  // 이전 아이템으로 이동
  const previous = useCallback(() => {
    setActiveIndex((prev) => {
      const prevIndex = (prev - 1 + totalItems) % totalItems;
      onHighlight(prevIndex);
      return prevIndex;
    });
  }, [totalItems, onHighlight]);

  // 특정 인덱스로 이동
  const goTo = useCallback((index) => {
    if (index >= 0 && index < totalItems) {
      setActiveIndex(index);
      onHighlight(index);
    }
  }, [totalItems, onHighlight]);

  // 일시정지/재개
  const pause = useCallback(() => {
    setIsPaused(true);
  }, []);

  const resume = useCallback(() => {
    setIsPaused(false);
  }, []);

  const toggle = useCallback(() => {
    setIsPaused(prev => !prev);
  }, []);

  // 자동 순환
  useEffect(() => {
    if (!enabled || isPaused || totalItems <= 0) return;

    const interval = setInterval(() => {
      next();
    }, intervalDuration);

    return () => clearInterval(interval);
  }, [enabled, isPaused, totalItems, intervalDuration, next]);

  // 키보드 컨트롤
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!enabled) return;
      
      switch(e.key) {
        case 'ArrowLeft':
          previous();
          pause();
          break;
        case 'ArrowRight':
          next();
          pause();
          break;
        case ' ':
          e.preventDefault();
          toggle();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [enabled, next, previous, pause, toggle]);

  return {
    activeIndex,
    isPaused,
    next,
    previous,
    goTo,
    pause,
    resume,
    toggle,
    isActive: (index) => index === activeIndex
  };
};

export default useAutoHighlight;