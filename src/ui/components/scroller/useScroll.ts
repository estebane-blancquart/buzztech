import { useEffect, useState, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";

interface UseScrollOptions {
  totalItems: number;
  initialIndex?: number;
}

export function useScroll({ totalItems, initialIndex = 0 }: UseScrollOptions) {
  const [activeItem, setActiveItem] = useState<number>(initialIndex);
  const [isFading, setIsFading] = useState(false);
  const [lastScrollTime, setLastScrollTime] = useState(0); // Timestamp du dernier scroll
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
      }, 150);
    },
    [isFading]
  );

  const goToNextModule = useCallback(() => {
    const now = Date.now();
    if (now - lastScrollTime < 800) return; // Throttle de 800ms

    setLastScrollTime(now);

    const currentScrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const currentModule = Math.round(currentScrollY / viewportHeight);
    const nextModulePosition = (currentModule + 1) * viewportHeight;

    window.scrollTo({
      top: nextModulePosition,
      behavior: "smooth",
    });
  }, [lastScrollTime]);

  const goToPreviousModule = useCallback(() => {
    const now = Date.now();
    if (now - lastScrollTime < 800) return; // Throttle de 800ms

    setLastScrollTime(now);

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
  }, [lastScrollTime]);

useEffect(() => {
  const handleWheel = (e: WheelEvent) => {
    const target = e.target as HTMLElement;

    if (!containerRef.current?.contains(target)) return;

    e.preventDefault();
    e.stopPropagation();

    if (e.deltaY > 0) {
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

    if (deltaY > 0) {
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
  };

  const element = containerRef.current;
  if (element) {
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
  }

  return; // <-- Cette ligne fixe l'erreur "Not all code paths return a value"
}, [
  activeItem,
  totalItems,
  initialIndex,
  isFading,
  changeItem,
  goToNextModule,
  goToPreviousModule,
]);
useEffect(() => {
  setActiveItem(initialIndex);
  setLastScrollTime(0); // Reset throttling sur changement de route
}, [location.pathname, location.state, initialIndex]);

const handleItemClick = (index: number) => {
  changeItem(index);
};

return {
  activeItem,
  containerRef,
  progressPercentage,
  handleItemClick,
  isFading,
};
}