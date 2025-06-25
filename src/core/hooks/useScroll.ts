import { useEffect, useState, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";

interface UseScrollOptions {
  totalItems: number;
  initialIndex?: number;
  throttleDelay?: number;
  fadeDelay?: number;
}

interface UseScrollReturn {
  activeItem: number;
  containerRef: React.RefObject<HTMLDivElement>;
  progressPercentage: number;
  handleItemClick: (index: number) => void;
  isFading: boolean;
}

export function useScroll({ 
  totalItems, 
  initialIndex = 0,
  throttleDelay = 800,
  fadeDelay = 150
}: UseScrollOptions): UseScrollReturn {
  const [activeItem, setActiveItem] = useState<number>(initialIndex);
  const [isFading, setIsFading] = useState(false);
  const [lastScrollTime, setLastScrollTime] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const progressPercentage = ((activeItem + 1) / totalItems) * 100;

  const changeItem = useCallback(
    (newIndex: number) => {
      if (isFading) return;

      setIsFading(true);

      // Fade out → change content → fade in
      setTimeout(() => {
        setActiveItem(newIndex);
        setTimeout(() => {
          setIsFading(false);
        }, 50);
      }, fadeDelay);
    },
    [isFading, fadeDelay]
  );

  const isThrottled = useCallback(() => {
    const now = Date.now();
    return now - lastScrollTime < throttleDelay;
  }, [lastScrollTime, throttleDelay]);

  const updateScrollTime = useCallback(() => {
    setLastScrollTime(Date.now());
  }, []);

  const goToNextModule = useCallback(() => {
    if (isThrottled()) return;
    updateScrollTime();

    const currentScrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const currentModule = Math.round(currentScrollY / viewportHeight);
    const nextModulePosition = (currentModule + 1) * viewportHeight;

    window.scrollTo({
      top: nextModulePosition,
      behavior: "smooth",
    });
  }, [isThrottled, updateScrollTime]);

  const goToPreviousModule = useCallback(() => {
    if (isThrottled()) return;
    updateScrollTime();

    const currentScrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const currentModule = Math.round(currentScrollY / viewportHeight);
    const prevModulePosition = Math.max(
      0,
      (currentModule - 1) * viewportHeight
    );

    window.scrollTo({
      top: prevModulePosition,
      behavior: "smooth",
    });
  }, [isThrottled, updateScrollTime]);

  const handleNavigation = useCallback((direction: 'next' | 'prev') => {
    if (direction === 'next') {
      if (activeItem < totalItems - 1) {
        changeItem(activeItem + 1);
      } else {
        goToNextModule();
      }
    } else {
      if (activeItem > initialIndex) {
        changeItem(activeItem - 1);
      } else {
        goToPreviousModule();
      }
    }
  }, [activeItem, totalItems, initialIndex, changeItem, goToNextModule, goToPreviousModule]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement;
      if (!containerRef.current?.contains(target)) return;

      e.preventDefault();
      e.stopPropagation();

      const direction = e.deltaY > 0 ? 'next' : 'prev';
      handleNavigation(direction);
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY ?? 0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      if (!containerRef.current?.contains(target)) return;
      e.preventDefault();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      if (!containerRef.current?.contains(target)) return;

      const touchEndY = e.changedTouches[0]?.clientY ?? 0;
      const deltaY = touchStartY - touchEndY;

      if (Math.abs(deltaY) < 50) return;

      const direction = deltaY > 0 ? 'next' : 'prev';
      handleNavigation(direction);
    };

    const element = containerRef.current;
    if (!element) return;

    element.addEventListener("wheel", handleWheel, { passive: false });
    element.addEventListener("touchstart", handleTouchStart, { passive: true });
    element.addEventListener("touchmove", handleTouchMove, { passive: false });
    element.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      element.removeEventListener("wheel", handleWheel);
      element.removeEventListener("touchstart", handleTouchStart);
      element.removeEventListener("touchmove", handleTouchMove);
      element.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleNavigation]);

  useEffect(() => {
    setActiveItem(initialIndex);
    setLastScrollTime(0);
  }, [location.pathname, location.state, initialIndex]);

  const handleItemClick = useCallback((index: number) => {
    changeItem(index);
  }, [changeItem]);

  return {
    activeItem,
    containerRef,
    progressPercentage,
    handleItemClick,
    isFading,
  };
}