"use client";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

export default function CodeSide() {
  const [bioText, setBioText] = useState("");

  useEffect(() => {
    const bio = [
      {
        name: "Mishiko Aspanidze",
        location: "Georgia, Tbilisi",
        education: "BitCamp && Skill Will",
        hobbies: ["Swim", "Gaming", "Walk"],
        contact: {
          email: "mishikoaspanidze1999@gmail.com",
          github: "MishSoft",
        },
      },
    ];
    setBioText(JSON.stringify(bio, null, 2));
  }, []);

  return (
    <div className="w-full max-w-4xl h-112.5 mx-auto rounded-xl overflow-hidden shadow-lg bg-[#1e1e1e] border border-gray-700">
      <div className="h-10 bg-[#2a2d2e] border-b border-gray-700 flex items-center px-4 text-gray-300 text-sm">
        code-playground.js
      </div>

      <Editor
        height="100%"
        defaultLanguage="json"
        defaultValue={bioText}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: "on",
          readOnly: true,
        }}
      />
    </div>
  );
}
