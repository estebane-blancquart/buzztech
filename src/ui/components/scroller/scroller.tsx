import { ReactNode, useEffect, useState } from 'react';
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

function Scroller({ children, onModuleChange }: ScrollerProps) {
  const [currentModule, setCurrentModule] = useState(0);
  const [isScrollingState, setIsScrollingState] = useState(false);
  const [globalScrollDisabled, setGlobalScrollDisabled] = useState(false);
  const location = useLocation();

  const getTotalModules = () => {
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
    interface WindowWithScroller extends Window {
      scrollerControl?: ScrollerControl;
    }

    (window as WindowWithScroller).scrollerControl = {
      disableGlobalScroll: () => {
        setGlobalScrollDisabled(true);
        document.documentElement.style.scrollBehavior = 'auto';
        document.body.style.overflow = 'hidden';
      },
      enableGlobalScroll: () => {
        setGlobalScrollDisabled(false);
        document.body.style.overflow = '';
        document.documentElement.style.scrollBehavior = 'smooth';
      },
      getCurrentModule: () => currentModule,
      isScrolling: () => isScrollingState,
    } as ScrollerControl;

    return () => {
      delete (window as WindowWithScroller).scrollerControl;
    };
  }, [currentModule, isScrollingState]);

  useEffect(() => {
    const handleScroll = () => {
      if (globalScrollDisabled) return;

      const scrollTop = window.scrollY;
      const viewportHeight = window.innerHeight;
      const moduleIndex = Math.floor(scrollTop / viewportHeight);

      const currentModuleIndex = Math.min(moduleIndex, totalModules - 1);

      if (currentModuleIndex !== currentModule) {
        setCurrentModule(currentModuleIndex);
        if (onModuleChange) {
          onModuleChange(currentModuleIndex, totalModules);
        }
      }
    };

    let scrollTimeout: NodeJS.Timeout;
    const handleScrollStart = () => {
      setIsScrollingState(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrollingState(false);

        const scrollTop = window.scrollY;
        const viewportHeight = window.innerHeight;
        const moduleIndex = Math.round(scrollTop / viewportHeight);
        const targetPosition = moduleIndex * viewportHeight;

        if (Math.abs(scrollTop - targetPosition) > 10) {
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth',
          });
        }
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('scroll', handleScrollStart, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleScrollStart);
      clearTimeout(scrollTimeout);
    };
  }, [currentModule, totalModules, globalScrollDisabled, onModuleChange]);
  useEffect(() => {
    if (onModuleChange) {
      onModuleChange(currentModule, totalModules);
    }
  }, [currentModule, totalModules, onModuleChange]);

  useEffect(() => {
    console.log(
      'Scroller: Reset complet - pathname:',
      location.pathname,
      'key:',
      location.key
    );

    setCurrentModule(0);
    setGlobalScrollDisabled(false);
    window.scrollTo({ top: 0, behavior: 'instant' });

    document.body.style.overflow = '';
    document.documentElement.style.scrollBehavior = 'smooth';

    const scrollerControl = (window as WindowWithScroller).scrollerControl; if (scrollerControl) {
      scrollerControl.enableGlobalScroll();
    }
  }, [location.pathname, location.key, location.state]);

  return <div>{children}</div>;
}

export default Scroller;
