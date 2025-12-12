import React from 'react';
import WorkText from './WorkText';
import WorkItem from './WorkItem';

export default function Work() {
  return (
    <div id='work' className="px-2 flex flex-col items-start justify-center w-full  md:px-10 min-h-screen py-10 bg-gray-900/20 backdrop-blur-2xl relative">

      <WorkText />

      {/* Scroll container with gradient overlay */}
      <div className="relative w-full">
        <div className="sccr flex items-center overflow-x-auto gap-6 scroll-smooth scrollbar-thin scrollbar-thumb-pink-500/60 scrollbar-track-gray-700/20">
          <WorkItem />
          <WorkItem />
          <WorkItem />
          <WorkItem />
          <WorkItem />
        </div>

        {/* Left gradient */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-linear-to-r from-gray-900/80 to-transparent"></div>

        {/* Right gradient */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-linear-to-l from-gray-900/80 to-transparent"></div>
      </div>
    </div>
  );
}
