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

function Scroller({ children, onModuleChange }: ScrollerProps): JSX.Element {
  const [currentModule, setCurrentModule] = useState(0);
  const [isScrollingState, setIsScrollingState] = useState(false);
  const [globalScrollDisabled, setGlobalScrollDisabled] = useState(false);
  const location = useLocation();

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
    interface WindowWithScroller extends Window {
      scrollerControl?: ScrollerControl;
    }

    (window as WindowWithScroller).scrollerControl = {
      disableGlobalScroll: (): void => {
        setGlobalScrollDisabled(true);
        document.documentElement.style.scrollBehavior = 'auto';
        document.body.style.overflow = 'hidden';
      },
      enableGlobalScroll: (): void => {
        setGlobalScrollDisabled(false);
        document.body.style.overflow = '';
        document.documentElement.style.scrollBehavior = 'smooth';
      },
      getCurrentModule: (): number => currentModule,
      isScrolling: (): boolean => isScrollingState,
    } as ScrollerControl;

    return (): void => {
      delete (window as WindowWithScroller).scrollerControl;
    };
  }, [currentModule, isScrollingState]);

  useEffect(() => {
    const handleScroll = (): void => {
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
    const handleScrollStart = (): void => {
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

    return (): void => {
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
    setCurrentModule(0);
    setGlobalScrollDisabled(false);
    window.scrollTo({ top: 0, behavior: 'instant' });

    document.body.style.overflow = '';
    document.documentElement.style.scrollBehavior = 'smooth';

    const scrollerControl = (window as WindowWithScroller).scrollerControl;
    if (scrollerControl) {
      scrollerControl.enableGlobalScroll();
    }
  }, [location.pathname, location.key, location.state]);

  return <div>{children}</div>;
}

export default Scroller;
