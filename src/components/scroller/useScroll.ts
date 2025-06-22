import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";

interface UseScrollOptions {
  totalItems: number;
  initialIndex?: number;
}

export function useScroll({ totalItems, initialIndex = 0 }: UseScrollOptions) {
  const [activeItem, setActiveItem] = useState<number>(initialIndex);
  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const progressPercentage = ((activeItem + 1) / totalItems) * 100;

  const goToNextModule = () => {
    const currentScrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const nextModulePosition =
      Math.ceil(currentScrollY / viewportHeight) * viewportHeight;

    window.scrollTo({
      top: nextModulePosition,
      behavior: "smooth",
    });
  };

  const goToPreviousModule = () => {
    const currentScrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const prevModulePosition =
      Math.floor(currentScrollY / viewportHeight - 1) * viewportHeight;

    window.scrollTo({
      top: Math.max(0, prevModulePosition),
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement;

      if (!containerRef.current?.contains(target)) return;

      e.preventDefault();
      e.stopPropagation();

      if (e.deltaY > 0) {
        if (activeItem < totalItems - 1) {
          setActiveItem(activeItem + 1);
        } else {
          goToNextModule();
        }
      } else {
        if (activeItem > initialIndex) {
          setActiveItem(activeItem - 1);
        } else {
          goToPreviousModule();
        }
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      if (!containerRef.current?.contains(target)) return;

      e.preventDefault();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      if (!containerRef.current?.contains(target)) return;

      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY;

      if (Math.abs(deltaY) < 50) return;

      if (deltaY > 0) {
        if (activeItem < totalItems - 1) {
          setActiveItem(activeItem + 1);
        } else {
          goToNextModule();
        }
      } else {
        if (activeItem > initialIndex) {
          setActiveItem(activeItem - 1);
        } else {
          goToPreviousModule();
        }
      }
    };

    const element = containerRef.current;
    if (element) {
      element.addEventListener("wheel", handleWheel, { passive: false });
      element.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      });
      element.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      element.addEventListener("touchend", handleTouchEnd, { passive: true });

      return () => {
        element.removeEventListener("wheel", handleWheel);
        element.removeEventListener("touchstart", handleTouchStart);
        element.removeEventListener("touchmove", handleTouchMove);
        element.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, [activeItem, totalItems, initialIndex]);

  useEffect(() => {
    setActiveItem(initialIndex);
  }, [location.pathname, location.state, initialIndex]);

  const handleItemClick = (index: number) => {
    setActiveItem(index);
  };

  return {
    activeItem,
    containerRef,
    progressPercentage,
    handleItemClick,
  };
}
