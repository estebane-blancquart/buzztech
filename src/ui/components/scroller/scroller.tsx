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

const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

const easeInOutCubic = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

function Scroller({ children, onModuleChange }: ScrollerProps): JSX.Element {
  const [currentModule, setCurrentModule] = useState(0);
  const [isScrollingState, setIsScrollingState] = useState(false);
  const [globalScrollDisabled, setGlobalScrollDisabled] = useState(false);
  const location = useLocation();
  const isTransitioningRef = useRef(false);
  const animationFrameRef = useRef<number>();
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();

  const getTotalModules = (): number => {
    switch (location.pathname) {
      case '/':
        return 3;
      case '/depannage':
      case '/configuration':
      case '/creation-web':
        return 4;
      default:
        return 3;
    }
  };

  const totalModules = getTotalModules();

  useEffect(() => {
    if (isChrome) {
      document.documentElement.style.scrollSnapType = 'none';
    } else {
      document.documentElement.style.scrollSnapType = 'y mandatory';
      document.documentElement.style.scrollBehavior = 'smooth';
    }

    return () => {
      document.documentElement.style.scrollSnapType = '';
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

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

  const smoothScrollTo = useCallback((targetPosition: number, duration: number = 800) => {
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    
    console.log('��� Smooth scroll:', { startPosition, targetPosition, distance });
    
    const startTime = performance.now();

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easing = easeInOutCubic(progress);
      
      window.scrollTo(0, startPosition + distance * easing);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animateScroll);
      } else {
        console.log('✅ Snap terminé');
        isTransitioningRef.current = false;
        setIsScrollingState(false);
      }
    };

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(animateScroll);
  }, []);

  const snapToNearestModule = useCallback(() => {
    if (isTransitioningRef.current || globalScrollDisabled) {
      console.log('⏭️ Snap bloqué:', { isTransitioning: isTransitioningRef.current, globalScrollDisabled });
      return;
    }

    const scrollTop = window.scrollY;
    const viewportHeight = window.innerHeight;
    const targetModule = Math.round(scrollTop / viewportHeight);
    const clampedModule = Math.max(0, Math.min(targetModule, totalModules - 1));
    const targetPosition = clampedModule * viewportHeight;
    const diff = Math.abs(scrollTop - targetPosition);

    console.log('��� Snap check:', { scrollTop, targetModule, clampedModule, diff });

    if (diff < 5) {
      console.log('✓ Déjà aligné');
      return;
    }

    isTransitioningRef.current = true;
    setIsScrollingState(true);
    setCurrentModule(clampedModule);

    smoothScrollTo(targetPosition, 800);

    if (onModuleChange) {
      onModuleChange(clampedModule, totalModules);
    }
  }, [totalModules, globalScrollDisabled, smoothScrollTo, onModuleChange]);

  useEffect(() => {
    if (!isChrome) return;

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
        console.log('⏸️ Scroll arrêté, lancement du snap');
        setIsScrollingState(false);
        snapToNearestModule();
      }, 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [currentModule, totalModules, globalScrollDisabled, snapToNearestModule]);

  useEffect(() => {
    if (isChrome) return;

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
  }, [currentModule, totalModules, globalScrollDisabled, onModuleChange]);

  useEffect(() => {
    setCurrentModule(0);
    setGlobalScrollDisabled(false);
    isTransitioningRef.current = false;
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  return <div>{children}</div>;
}

export default Scroller;
