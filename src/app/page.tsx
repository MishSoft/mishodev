import Image from "next/image";
import Header from "./components/header/Header";
import Nav from "./components/header/Nav";
import Particles from "@/particles/Particles";
import Hero from "./components/Hero/Hero";

export default function Home() {
  return (
    <div className="bg-[#101621] w-full min-h-screen relative">
      {/* Particles */}
      <Particles />

      <Hero />
    </div>
  );
}
