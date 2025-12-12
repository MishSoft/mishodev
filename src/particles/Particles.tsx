"use client";

import Particles from "react-tsparticles";
import { useCallback } from "react";
import { loadSlim } from "tsparticles-slim";

export default function StarParticles() {
  const particlesInit = useCallback(async (engine: any) => {
    await loadSlim(engine); // loadFull → loadSlim
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: "transparent",
        },
        particles: {
          number: {
            value: 120,
          },
          color: {
            value: "#ffffff",
          },
          size: {
            value: 2,
            random: true,
          },
          opacity: {
            value: 1,
            random: true,
            animation: {
              enable: true,
              speed: 1,
              minimumValue: 0.3,
            },
          },
          move: {
            enable: true,
            speed: 0.2,
            random: true,
          },
        },
      }}
      className="fixed inset-0 pointer-events-none"
    />
  );
}
