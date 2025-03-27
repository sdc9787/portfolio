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
    <img src={`/project-img/${imgUrl}/${img}.webp`} alt="Project" className="w-full h-full object-cover rounded-lg" />
  </div>
);

const Carousel = ({ project, active }: { project: Project; active: number }) => {
  const count = project.img;

  return (
    <div className="relative w-[15rem] h-[32rem] flex items-center justify-center perspective-500">
      {[...new Array(count)].map((img, i) => (
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
            filter: `blur(${Math.abs(active - i) / 5}rem)`,
            opacity: Math.abs(active - i) >= MAX_VISIBILITY ? "0" : "1",
            display: Math.abs(active - i) > MAX_VISIBILITY ? "none" : "block",
            zIndex: -Math.abs(active - i),
          }}>
          <Card imgUrl={project.imgUrl} img={i + 1} />
        </div>
      ))}
    </div>
  );
};

const ProjectImage = ({ project }: { project: Project }) => {
  const [active, setActive] = useState(0);
  const count = project.img;

  return (
    <div className="relative w-screen h-full flex items-center justify-center font-montserrat overflow-hidden">
      {active > 0 && (
        <button className="absolute left-0 top-1/2  text-white text-5xl cursor-pointer z-10" onClick={() => setActive((prev) => prev - 1)}>
          <i className="xi-angle-left-min xi-x text-blue-400"></i>
        </button>
      )}
      <Carousel project={project} active={active} />
      {active < count - 1 && (
        <button className="absolute right-0 top-1/2  text-white text-5xl cursor-pointer z-10" onClick={() => setActive((prev) => prev + 1)}>
          <i className="xi-angle-right-min xi-x text-blue-400"></i>
        </button>
      )}
    </div>
  );
};

export default ProjectImage;
