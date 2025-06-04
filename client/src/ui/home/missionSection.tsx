"use client";
import { useInView, motion } from "framer-motion";
import React from "react";

export function MissionSection() {
  const missionTitleRef = React.useRef<HTMLDivElement>(null);
  const missionTitleInView = useInView(missionTitleRef, {
    amount: 0.2,
  });

  const missionParagraphOne = React.useRef<HTMLDivElement>(null);
  const missionParagraphOneInView = useInView(missionParagraphOne, {
    amount: 0.2,
  });
  const missionParagraphTwo = React.useRef<HTMLDivElement>(null);
  const missionParagraphTwoInView = useInView(missionParagraphTwo, {
    amount: 0.2,
  });


  return (
    <section className="flex flex-col gap-2 p-4 w-full mt-5 md:mt-40">
      <motion.h2
        className="text-3xl font-semibold text-orange-500"
        initial={{ x: -100, opacity: 0 }}
        animate={
          missionTitleInView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }
        }
        transition={{ duration: 0.5 }}
        ref={missionTitleRef}
      >
        Objetivos
      </motion.h2>
      <motion.p
        ref={missionParagraphOne}
        className="text-lg text-gray-500"
        initial={{ x: -100, opacity: 0 }}
        animate={
          missionParagraphOneInView
            ? { x: 0, opacity: 1 }
            : { x: -100, opacity: 0 }
        }
        transition={{ duration: 0.5 }}
      >
        Nossa missão é oferecer aos nossos clientes uma experiência de compra
        online de alta qualidade, com preços competitivos e uma variedade de
        produtos que atenda às necessidades de todos.
      </motion.p>
      <motion.p
        ref={missionParagraphTwo}
        className="text-lg text-gray-500"
        initial={{ x: -100, opacity: 0 }}
        animate={
          missionParagraphTwoInView
            ? { x: 0, opacity: 1 }
            : { x: -100, opacity: 0 }
        }
        transition={{ duration: 0.5 }}
      >
        Nossa visão é ser a principal loja online do Brasil, reconhecida pela
        qualidade dos nossos produtos e pelo excelente atendimento aos clientes.
      </motion.p>
    </section>
  );
}
