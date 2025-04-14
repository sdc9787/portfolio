import { useState } from "react";

interface Skill {
  name: string;
  img: string;
}

interface Skills {
  Frontend: Skill[];
  StateManagement: Skill[];
  Deployment: Skill[];
  Tools: Skill[];
}

interface Project {
  title: string;
  content: string;
  imgUrl: string;
  img: number;
  link: string | null;
  github: string;
  skills: Skills;
}

const MAX_VISIBILITY = 2;

const Card = ({ imgUrl, img }: { imgUrl: string; img: number }) => (
  <div className="w-full h-full rounded-lg transition-all duration-300 shadow-lg">
    <img src={`/portfolio/project-img/${imgUrl}/${img}.webp`} alt="Project" className="w-full h-full object-cover rounded-lg" />
  </div>
);

const Carousel = ({ project, active, setActive }: { project: Project; active: number; setActive: React.Dispatch<React.SetStateAction<number>> }) => {
  const count = project.img;

  const handleIndicatorClick = (targetIndex: number) => {
    if (targetIndex === active) return;

    const step = targetIndex > active ? 1 : -1;
    const interval = 100; // 애니메이션 간격 (ms)

    let currentIndex = active;
    const intervalId = setInterval(() => {
      currentIndex += step;
      setActive(currentIndex);

      if (currentIndex === targetIndex) {
        clearInterval(intervalId);
      }
    }, interval);
  };

  return (
    <div className="relative w-[15rem] h-[32rem] flex flex-col items-center justify-center perspective-500">
      <div className="relative w-full h-full flex items-center justify-center">
        {[...new Array(count)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-full transition-all duration-300"
            style={{
              transform: `
                rotateY(${(active - i) * 40}deg) 
                scaleY(${1 + Math.abs(active - i) * -0.1}) 
                translateZ(${Math.abs(active - i) * -20}rem) 
                translateX(${Math.sign(active - i) * -5}rem)
              `,
              opacity: Math.abs(active - i) >= MAX_VISIBILITY ? "0" : "1",
              display: Math.abs(active - i) > MAX_VISIBILITY ? "none" : "block",
              zIndex: -Math.abs(active - i),
            }}>
            <Card imgUrl={project.imgUrl} img={i + 1} />
          </div>
        ))}
      </div>
      {/* 인디케이터 */}
      <div className="flex gap-1 md:gap-2 mt-4">
        {[...new Array(count)].map((_, i) => (
          <div onClick={() => handleIndicatorClick(i)} key={i} className={`cursor-pointer w-2 h-2 md:w-3 md:h-3 rounded-full ${active === i ? "bg-blue-500" : "bg-gray-400"} transition-all duration-300`}></div>
        ))}
      </div>
    </div>
  );
};

const ProjectImage = ({ project }: { project: Project }) => {
  const [active, setActive] = useState(0);
  const count = project.img;

  return (
    <div className="relative w-screen h-full flex flex-col items-center justify-center font-montserrat overflow-hidden">
      {active > 0 && (
        <button className="absolute left-0 top-1/2 text-white cursor-pointer z-10" onClick={() => setActive((prev) => prev - 1)}>
          <i className="xi-angle-left-min xi-3x text-blue-400"></i>
        </button>
      )}
      <Carousel project={project} active={active} setActive={setActive} />
      {active < count - 1 && (
        <button className="absolute right-0 top-1/2 text-white  cursor-pointer z-10" onClick={() => setActive((prev) => prev + 1)}>
          <i className="xi-angle-right-min xi-3x text-blue-400"></i>
        </button>
      )}
    </div>
  );
};

export default ProjectImage;
