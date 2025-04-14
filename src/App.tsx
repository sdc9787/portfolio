import { useEffect, useState } from "react";
import ProjectImage from "./Component/ProjectImage";
import { Modal } from "./Component/Modal";
import { AlertText, useAlert } from "./hook/useAlert";

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
  projectOverview: {
    content: string;
    contentDetail: string[];
  }; //프로젝트 개요
  detailContent: {}; //상세 내용
  imgUrl: string; //이미지 경로
  img: number; //이미지 개수
  link: string | null; //링크
  github: string; //깃허브 링크
  skills: Skills; //기술 스택
  team: string; //팀원
  period: string; //개발 기간
}

interface AlertText {
  text: string; //alert text
  state: boolean; //alert state
}

function App() {
  const title_typing: string = "프론트엔드 개발자 신대철입니다";
  const sectionIds = ["home", "about", "skills", "projects"];
  const [activeSection, setActiveSection] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [alertText, setAlertText] = useState<AlertText>({
    text: "",
    state: false,
  });

  const alertBox = useAlert(setAlertText);

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
      title: "SEO 최적화",
      content: "웹 사이트를 운영하면서 SEO 최적화의 중요성을 깨달았습니다. SEO 최적화를 통해 구글 서치 콘솔기준 노출 약 232% 증가, 클릭 약 40% 증가, 검색 최상단에 노출되는 성과를 달성했습니다.",
    },
    {
      title: "커뮤니케이션 및 협업",
      content: "Github을 통한 코드 관리와 Jira를 활용한 이슈 트래킹으로 개발자 간 효율적인 협업 환경을 구축했습니다. Postman을 활용하여 REST API를 테스트하고 문서화함으로써 프론트엔드와 백엔드 간의 원활한 커뮤니케이션을 지원하여 프로젝트 진행 효율을 높였습니다.",
    },
  ];

  const skills: Skills = {
    Frontend: [
      { name: "HTML", img: "/portfolio/icon/HTML.svg" },
      { name: "CSS", img: "/portfolio/icon/CSS.svg" },
      { name: "TypeScript", img: "/portfolio/icon/TypeScript.svg" },
      { name: "React", img: "/portfolio/icon/React-Light.svg" },
      { name: "Next.js", img: "/portfolio/icon/NextJS-Light.svg" },
      { name: "Tailwind", img: "/portfolio/icon/TailwindCSS-Light.svg" },
    ],
    StateManagement: [
      { name: "Redux", img: "/portfolio/icon/Redux.svg" },
      { name: "Zustand", img: "/portfolio/icon/Zustand.svg" },
    ],
    Deployment: [
      { name: "AWS", img: "/portfolio/icon/AWS-Light.svg" },
      { name: "Cloudflare", img: "/portfolio/icon/Cloudflare-Light.svg" },
    ],
    Tools: [
      { name: "Git", img: "/portfolio/icon/Git.svg" },
      { name: "Jira", img: "/portfolio/icon/Jira.svg" },
      { name: "Postman", img: "/portfolio/icon/Postman.svg" },
    ],
  };

  const projects: Project[] = [
    {
      title: "반려동물 돌보미 플랫폼",
      content: "반려동물을 위한 돌보미 플랫폼으로, 산책 및 돌봄 매칭, 커뮤니티, 플레이스(지도)등의 서비스를 제공합니다.",
      projectOverview: {
        content: "저희 팀원은 1인 가구와 반려동물 양육 가구의 증가에 주목하여, 전문적인 반려동물 산책 대행 서비스인 Dog Walker에서 아이디어를 착안하였습니다.",
        contentDetail: ["산책 대행 및 돌봄 서비스 제공", "반려동물 동반 가능 장소 안내 기능 제공", "반려동물 관련 정보 공유 및 소통을 위한 커뮤니티 기능 제공"],
      },
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
          { name: "React", img: "/portfolio/icon/React-Light.svg" },
          { name: "TypeScript", img: "/portfolio/icon/TypeScript.svg" },
          { name: "Tailwind", img: "/portfolio/icon/TailwindCSS-Light.svg" },
          { name: "PWA", img: "/portfolio/icon/PWA.svg" },
        ],
        StateManagement: [{ name: "Redux", img: "/portfolio/icon/Redux.svg" }],
        Deployment: [
          { name: "AWS", img: "/portfolio/icon/AWS-Light.svg" },
          { name: "Cloudflare", img: "/portfolio/icon/Cloudflare-Light.svg" },
        ],
        Tools: [
          { name: "Git", img: "/portfolio/icon/Git.svg" },
          { name: "Postman", img: "/portfolio/icon/Postman.svg" },
        ],
      },
    },
    {
      title: "로스트아크 정보 제공 사이트",
      content: "실시간 게임 정보를 제공하는 사이트입니다. 게임 정보를 제공하는 API를 활용하여 사용자가 원하는 게임 정보를 쉽게 찾을 수 있도록 구현했습니다.",
      projectOverview: {
        content: "출시된지 오래된 게임이다보니 대부분의 추가기능을 가진 웹사이트들이 존재했습니다. 실제 유저들이 사이트에 접근하기 위해서는 기존 사이트들에 추가된 기능이 필요하다고 판단하여, 새로운 기능을 추가하거나 기존 사이트들에 없는 기능을 추가하기로 했습니다.",
        contentDetail: ["보석 검색 - [기존 사이트에는 없는 기능]", "영지 제작 - [영지 교환 비율 추가]", "생활 재료 판매 - [기본 사이트에는 없는 기능]", "경매 입찰 - [이득률 조정 기능 추가]"],
      },
      detailContent: [
        {
          title: "SEO 최적화",
          content: ["Helmet을 활용하여 페이지별 메타 태그 추가 및 SEO 최적화", "구글 및 네이버 검색 최적화를 통해 최상단 검색 결과 달성", "SEO 최적화를 통해 구글 서치 콘솔기준 노출 약 232% 증가, 클릭 약 40% 증가"],
        },
        {
          title: "반응형 디자인",
          content: ["모바일 및 데스크톱 등 다양한 화면 크기에 대응하는 반응형 디자인 구현", "Tailwind를 활용하여 유연한 레이아웃 구성"],
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
      period: "2024.10 ~ 2024.12",
      imgUrl: "moaloa",
      img: 6,
      link: "https://moaloa.org",
      github: "https://github.com/msw-Hub/moaloa",
      skills: {
        Frontend: [
          { name: "React", img: "/portfolio/icon/React-Light.svg" },
          { name: "TypeScript", img: "/portfolio/icon/TypeScript.svg" },
          { name: "Tailwind", img: "/portfolio/icon/TailwindCSS-Light.svg" },
        ],
        StateManagement: [{ name: "Redux", img: "/portfolio/icon/Redux.svg" }],
        Deployment: [
          { name: "AWS", img: "/portfolio/icon/AWS-Light.svg" },
          { name: "Cloudflare", img: "/portfolio/icon/Cloudflare-Light.svg" },
        ],
        Tools: [
          { name: "Git", img: "/portfolio/icon/Git.svg" },
          { name: "Jira", img: "/portfolio/icon/Jira.svg" },
          { name: "Postman", img: "/portfolio/icon/Postman.svg" },
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
    <div className="relative bg-dark-bg text-gray-100 flex flex-col items-center justify-start px-4 md:px-8 lg:px-20 gap-12 md:gap-16 lg:gap-20">
      {/*첫 메인 화면*/}
      <section id="home" className="h-[80dvh] w-full flex flex-col items-center justify-center">
        <div className="animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-1 text-xl sm:text-2xl md:text-4xl lg:text-5xl text-white font-bold"></div>
      </section>

      {/*nav바 */}
      <nav className="sticky top-6 sm:top-8 md:top-10 z-50 flex justify-center items-center gap-1 sm:gap-2 bg-nav-bg px-1 sm:px-2 md:px-3 py-1.5 sm:py-2 rounded-full backdrop-blur-md shadow-lg mb-10 sm:mb-12 md:mb-16">
        {sectionIds.map((id) => (
          <button
            key={id}
            className={`cursor-pointer font-bold transition-all rounded-full px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 text-[0.6rem] sm:text-xs md:text-sm lg:text-base ${activeSection === id ? "bg-dark-bg text-blue-400" : "hover:bg-gray-700/50 text-gray-200"}`}
            onClick={() => {
              document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
            }}>
            {id[0].toUpperCase() + id.slice(1)}
          </button>
        ))}
      </nav>

      {/* 오른쪽 하단 이메일, github 버튼 fixed */}
      <div className="fixed bottom-3 sm:bottom-4 md:bottom-5 right-3 sm:right-4 md:right-5 z-50 flex flex-col gap-2 items-center justify-center transition-all">
        {/* 이메일 주소 복사 */}
        <div className="relative flex items-center group/tooltip">
          <button onClick={() => alertBox("복사되었습니다.")} name="이메일 주소 복사" className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 shadow-lg flex items-center justify-center rounded-full transition-all hover:opacity-80 bg-white cursor-pointer">
            <i className="xi-mail xi-x text-dark-bg text-sm sm:text-base md:text-lg"></i>
          </button>
          <div className="fixed flex items-center justify-center overflow-hidden rounded px-2 py-1 translate-x-[-110%] invisible z-[10] after:absolute after:flex after:left-0 after:top-0 after:right-0 after:bottom-0 after:w-full after:h-full after:bg-[#232323] after:opacity-80 after:z-[-1] group-hover/tooltip:visible">
            <span className="text-[10px] sm:text-xs text-white">sfc9787@gmail.com</span>
          </div>
        </div>

        {/* 깃허브 링크 이동*/}
        <div className="relative flex items-center group/tooltip">
          <a href="https://github.com/sdc9787" target="_blank" rel="noopener noreferrer" className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 shadow-lg flex items-center justify-center rounded-full transition-all hover:opacity-80 bg-white">
            <i className="xi-github xi-x text-dark-bg text-sm sm:text-base md:text-lg"></i>
          </a>
          <div className="fixed flex items-center justify-center overflow-hidden rounded px-2 py-1 translate-x-[-110%] invisible z-[10] after:absolute after:flex after:left-0 after:top-0 after:right-0 after:bottom-0 after:w-full after:h-full after:bg-[#232323] after:opacity-80 after:z-[-1] group-hover/tooltip:visible">
            <span className="text-[10px] sm:text-xs text-white">github.com/sdc9787</span>
          </div>
        </div>
      </div>

      {/* about me */}
      <section id="about" className="w-full max-w-4xl flex flex-col gap-6 sm:gap-8 md:gap-10 mb-16 sm:mb-20 md:mb-24">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold relative pb-1 sm:pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-12 sm:after:w-14 md:after:w-16 after:h-1 after:bg-blue-500 after:rounded">About Me</h2>

        {/* Card container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {aboutMe.map((about) => (
            <div key={about.title} className="bg-card-bg rounded-xl p-4 sm:p-5 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col gap-3 sm:gap-4">
              <h3 className="text-lg sm:text-xl md:text-xl font-bold text-center">{about.title}</h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-300 break-keep leading-relaxed">{about.content}</p>
            </div>
          ))}
        </div>
      </section>

      {/* skill & tools */}
      <section id="skills" className="w-full max-w-4xl flex flex-col gap-8 sm:gap-10 md:gap-12 mb-16 sm:mb-20 md:mb-24">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold relative pb-1 sm:pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-12 sm:after:w-14 md:after:w-16 after:h-1 after:bg-blue-500 after:rounded">Skills</h2>
        {Object.entries(skills).map(([category, skillList]) => (
          <div key={category} className="flex flex-col gap-4 sm:gap-5 md:gap-6">
            <h3 className="text-lg sm:text-xl md:text-xl font-bold text-blue-400">{category}</h3>
            <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-8">
              {skillList.map((skill: Skill) => (
                <div key={skill.name} className="flex flex-col items-center gap-2 sm:gap-2.5 md:gap-3 transition-transform duration-200 hover:-translate-y-1">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 flex items-center justify-center rounded-lg p-2 sm:p-2.5 md:p-3">
                    <img src={skill.img} alt={skill.name} className="w-full h-full" />
                  </div>
                  <span className="text-xs sm:text-sm md:text-base text-gray-300">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* projects */}
      <section id="projects" className="w-full h-full max-w-4xl flex flex-col gap-6 sm:gap-8 md:gap-10 mb-16 sm:mb-20 md:mb-24">
        <h2 className="h-full text-xl sm:text-2xl md:text-3xl font-bold relative pb-1 sm:pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-12 sm:after:w-14 md:after:w-16 after:h-1 after:bg-blue-500 after:rounded">Projects</h2>
        {projects.map((project) => (
          <div key={project.title} className="h-full bg-card-bg rounded-xl p-3 sm:p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 grid grid-cols-2 gap-4 sm:gap-5 md:gap-6">
            <div className="col-span-2 flex flex-col gap-1 sm:gap-1.5 md:gap-2">
              <div className="flex gap-2 justify-start items-center">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mr-2 sm:mr-2.5 md:mr-3">{project.title}</h3>
                {/* 깃링크 아이콘 */}
                <a href={project.github} target="_black" rel="noopener noreferrer">
                  <i className="xi-github xi-x cursor-pointer transition-all hover:text-blue-400 text-sm sm:text-base md:text-lg"></i>
                </a>

                {/* 프로젝트 배포 링크 단, 운영시에만 보임 */}
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <i className="xi-external-link xi-x cursor-pointer transition-all hover:text-blue-400 text-sm sm:text-base md:text-lg"></i>
                  </a>
                )}
              </div>
              {!project.link && <p className="text-xs sm:text-sm text-red-400">※ 현재는 운영하지 않는 사이트입니다.</p>}
            </div>

            <div className="h-full col-start-1 col-end-3 flex gap-3 sm:gap-3.5 md:gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-700">
              <ProjectImage project={project}></ProjectImage>
            </div>
            <p className="col-span-2 text-xs sm:text-sm md:text-base text-gray-300 break-keep leading-relaxed">{project.content}</p>

            <div className="mt-1 sm:mt-1.5 md:mt-2 col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                {Object.entries(project.skills).map(([category, skillList]) => (
                  <div key={category} className="flex flex-col gap-2 sm:gap-2.5 md:gap-3">
                    <h5 className="text-sm sm:text-base md:text-lg font-bold">{category}</h5>
                    <div className="flex flex-wrap gap-3 sm:gap-3.5 md:gap-4">
                      {skillList.map((skill: Skill) => (
                        <div key={skill.name} className="flex flex-col items-center gap-0.5 sm:gap-0.75 md:gap-1">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-10 flex items-center justify-center bg-gray-800/70 p-1 sm:p-1.25 md:p-1.5">
                            <img src={skill.img} alt={skill.name} className="rounded-md h-full" />
                          </div>
                          <span className="text-[10px] sm:text-xs md:text-sm text-gray-300">{skill.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* 프로젝트 상세보기 버튼 모달로 출력 */}
            <div className="col-start-1 col-end-3 flex justify-center items-center mt-2 sm:mt-3 md:mt-4">
              <button onClick={() => openProjectModal(project)} className="cursor-pointer bg-blue-400 hover:bg-blue-500 transition-all w-full h-full py-1.5 sm:py-2 md:py-2.5 rounded-lg text-white font-semibold text-sm sm:text-base md:text-lg">
                상세보기
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Project Detail Modal */}
      <Modal isOpen={!!selectedProject} onClose={closeProjectModal}>
        {selectedProject && (
          <div className="bg-card-bg rounded-xl p-3 sm:p-4 md:p-6 lg:p-8 max-w-4xl w-[90vw] max-h-[90vh] overflow-y-auto">
            <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 relative">
              <button onClick={closeProjectModal} className="absolute -top-2 -right-2 text-gray-300 hover:text-white transition-colors duration-200 bg-gray-700 hover:bg-gray-600 rounded-full p-1.5 sm:p-2">
                <i className="xi-close xi-x text-sm sm:text-base md:text-lg"></i>
              </button>

              <div className="flex justify-start items-center gap-3 sm:gap-3.5 md:gap-4 border-b border-gray-700 pb-3 sm:pb-3.5 md:pb-4">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-400">{selectedProject.title}</h2>
                <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3">
                  {selectedProject.link && (
                    <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400">
                      <i className="xi-external-link xi-x text-sm sm:text-base md:text-lg"></i>
                    </a>
                  )}
                  <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400">
                    <i className="xi-github xi-x text-sm sm:text-base md:text-lg"></i>
                  </a>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:gap-3.5 md:gap-4">
                <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3">
                  <i className="xi-time-o text-blue-400 text-sm sm:text-base md:text-lg"></i>
                  <span className="text-xs sm:text-sm md:text-base text-gray-300">{selectedProject.period}</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3">
                  <i className="xi-user-o text-blue-400 text-sm sm:text-base md:text-lg"></i>
                  <span className="text-xs sm:text-sm md:text-base text-gray-300">{selectedProject.team}</span>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-3 sm:p-3.5 md:p-4">
                <p className="text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed">{selectedProject.content}</p>
              </div>

              <div className="flex flex-col gap-3 sm:gap-3.5 md:gap-4">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-blue-400">프로젝트 개요 및 기능</h3>
                <div className="bg-gray-800 rounded-lg p-3 sm:p-3.5 md:p-4">
                  <p className="text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed">{selectedProject.projectOverview.content}</p>
                  <ul className="list-disc list-inside text-gray-300 mt-1.5 sm:mt-2">
                    {selectedProject.projectOverview.contentDetail.map((item: string, index: number) => (
                      <li key={index} className="mb-0.5 sm:mb-0.75 md:mb-1 text-xs sm:text-sm md:text-base">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:gap-3.5 md:gap-4">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-blue-400">프로젝트 상세</h3>
                {Array.isArray(selectedProject.detailContent) &&
                  selectedProject.detailContent.map((detail: any, index: number) => (
                    <div key={index} className="bg-gray-800 rounded-lg p-3 sm:p-3.5 md:p-4">
                      <h4 className="text-sm sm:text-base md:text-lg font-bold text-gray-200 mb-2 sm:mb-2.5 md:mb-3">{detail.title}</h4>
                      <ul className="list-disc list-inside text-gray-300">
                        {detail.content.map((item: string, itemIndex: number) => (
                          <li key={itemIndex} className="mb-0.5 sm:mb-0.75 md:mb-1 text-xs sm:text-sm md:text-base">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
              </div>

              <div className="flex flex-col gap-3 sm:gap-3.5 md:gap-4">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-blue-400">사용 기술</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-3.5 md:gap-4">
                  {Object.entries(selectedProject.skills).map(([category, skillList]) => (
                    <div key={category} className="bg-gray-800 rounded-lg p-3 sm:p-3.5 md:p-4">
                      <h4 className="text-sm sm:text-base md:text-lg font-bold text-blue-400 mb-2 sm:mb-2.5 md:mb-3">{category}</h4>
                      <div className="flex flex-wrap gap-2 sm:gap-2.5 md:gap-3">
                        {skillList.map((skill: Skill) => (
                          <div key={skill.name} className="flex flex-col items-center gap-1 sm:gap-1.5 md:gap-2">
                            <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-gray-700 rounded-md p-1.5 sm:p-1.75 md:p-2 flex items-center justify-center">
                              <img src={skill.img} alt={skill.name} className="rounded-md" />
                            </div>
                            <span className="text-[10px] sm:text-xs text-gray-300">{skill.name}</span>
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

      <AlertText text={alertText.text} state={alertText.state} />
      {/* Footer */}
      <footer className="w-full max-w-4xl text-center text-gray-400 text-xs sm:text-sm py-6 sm:py-7 md:py-8">
        <p>© 2025. Shin Dae Cheol. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
