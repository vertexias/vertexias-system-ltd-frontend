import { useScrollAnimation } from '../hooks/useScrollAnimation';
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNestjs,
  SiPhp,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiGit,
  SiDocker,
  SiVercel
} from "react-icons/si";

import { DiDotnet } from "react-icons/di"; 

import { VscAzure } from "react-icons/vsc";
import { FaAws } from "react-icons/fa";

const technologies = [
  { name: 'HTML5', icon: SiHtml5 },
  { name: 'CSS3', icon: SiCss3 },
  { name: 'JavaScript', icon: SiJavascript },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'React', icon: SiReact },
  { name: 'Next JS', icon: SiNextdotjs },
  { name: 'Nest JS', icon: SiNestjs },
  { name: '.NET', icon: DiDotnet },
  { name: 'PHP', icon: SiPhp },
  { name: 'PostgreSQL', icon: SiPostgresql },
  { name: 'MySQL', icon: SiMysql },
  { name: 'MongoDB', icon: SiMongodb },
  { name: 'Git', icon: SiGit },
  { name: 'Docker', icon: SiDocker },
  { name: 'AWS', icon: FaAws },
  { name: 'Azure', icon: VscAzure },
  { name: 'Vercel', icon: SiVercel },
];

export const TechnologiesSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="technologies" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Technology Stack</h2>
            <p className="text-muted-foreground">
              Modern technologies we use to build scalable solutions.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {technologies.map((tech) => {
              const Icon = tech.icon;
              return (
                <div
                  key={tech.name}
                  className="flex flex-col items-center justify-center p-6 rounded-xl bg-background border hover:shadow-lg transition"
                >
                  <Icon size={40} className="mb-3 text-primary" />
                  <span className="text-sm font-medium">{tech.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
