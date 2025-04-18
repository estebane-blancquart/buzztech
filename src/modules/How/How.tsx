import { useEffect, useId, useRef, useState } from "react";

interface HowStep {
  title: string;
  text: string;
}

//////////

interface ProgressBarProps {
  progress: string;
}

function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="h-10 relative border-1 w-full">
      <p className="absolute w-full h-full flex items-center justify-center ">
        {progress}%
      </p>
      <div className="h-full bg-purple" style={{ width: `${progress}%` }}></div>
    </div>
  );
}

//////////

interface TitlesProps {
  steps: HowStep[];
  currentStepIndex: number;
}
function Titles({ steps, currentStepIndex: activeStepIndex }: TitlesProps) {
  return (
    <div className="text-md font-ubuntu leading-5 mt-5 h-10 flex gap-14 items-center justify-between w-full">
      {steps.map(({ title }: HowStep, index: number) => (
        <div
          className={`h-full flex gap-5 items-center transition-all duration-75 ${
            index === activeStepIndex ? "text-white" : "text-white/50"
          }`}
          key={title}
        >
          <p className="text-5xl">{index + 1}</p>
          <p className="uppercase">{title}</p>
        </div>
      ))}
    </div>
  );
}

//////////

interface HowProps {
  steps: HowStep[];
}

function How({ steps }: HowProps) {
  const id = useId();
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLElement>(null);

  const [activeItem, setActiveItem] = useState<number>(0);
  const [progress, setProgress] = useState<string>("0");

  const handleScroll = (e: Event) => {
    const stickyHeight = stickyRef.current?.offsetHeight ?? 0;
    const componentOffsetTop = sectionRef.current?.offsetTop ?? 0;
    const minScroll = componentOffsetTop;
    const maxScroll = minScroll + stickyHeight;

    // console.log(
    //   window.scrollY,
    //   minScroll,
    //   maxScroll,
    //   window.scrollY > minScroll && window.scrollY < maxScroll
    // );
    // console.log(document.querySelector(`[id="${id}"]`)?.clientHeight);

    const newProgress =
      ((window.scrollY - minScroll) / (maxScroll - minScroll)) * 100;
    setProgress(
      newProgress < 0 ? "0" : newProgress > 100 ? "100" : newProgress.toFixed(0)
    );
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id={id} className="relative w-full h-[200vh]" ref={sectionRef}>
      <div className="sticky top-[10vh]" ref={stickyRef}>
        <ProgressBar progress={progress} />

        <Titles steps={steps} currentStepIndex={activeItem} />

        <div className="relative flex items-center justify-center p-10 mt-15">
          <span className="absolute top-0 left-0 border-t-1 border-l-1 w-15 h-15" />
          <span className="absolute bottom-0 left-0 border-b-1 border-l-1 w-15 h-15" />
          <span className="absolute top-0 right-0 border-t-1 border-r-1 w-15 h-15" />
          <span className="absolute bottom-0 right-0 border-b-1 border-r-1 w-15 h-15" />

          <div className="flex flex-col gap-16 max-w-235">
            {steps.map(({ title, text }: HowStep, index: number) => (
              <div
                onClick={() => setActiveItem(index)}
                className={`flex items-center gap-10 transition-all duration-100 ${
                  index === activeItem ? "text-white" : "text-white/50"
                }`}
                key={title}
              >
                <div className="bg-black border-1 w-15 text-2xl h-15 flex items-center justify-center rounded-md font-bold shrink-0">
                  {index + 1}
                </div>
                <p className="text-xl">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
export default How;
