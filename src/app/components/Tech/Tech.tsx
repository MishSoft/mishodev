import React from 'react'
import { RiReactjsFill, RiNextjsFill, RiTailwindCssFill, RiSupabaseLine } from "react-icons/ri";
import { SiTypescript } from "react-icons/si";
import { BiLogoPostgresql } from "react-icons/bi";
import { FaGithub } from "react-icons/fa";
import { LuFigma } from "react-icons/lu";

const icons = [
  'RiReactjsFill',
  'RiNextjsFill',
  'RiTailwindCssFill',
  'SiTypescript',
  'RiSupabaseLine',
  'BiLogoPostgresql',
  'FaGithub',
  'LuFigma'
];

const iconComponents: { [key: string]: React.ComponentType } = {
  RiReactjsFill,
  RiNextjsFill,
  RiTailwindCssFill,
  SiTypescript,
  RiSupabaseLine,
  BiLogoPostgresql,
  FaGithub,
  LuFigma
};

export default function Tech() {
  return (
    <div className="px-10 py-16 flex flex-col w-full min-h-screen justify-center items-center">
      <h1 className="text-center text-4xl mb-12 text-gray-200 font-bold tracking-wide">
        Tech Stack & Tools
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 place-items-center w-full max-w-2xl">
        {icons.map((icon, index) => {
          const IconComponent = iconComponents[icon];
          return (
            <div
              key={index}
              className="p-4 rounded-2xl bg-gray-900/70 border border-gray-600 backdrop-blur-md w-20 h-20
                         flex items-center justify-center text-gray-200 text-4xl
                         transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-pink-500/20"
            >
              <IconComponent />
            </div>
          );
        })}
      </div>
    </div>
  );
}
