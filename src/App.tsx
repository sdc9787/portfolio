import { useEffect, useState } from "react";
import ProjectImage from "./Component/ProjectImage";
import { Modal } from "./Component/Modal";

interface AboutMe {
  title: string;
  content: string;
}

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
  title: string; //제목
  content: string; //내용
  detailContent: {}; //상세 내용
  imgUrl: string; //이미지 경로
  img: number; //이미지 개수
  link: string | null; //링크
  github: string; //깃허브 링크
  skills: Skills; //기술 스택
  team: string; //팀원
  period: string; //개발 기간
}

function App() {
  const title_typing: string = "프론트엔드 개발자 신대철입니다";
  const sectionIds = ["home", "about", "skills", "projects", "contact"];
  const [activeSection, setActiveSection] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
  };

  // 스크롤 감지해서 현재 보이는 섹션 업데이트
  useEffect(() => {
    const handleScroll = () => {
      let currentSection = activeSection;
      const scrollPosition = window.scrollY + window.innerHeight * 0.3; // 화면 상단에서 30% 위치 기준

      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (section) {
          const rect = section.getBoundingClientRect();
          const sectionTop = window.scrollY + rect.top;
          const sectionBottom = sectionTop + section.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            currentSection = id;
          }
        }
      }
      //gap으로 인한 빈 공간이 생기는 경우 섹션 초기화 방지
      if (currentSection) setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 초기 실행
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const aboutMe: AboutMe[] = [
    {
      title: "사용자 중심 개발",
      content: "웹사이트는 단순히 기능을 제공하는 것이 아니라, 사용자가 편리하게 경험할 수 있어야 합니다. 저는 사용자 중심 개발을 최우선으로 생각하며, 직관적인 UI/UX 설계와 반응형 디자인을 통해 어떤 기기에서도 최적의 화면을 제공하는 것을 중요하게 여깁니다.",
    },
    {
      title: "SEO 최적화 경험",
      content: "웹 사이트를 개발및 유지보수를 진행하면서 SEO 최적화의 중요성을 경험했습니다. 3개월 동안 구글 서치 콘솔 노출5,000회, 클릭 1,000회 달성등 검색 엔진에서 더 많은 사용자가 유입될 수 있도록 노력했습니다.",
    },
  ];

  const skills: Skills = {
    Frontend: [
      { name: "HTML", img: "/icon/HTML.svg" },
      { name: "CSS", img: "/icon/CSS.svg" },
      { name: "TypeScript", img: "/icon/TypeScript.svg" },
      { name: "React", img: "/icon/React-Light.svg" },
      { name: "Next.js", img: "/icon/NextJS-Light.svg" },
      { name: "Tailwind CSS", img: "/icon/TailwindCSS-Light.svg" },
    ],
    StateManagement: [
      { name: "Redux", img: "/icon/Redux.svg" },
      { name: "Zustand", img: "/icon/Zustand.svg" },
    ],
    Deployment: [
      { name: "AWS", img: "/icon/AWS-Light.svg" },
      { name: "Cloudflare", img: "/icon/Cloudflare-Light.svg" },
    ],
    Tools: [
      { name: "Git", img: "/icon/Git.svg" },
      { name: "Jira", img: "/icon/Jira.svg" },
      { name: "Postman", img: "/icon/Postman.svg" },
    ],
  };

  const projects: Project[] = [
    {
      title: "반려동물 돌보미 플랫폼",
      content: "반려동물을 위한 돌보미 플랫폼으로, 산책 및 돌봄 매칭, 커뮤니티, 플레이스(지도)등의 서비스를 제공합니다.",
      detailContent: [
        {
          title: "웹소켓을 활용한 실시간 위치 공유 및 채팅",
          content: ["웹소켓을 이용해 실시간 위치 공유 및 채팅 기능 구현", "사용자가 원하는 시간에 반려동물의 실시간 위치 확인 가능"],
        },
        {
          title: "회원 관리 및 보안을 위한 JWT 인증",
          content: ["회원가입 시 이메일 인증을 통한 계정 활성화", "소셜 로그인 기능 지원으로 간편한 회원가입 제공", "JWT를 활용한 로그인 및 사용자 인증 강화"],
        },
        {
          title: "Toss Payments API를 활용한 결제 시스템",
          content: ["Toss Payments API를 이용한 결제 시스템 구현", "안전하고 편리한 결제 프로세스 제공"],
        },
      ],
      team: "3인 팀 프로젝트[FE 1, BE 2]",
      period: "2024.03 ~ 2024.06",
      imgUrl: "pet",
      img: 19,
      link: null,
      github: "https://github.com/sdc9787/pet-sitter-pwa",
      skills: {
        Frontend: [
          { name: "React", img: "/icon/React-Light.svg" },
          { name: "Tailwind CSS", img: "/icon/TailwindCSS-Light.svg" },
          { name: "TypeScript", img: "/icon/TypeScript.svg" },
          { name: "PWA", img: "/icon/PWA.svg" },
        ],
        StateManagement: [{ name: "Redux", img: "/icon/Redux.svg" }],
        Deployment: [{ name: "Cloudflare", img: "/icon/Cloudflare-Light.svg" }],
        Tools: [
          { name: "Git", img: "/icon/Git.svg" },
          { name: "Postman", img: "/icon/Postman.svg" },
        ],
      },
    },
    {
      title: "로스트아크 정보 제공 사이트",
      content: "실시간 게임 정보를 제공하는 사이트입니다. 게임 정보를 제공하는 API를 활용하여 사용자가 원하는 게임 정보를 쉽게 찾을 수 있도록 구현했습니다.",
      detailContent: [
        {
          title: "SEO 최적화",
          content: ["Helmet을 활용하여 페이지별 메타 태그 추가 및 SEO 최적화", "구글 및 네이버 검색 최적화를 통해 최상단 검색 결과 달성", "3개월간 구글 서치 콘솔 노출 약 5,000회, 클릭 약 1,000회 기록"],
        },
        {
          title: "반응형 디자인",
          content: ["모바일 및 데스크톱 등 다양한 화면 크기에 대응하는 반응형 디자인 구현", "Tailwind CSS를 활용하여 유연한 레이아웃 구성"],
        },
        {
          title: "이미지 최적화",
          content: ["빠른 로딩을 위해 PNG를 WebP 형식으로 변환", "일부 이미지는 CDN을 활용하여 로딩 속도 개선"],
        },
        {
          title: "Git Flow와 Jira를 활용한 협업",
          content: ["효율적인 브랜치 관리를 위한 Git Flow 전략 적용", "Jira를 활용한 이슈 관리 및 스프린트 진행"],
        },
      ],
      team: "2인 팀 프로젝트[FE 1, BE 1]",
      period: "2024.10 ~ 2024.12 [유지 보수 중]",
      imgUrl: "moaloa",
      img: 7,
      link: "https://moaloa.org",
      github: "https://github.com/msw-Hub/moaloa",
      skills: {
        Frontend: [
          { name: "React", img: "/icon/React-Light.svg" },
          { name: "TypeScript", img: "/icon/TypeScript.svg" },
          { name: "Tailwind CSS", img: "/icon/TailwindCSS-Light.svg" },
        ],
        StateManagement: [{ name: "Redux", img: "/icon/Redux.svg" }],
        Deployment: [
          { name: "AWS", img: "/icon/AWS-Light.svg" },
          { name: "Cloudflare", img: "/icon/Cloudflare-Light.svg" },
        ],
        Tools: [
          { name: "Git", img: "/icon/Git.svg" },
          { name: "Jira", img: "/icon/Jira.svg" },
          { name: "Postman", img: "/icon/Postman.svg" },
        ],
      },
    },
  ];

  //사이트 로딩시 타이핑 효과
  useEffect(() => {
    const typing = document.querySelector(".animate-typing") as HTMLElement;
    const text = title_typing.split("");
    let i = 0;

    //0.1초마다 한 글자씩 출력
    function type() {
      if (i < text.length) {
        typing.innerHTML = text.slice(0, i + 1).join("");
        i++;
        setTimeout(type, 150);
      }
    }

    type();
  }, []);

  return (
    <div className="relative bg-dark-bg text-gray-100 flex flex-col items-center justify-start px-4 md:px-8 lg:px-20 pb-20">
      {/*첫 메인 화면*/}
      <section id="home" className="h-[90dvh] w-full flex flex-col items-center justify-center">
        <div className="animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-1 text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-bold"></div>
      </section>

      {/*nav바 */}
      <nav className="sticky top-10 z-50 flex justify-center items-center gap-2 bg-nav-bg px-2 py-2 rounded-full backdrop-blur-md shadow-lg mb-16">
        {sectionIds.map((id) => (
          <button
            key={id}
            className={`font-bold transition-all rounded-full px-3 py-1.5 md:px-4 md:py-2 text-[0.7rem] sm:text-sm md:text-base ${activeSection === id ? "bg-dark-bg text-blue-400" : "hover:bg-gray-700/50 text-gray-200"}`}
            onClick={() => {
              document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
            }}>
            {id[0].toUpperCase() + id.slice(1)}
          </button>
        ))}
      </nav>

      {/* about me */}
      <section id="about" className="w-full max-w-4xl flex flex-col gap-10 mb-24">
        <h2 className="text-2xl font-bold relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-16 after:h-1 after:bg-blue-500 after:rounded">About Me</h2>
        {aboutMe.map((about) => (
          <div key={about.title} className="bg-card-bg rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-1 flex flex-col gap-4">
            <h3 className="text-xl font-bold text-blue-400">{about.title}</h3>
            <p className="text-base text-gray-300 break-keep leading-relaxed">{about.content}</p>
          </div>
        ))}
      </section>

      {/* skill & tools */}
      <section id="skills" className="w-full max-w-4xl flex flex-col gap-12 mb-24">
        <h2 className="text-2xl font-bold relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-16 after:h-1 after:bg-blue-500 after:rounded">Skills</h2>
        {Object.entries(skills).map(([category, skillList]) => (
          <div key={category} className="flex flex-col gap-6">
            <h3 className="text-xl font-bold text-blue-400">{category}</h3>
            <div className="flex flex-wrap gap-6 md:gap-8">
              {skillList.map((skill: Skill) => (
                <div key={skill.name} className="flex flex-col items-center gap-3 transition-transform duration-200 hover:-translate-y-1">
                  <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center  rounded-lg p-3">
                    <img src={skill.img} alt={skill.name} className="w-full h-full" />
                  </div>
                  <span className="text-sm md:text-base text-gray-300">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* projects */}
      <section id="projects" className="w-full h-full max-w-4xl flex flex-col gap-10 mb-24">
        <h2 className="h-full text-2xl font-bold relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-16 after:h-1 after:bg-blue-500 after:rounded">Projects</h2>
        {projects.map((project) => (
          <div key={project.title} className="h-full bg-card-bg rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 grid grid-cols-2 gap-6">
            <div className="col-span-2 flex flex-col gap-2">
              <div className="flex gap-2 justify-start items-center hover:">
                <h3 className="text-xl font-bold mr-3">{project.title}</h3>
                {/* 깃링크 아이콘 */}
                <a href={project.github} target="_black" rel="noopener noreferrer">
                  <i className="xi-github xi-x cursor-pointer transition-all hover:text-blue-400"></i>
                </a>

                {/* 프로젝트 배포 링크 단, 운영시에만 보임 */}
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <i className="xi-external-link xi-x cursor-pointer transition-all hover:text-blue-400"></i>
                  </a>
                )}
              </div>
              {!project.link && <p className="text-sm text-red-400">※ 현재는 운영하지 않는 사이트입니다.</p>}
            </div>

            <div className="h-full col-start-1 col-end-3 flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-700">
              {/* {Array.from({ length: project.img }, (_, index) => (
                <img key={index} src={`/project-img/${project.imgUrl}/${index + 1}.webp`} alt={`${project.title} ${index + 1}`} className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-lg transition-transform duration-200 hover:scale-105 shadow-md" />
                ))} */}
              <ProjectImage project={project}></ProjectImage>
            </div>
            <p className="col-span-2 text-base text-gray-300 break-keep leading-relaxed">{project.content}</p>

            <div className="mt-2 col-span-2">
              <h4 className="text-lg font-semibold text-gray-200 mb-4">Skills</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(project.skills).map(([category, skillList]) => (
                  <div key={category} className="flex flex-col gap-3">
                    <h5 className="text-base font-bold text-blue-400">{category}</h5>
                    <div className="flex flex-wrap gap-4">
                      {skillList.map((skill: Skill) => (
                        <div key={skill.name} className="flex flex-col items-center gap-1">
                          <div className="w-10 h-10 flex items-center justify-center bg-gray-800/70 rounded-md p-1.5">
                            <img src={skill.img} alt={skill.name} className="rounded-lg w-full h-full" />
                          </div>
                          <span className="text-xs text-gray-300">{skill.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* 프로젝트 상세보기 버튼 모달로 출력 */}
            <div className="col-start-1 col-end-3 flex justify-center items-center">
              <button onClick={() => openProjectModal(project)} className="bg-blue-400 w-full h-full py-2 rounded-lg text-white font-semibold">
                상세보기
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Project Detail Modal */}
      <Modal isOpen={!!selectedProject} onClose={closeProjectModal}>
        {selectedProject && (
          <div className="bg-card-bg rounded-xl p-8 max-w-4xl w-[90vw] max-h-[90vh] overflow-y-auto">
            <div className="flex flex-col gap-6 relative">
              <button onClick={closeProjectModal} className="absolute -top-2 -right-2 text-gray-300 hover:text-white transition-colors duration-200 bg-gray-700 hover:bg-gray-600 rounded-full p-2">
                <i className="xi-close xi-x"></i>
              </button>

              <div className="flex justify-start items-center gap-4 border-b border-gray-700 pb-4">
                <h2 className="text-2xl font-bold text-blue-400">{selectedProject.title}</h2>
                <div className="flex items-center gap-3">
                  {selectedProject.link && (
                    <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400">
                      <i className="xi-external-link xi-x"></i>
                    </a>
                  )}
                  <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400">
                    <i className="xi-github xi-x"></i>
                  </a>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <i className="xi-time-o text-blue-400"></i>
                  <span className="text-gray-300">{selectedProject.period}</span>
                </div>
                <div className="flex items-center gap-3">
                  <i className="xi-user-o text-blue-400"></i>
                  <span className="text-gray-300">{selectedProject.team}</span>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-4">
                <p className="text-gray-300 leading-relaxed">{selectedProject.content}</p>
              </div>

              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold text-blue-400">프로젝트 상세</h3>
                {Array.isArray(selectedProject.detailContent) &&
                  selectedProject.detailContent.map((detail: any, index: number) => (
                    <div key={index} className="bg-gray-800 rounded-lg p-4">
                      <h4 className="text-lg font-bold text-gray-200 mb-3">{detail.title}</h4>
                      <ul className="list-disc list-inside text-gray-300">
                        {detail.content.map((item: string, itemIndex: number) => (
                          <li key={itemIndex} className="mb-1">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
              </div>

              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold text-blue-400">사용 기술</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(selectedProject.skills).map(([category, skillList]) => (
                    <div key={category} className="bg-gray-800 rounded-lg p-4">
                      <h4 className="text-lg font-bold text-blue-400 mb-3">{category}</h4>
                      <div className="flex flex-wrap gap-3">
                        {skillList.map((skill: Skill) => (
                          <div key={skill.name} className="flex flex-col items-center gap-2">
                            <div className="w-10 h-10 bg-gray-700 rounded-md p-2 flex items-center justify-center">
                              <img src={skill.img} alt={skill.name} className="w-full h-full" />
                            </div>
                            <span className="text-xs text-gray-300">{skill.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
      {/* contact */}
      <section id="contact" className="w-full max-w-4xl flex flex-col gap-8 mb-16">
        <h2 className="text-2xl font-bold relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-16 after:h-1 after:bg-blue-500 after:rounded">Contact</h2>
        <div className="bg-card-bg rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col gap-4">
          {/* Add your contact information here */}
          <p className="text-gray-300">연락처 정보를 추가할 수 있습니다.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full max-w-4xl text-center text-gray-400 text-sm py-8">
        <p>© 2025 신대철. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
