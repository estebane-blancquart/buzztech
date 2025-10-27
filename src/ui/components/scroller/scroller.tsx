import { ReactNode, useEffect, useState, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

interface WindowWithScroller extends Window {
  scrollerControl?: ScrollerControl;
}

interface ScrollerProps {
  children: ReactNode;
  onModuleChange?: (currentModule: number, totalModules: number) => void;
}

interface ScrollerControl {
  disableGlobalScroll: () => void;
  enableGlobalScroll: () => void;
  getCurrentModule: () => number;
  isScrolling: () => boolean;
}

const isChrome =
  /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

// ✅ Liste des routes où le scroller est désactivé
const SCROLL_DISABLED_ROUTES = [
  '/mentions-legales',
  '/politique-confidentialite',
  '/conditions-generales',
];

function Scroller({ children, onModuleChange }: ScrollerProps): JSX.Element {
  const [currentModule, setCurrentModule] = useState(0);
  const [isScrollingState, setIsScrollingState] = useState(false);
  const [globalScrollDisabled, setGlobalScrollDisabled] = useState(false);
  const location = useLocation();
  const isTransitioningRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  const lastWheelTimeRef = useRef<number>(0);

  // ✅ Détecte si on est sur une page légale
  const isLegalPage = SCROLL_DISABLED_ROUTES.includes(location.pathname);

  const getTotalModules = (): number => {
    switch (location.pathname) {
      case '/':
        return 4;
      case '/depannage':
      case '/configuration':
      case '/creation-web':
        return 4;
      default:
        return 3;
    }
  };

  const totalModules = getTotalModules();

  // ✅ Désactive le scroller sur les pages légales
  useEffect(() => {
    if (isLegalPage) {
      // Reset les styles pour scroll normal
      document.documentElement.style.scrollSnapType = '';
      document.documentElement.style.scrollBehavior = 'smooth';
      return;
    }

    // Comportement normal pour les autres pages
    if (isChrome) {
      document.documentElement.style.scrollSnapType = 'none';
      document.documentElement.style.scrollBehavior = 'smooth';
    } else {
      document.documentElement.style.scrollSnapType = 'y mandatory';
      document.documentElement.style.scrollBehavior = 'smooth';
    }

    return () => {
      document.documentElement.style.scrollSnapType = '';
      document.documentElement.style.scrollBehavior = '';
    };
  }, [isLegalPage]);

  useEffect(() => {
    (window as WindowWithScroller).scrollerControl = {
      disableGlobalScroll: (): void => {
        setGlobalScrollDisabled(true);
      },
      enableGlobalScroll: (): void => {
        setGlobalScrollDisabled(false);
      },
      getCurrentModule: (): number => currentModule,
      isScrolling: (): boolean => isScrollingState,
    } as ScrollerControl;

    return (): void => {
      delete (window as WindowWithScroller).scrollerControl;
    };
  }, [currentModule, isScrollingState]);

  const smoothScrollTo = (targetPosition: number) => {
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth',
    });

    setTimeout(() => {
      isTransitioningRef.current = false;
      setIsScrollingState(false);
    }, 800);
  };

  const snapToNearestModule = useCallback(() => {
    if (isTransitioningRef.current || globalScrollDisabled || isLegalPage) {
      return;
    }

    const scrollTop = window.scrollY;
    const viewportHeight = window.innerHeight;
    const targetModule = Math.round(scrollTop / viewportHeight);
    const clampedModule = Math.max(0, Math.min(targetModule, totalModules - 1));
    const targetPosition = clampedModule * viewportHeight;
    const diff = Math.abs(scrollTop - targetPosition);

    if (diff < 5) {
      return;
    }

    isTransitioningRef.current = true;
    setIsScrollingState(true);
    setCurrentModule(clampedModule);

    smoothScrollTo(targetPosition);

    if (onModuleChange) {
      onModuleChange(clampedModule, totalModules);
    }
  }, [totalModules, globalScrollDisabled, onModuleChange, isLegalPage]);

  // ✅ Chrome wheel handler - DÉSACTIVÉ sur pages légales
  useEffect(() => {
    if (!isChrome || isLegalPage) {
      return;
    }

    const handleWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement;
      const customScrollZone = target.closest('[data-custom-scroll="true"]');

      if (
        customScrollZone ||
        globalScrollDisabled ||
        isTransitioningRef.current
      ) {
        if (isTransitioningRef.current) {
          e.preventDefault();
        }
        return;
      }

      const now = Date.now();
      if (now - lastWheelTimeRef.current < 100) {
        e.preventDefault();
        return;
      }

      lastWheelTimeRef.current = now;

      const scrollTop = window.scrollY;
      const viewportHeight = window.innerHeight;
      const currentModuleCalc = Math.floor(scrollTop / viewportHeight);

      let targetModule: number;

      if (e.deltaY > 0) {
        targetModule = Math.min(currentModuleCalc + 1, totalModules - 1);
      } else {
        targetModule = Math.max(currentModuleCalc - 1, 0);
      }

      e.preventDefault();
      e.stopPropagation();

      isTransitioningRef.current = true;
      setIsScrollingState(true);
      setCurrentModule(targetModule);

      const targetPosition = targetModule * viewportHeight;
      smoothScrollTo(targetPosition);

      if (onModuleChange) {
        onModuleChange(targetModule, totalModules);
      }
    };

    document.addEventListener('wheel', handleWheel, {
      passive: false,
      capture: true,
    });

    return () => {
      document.removeEventListener('wheel', handleWheel, {
        capture: true,
      } as any);
    };
  }, [totalModules, globalScrollDisabled, onModuleChange, isLegalPage]);

  // ✅ Chrome scroll handler - DÉSACTIVÉ sur pages légales
  useEffect(() => {
    if (!isChrome || isLegalPage) return;

    const handleScroll = () => {
      if (globalScrollDisabled || isTransitioningRef.current) return;

      const scrollTop = window.scrollY;
      const viewportHeight = window.innerHeight;
      const moduleIndex = Math.floor(scrollTop / viewportHeight);
      const newModule = Math.min(moduleIndex, totalModules - 1);

      if (newModule !== currentModule) {
        setCurrentModule(newModule);
      }

      setIsScrollingState(true);

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrollingState(false);
        snapToNearestModule();
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [currentModule, totalModules, globalScrollDisabled, snapToNearestModule, isLegalPage]);

  // ✅ Firefox scroll handler - DÉSACTIVÉ sur pages légales
  useEffect(() => {
    if (isChrome || isLegalPage) return;

    const handleScroll = () => {
      if (globalScrollDisabled) return;

      const scrollTop = window.scrollY;
      const viewportHeight = window.innerHeight;
      const moduleIndex = Math.round(scrollTop / viewportHeight);
      const newModule = Math.min(moduleIndex, totalModules - 1);

      if (newModule !== currentModule) {
        setCurrentModule(newModule);
        if (onModuleChange) {
          onModuleChange(newModule, totalModules);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentModule, totalModules, globalScrollDisabled, onModuleChange, isLegalPage]);

  // Reset on route change
  useEffect(() => {
    setCurrentModule(0);
    setGlobalScrollDisabled(false);
    isTransitioningRef.current = false;

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname, totalModules]);

  return <div>{children}</div>;
}

export default Scroller;