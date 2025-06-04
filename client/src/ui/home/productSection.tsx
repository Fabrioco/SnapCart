"use client";
import { useInView, motion } from "framer-motion";
import React from "react";

export function ProductSection() {
  const productsTitleRef = React.useRef<HTMLDivElement>(null);
  const productsTitleInView = useInView(productsTitleRef, {
    amount: 0.2,
  });

  const productsParagraphRef = React.useRef<HTMLDivElement>(null);
  const productsParagraphInView = useInView(productsParagraphRef, {
    amount: 0.2,
  });

  return (
    <section className="flex flex-col gap-2 p-4 w-full mt-5 md:mt-40">
      <motion.h2
        className="text-3xl font-semibold text-orange-500"
        initial={{ x: -100, opacity: 0 }}
        animate={
          productsTitleInView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }
        }
        transition={{ duration: 0.5 }}
        ref={productsTitleRef}
      >
        Produtos
      </motion.h2>
      <motion.p
        ref={productsParagraphRef}
        className="text-lg text-gray-500"
        initial={{ x: -100, opacity: 0 }}
        animate={
          productsParagraphInView
            ? { x: 0, opacity: 1 }
            : { x: -100, opacity: 0 }
        }
        transition={{ duration: 0.5 }}
      >
        Nós oferecemos uma grande variedade de produtos em diferentes
        categorias, como:
      </motion.p>
      <motion.ul
        className="list-disc list-inside text-lg text-gray-500"
        initial={{ x: -100, opacity: 0 }}
        animate={
          productsParagraphInView
            ? { x: 0, opacity: 1 }
            : { x: -100, opacity: 0 }
        }
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <li>Produtos de limpeza e higiene pessoal</li>
        <li>Produtos de alimentação e bebida</li>
        <li>Produtos de beleza e cuidado pessoal</li>
        <li>Produtos de casa e decoração</li>
        <li>Produtos de esporte e lazer</li>
        <li>Produtos de informática e tecnologia</li>
      </motion.ul>
    </section>
  );
}
