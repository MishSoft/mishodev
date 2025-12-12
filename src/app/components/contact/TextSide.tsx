import React from 'react';
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

export default function TextSide() {
  return (
    <div className="flex flex-col items-start gap-12 max-w-md">

      {/* Header */}
      <div className="flex flex-col gap-3">
        <h1 className="text-4xl font-bold text-gray-200 tracking-tight">
          Let's work together
        </h1>
        <p className="text-gray-400 text-sm leading-relaxed">
          Have a project in mind? Looking to hire a developer? Or just want to say hi? Feel free to drop me a message.
        </p>
      </div>

      {/* Contact info */}
      <div className="flex flex-col gap-4 w-full">

        {/* Email card */}
        <div className="flex items-center gap-4 bg-gray-800/70 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
          <div className="p-2 bg-blue-500 rounded-full text-white text-lg flex items-center justify-center">
            <MdEmail />
          </div>
          <h2 className="text-sm font-medium text-gray-100">mishiko.business@gmail.com</h2>
        </div>

        {/* Location card */}
        <div className="flex items-center gap-4 bg-gray-800/70 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
          <div className="p-2 bg-blue-500 rounded-full text-white text-lg flex items-center justify-center">
            <FaLocationDot />
          </div>
          <h2 className="text-sm font-medium text-gray-100">Georgia, Tbilisi</h2>
        </div>

      </div>

    </div>
  );
}
