import { useEffect, useState, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { UseScrollOptions, UseScrollReturn } from '@/core/types';

export function useScroll({
  totalItems,
  initialIndex = 0,
  throttleDelay = 800,
  fadeDelay = 150,
}: UseScrollOptions): UseScrollReturn {
  const [activeItem, setActiveItem] = useState<number>(initialIndex);
  const [isFading, setIsFading] = useState(false);
  const [lastScrollTime, setLastScrollTime] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  
  // ✅ Refs pour stocker les timeouts et les nettoyer
  const fadeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const fadeInTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const focusTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const progressPercentage = ((activeItem + 1) / totalItems) * 100;

  // ✅ Fonction de nettoyage des timeouts
  const clearAllTimeouts = useCallback(() => {
    if (fadeTimeoutRef.current) {
      clearTimeout(fadeTimeoutRef.current);
      fadeTimeoutRef.current = null;
    }
    if (fadeInTimeoutRef.current) {
      clearTimeout(fadeInTimeoutRef.current);
      fadeInTimeoutRef.current = null;
    }
    if (focusTimeoutRef.current) {
      clearTimeout(focusTimeoutRef.current);
      focusTimeoutRef.current = null;
    }
  }, []);

  const changeItem = useCallback(
    (newIndex: number): void => {
      if (isFading) return;

      setIsFading(true);

      // ✅ Nettoyer les timeouts précédents
      clearAllTimeouts();

      // Fade out → change content → fade in
      fadeTimeoutRef.current = setTimeout(() => {
        setActiveItem(newIndex);
        fadeInTimeoutRef.current = setTimeout(() => {
          setIsFading(false);
        }, 50);
      }, fadeDelay);
    },
    [isFading, fadeDelay, clearAllTimeouts]
  );

  const isThrottled = useCallback((): boolean => {
    const now = Date.now();
    return now - lastScrollTime < throttleDelay;
  }, [lastScrollTime, throttleDelay]);

  const updateScrollTime = useCallback((): void => {
    setLastScrollTime(Date.now());
  }, []);

  const goToNextModule = useCallback(
    (bypassThrottle = false): void => {
      if (!bypassThrottle && isThrottled()) return;
      if (!bypassThrottle) updateScrollTime();

      const currentScrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const currentModule = Math.round(currentScrollY / viewportHeight);
      const nextModulePosition = (currentModule + 1) * viewportHeight;

      window.scrollTo({
        top: nextModulePosition,
        behavior: bypassThrottle ? 'instant' : 'smooth', // Instant pour clavier
      });

      // ✅ Nettoyer le timeout précédent avant d'en créer un nouveau
      if (focusTimeoutRef.current) {
        clearTimeout(focusTimeoutRef.current);
      }

      // Focus automatique - plus rapide pour clavier
      const focusDelay = bypassThrottle ? 100 : 600;
      focusTimeoutRef.current = setTimeout(() => {
        const nextModuleElement = document
          .elementFromPoint(window.innerWidth / 2, window.innerHeight / 2)
          ?.closest('[tabindex="0"]') as HTMLElement;

        if (nextModuleElement) {
          nextModuleElement.focus();
        }
      }, focusDelay);
    },
    [isThrottled, updateScrollTime]
  );

  const goToPreviousModule = useCallback(
    (bypassThrottle = false): void => {
      if (!bypassThrottle && isThrottled()) return;
      if (!bypassThrottle) updateScrollTime();

      const currentScrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const currentModule = Math.round(currentScrollY / viewportHeight);
      const prevModulePosition = Math.max(
        0,
        (currentModule - 1) * viewportHeight
      );

      window.scrollTo({
        top: prevModulePosition,
        behavior: bypassThrottle ? 'instant' : 'smooth', // Instant pour clavier
      });

      // ✅ Nettoyer le timeout précédent avant d'en créer un nouveau
      if (focusTimeoutRef.current) {
        clearTimeout(focusTimeoutRef.current);
      }

      // Focus automatique - plus rapide pour clavier
      const focusDelay = bypassThrottle ? 100 : 600;
      focusTimeoutRef.current = setTimeout(() => {
        const prevModuleElement = document
          .elementFromPoint(window.innerWidth / 2, window.innerHeight / 2)
          ?.closest('[tabindex="0"]') as HTMLElement;

        if (prevModuleElement) {
          prevModuleElement.focus();
        }
      }, focusDelay);
    },
    [isThrottled, updateScrollTime]
  );

  const handleNavigation = useCallback(
    (direction: 'next' | 'prev', bypassThrottle = false): void => {
      if (direction === 'next') {
        if (activeItem < totalItems - 1) {
          changeItem(activeItem + 1);
        } else {
          goToNextModule(bypassThrottle);
        }
      } else {
        if (activeItem > initialIndex) {
          changeItem(activeItem - 1);
        } else {
          goToPreviousModule(bypassThrottle);
        }
      }
    },
    [
      activeItem,
      totalItems,
      initialIndex,
      changeItem,
      goToNextModule,
      goToPreviousModule,
    ]
  );

  useEffect(() => {
    const handleWheel = (e: WheelEvent): void => {
      const target = e.target as HTMLElement;
      if (!containerRef.current?.contains(target)) return;

      e.preventDefault();
      e.stopPropagation();

      const direction = e.deltaY > 0 ? 'next' : 'prev';
      handleNavigation(direction); // Souris avec throttle
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent): void => {
      touchStartY = e.touches[0]?.clientY ?? 0;
    };

    const handleTouchMove = (e: TouchEvent): void => {
      const target = e.target as HTMLElement;
      if (!containerRef.current?.contains(target)) return;
      e.preventDefault();
    };

    const handleTouchEnd = (e: TouchEvent): void => {
      const target = e.target as HTMLElement;
      if (!containerRef.current?.contains(target)) return;

      const touchEndY = e.changedTouches[0]?.clientY ?? 0;
      const deltaY = touchStartY - touchEndY;

      if (Math.abs(deltaY) < 50) return;

      const direction = deltaY > 0 ? 'next' : 'prev';
      handleNavigation(direction); // Touch avec throttle
    };

    // Navigation clavier accessible (SANS throttling)
    const handleKeyDown = (e: KeyboardEvent): void => {
      const target = e.target as HTMLElement;
      if (!containerRef.current?.contains(target)) return;

      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        handleNavigation('next', true); // Clavier SANS throttle
      }

      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        handleNavigation('prev', true); // Clavier SANS throttle
      }
    };

    const element = containerRef.current;
    if (!element) return;

    element.addEventListener('wheel', handleWheel, { passive: false });
    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchmove', handleTouchMove, { passive: false });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });
    element.addEventListener('keydown', handleKeyDown, { passive: false });

    return (): void => {
      element.removeEventListener('wheel', handleWheel);
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
      element.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleNavigation]);

  useEffect(() => {
    setActiveItem(initialIndex);
    setLastScrollTime(0);
  }, [location.pathname, location.state, initialIndex]);

  // ✅ Nettoyer tous les timeouts au démontage du composant
  useEffect(() => {
    return () => {
      clearAllTimeouts();
    };
  }, [clearAllTimeouts]);

  const handleItemClick = useCallback(
    (index: number): void => {
      changeItem(index);
    },
    [changeItem]
  );

  return {
    activeItem,
    containerRef,
    progressPercentage,
    handleItemClick,
    isFading,
  };
}