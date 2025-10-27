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
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  const lastWheelTimeRef = useRef<number>(0);

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

  useEffect(() => {
    if (isChrome) {
      document.documentElement.style.scrollSnapType = 'none';
      document.documentElement.style.scrollBehavior = 'smooth'; // ✅ Activer smooth pour Chrome aussi
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

  // ✅ VERSION SIMPLIFIÉE: Utiliser behavior: 'smooth' natif pour Chrome aussi
  const smoothScrollTo = (targetPosition: number) => {
    console.log('🎯 Scrolling to:', targetPosition);
    
    // Utiliser le smooth scroll natif du navigateur
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
    
    // Attendre que le scroll soit terminé
    setTimeout(() => {
      console.log('✅ Scroll complete, position:', window.scrollY);
      isTransitioningRef.current = false;
      setIsScrollingState(false);
    }, 800);
  };

  const snapToNearestModule = useCallback(() => {
    if (isTransitioningRef.current || globalScrollDisabled) {
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
  }, [totalModules, globalScrollDisabled, onModuleChange]);

  useEffect(() => {
    if (!isChrome) {
      return;
    }

    console.log('🎡 Installing Chrome WHEEL handler');

    const handleWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement;
      const customScrollZone = target.closest('[data-custom-scroll="true"]');
      
      if (customScrollZone || globalScrollDisabled || isTransitioningRef.current) {
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

      console.log('✅ Scrolling to module:', targetModule);
      
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
      capture: true
    });
    
    return () => {
      document.removeEventListener('wheel', handleWheel, { capture: true } as any);
    };
  }, [totalModules, globalScrollDisabled, onModuleChange]);

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
    console.log('🔄 Route change:', location.pathname);
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