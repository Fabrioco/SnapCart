"use client";
import React from "react";
import { motion, useInView } from "framer-motion";
export function AboutUsSection() {
  const aboutTitleRef = React.useRef<HTMLDivElement>(null);
  const aboutTitleInView = useInView(aboutTitleRef, {
    amount: 0.2,
  });

  const aboutParagraphOne = React.useRef<HTMLDivElement>(null);
  const aboutParagraphOneInView = useInView(aboutParagraphOne, {
    amount: 0.2,
  });
  const aboutParagraphTwo = React.useRef<HTMLDivElement>(null);
  const aboutParagraphTwoInView = useInView(aboutParagraphTwo, {
    amount: 0.2,
  });

  return (
    <section className="flex flex-col gap-2 p-4 w-full mt-5 md:mt-40">
      <motion.h2
        className="text-3xl font-semibold text-orange-500"
        ref={aboutTitleRef}
        initial={{ x: -100, opacity: 0 }}
        animate={
          aboutTitleInView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }
        }
        transition={{ duration: 0.5 }}
      >
        Sobre Nós
      </motion.h2>
      <motion.p
        ref={aboutParagraphOne}
        className="text-lg text-gray-500"
        initial={{ x: -100, opacity: 0 }}
        animate={
          aboutParagraphOneInView
            ? { x: 0, opacity: 1 }
            : { x: -100, opacity: 0 }
        }
        transition={{ duration: 0.5 }}
      >
        A loja SnapCart é uma empresa familiar que nasceu em 2010 em uma pequena
        cidade do interior de São Paulo. Começou como uma pequena loja de
        conveniência que vendia produtos de limpeza e higiene pessoal. Com o
        passar do tempo, o pai e a mãe, os fundadores, perceberam que havia uma
        grande demanda por produtos de qualidade em sua região e decidiram
        ampliar o tipo de produtos que vendiam. Anos se passaram e a loja se
        tornou uma loja de departamento, onde os clientes podiam encontrar
        produtos de qualidade em uma grade variedade de categorias.
      </motion.p>
      <motion.p
        className="text-lg text-gray-500"
        ref={aboutParagraphTwo}
        initial={{ x: -100, opacity: 0 }}
        animate={
          aboutParagraphTwoInView
            ? { x: 0, opacity: 1 }
            : { x: -100, opacity: 0 }
        }
        transition={{ duration: 0.5 }}
      >
        Em 2015, os filhos dos fundadores, que haviam crescido ajudando a
        gerenciar a loja, decidiram criar um site para vender os produtos
        online. Com isso, a loja SnapCart pode expandir seus negócios para todo
        o país, e hoje em dia, é uma das principais lojas online do Brasil.
      </motion.p>
    </section>
  );
}
