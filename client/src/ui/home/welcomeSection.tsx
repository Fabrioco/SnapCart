"use client";
import { useInView, motion } from "framer-motion";
import React from "react";

export function WelcomeSection() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const homeTitleRef = React.useRef<HTMLDivElement>(null);
  const homeTitleInView = useInView(homeTitleRef, {
    amount: 0.2,
  });

  const homeDescriptionRef = React.useRef<HTMLDivElement>(null);
  const homeDescriptionInView = useInView(homeDescriptionRef, {
    amount: 0.2,
  });

  const homeButtonRef = React.useRef<HTMLButtonElement>(null);
  const homeButtonInView = useInView(homeButtonRef, {
    amount: 0.2,
  });

  return (
    <section className="grid grid-cols-1 gap-4 p-10 md:p-20 md:grid-cols-2 w-full h-screen items-center justify-center mx-auto">
      <div>
        <motion.h1
          className="text-5xl text-orange-500 font-semibold"
          initial={{ x: -200, opacity: 0 }}
          animate={homeTitleInView ? { x: 0, opacity: 1 } : { x: -200 }}
          transition={{ duration: 0.5 }}
          ref={homeTitleRef}
        >
          Bem-vindo(a) ao SnapCart
        </motion.h1>
        <motion.p
          className="text-lg text-gray-500 mt-2"
          initial={{ x: -200, opacity: 0 }}
          animate={homeDescriptionInView ? { x: 0, opacity: 1 } : { x: -200 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          ref={homeDescriptionRef}
        >
          A loja online que revoluciona a forma como você compra!
        </motion.p>
      </div>
      <motion.button
        className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 md:self-end md:mx-auto md:w-fit"
        initial={isMobile ? { x: 200, opacity: 0 } : { x: -200, opacity: 0 }}
        animate={homeButtonInView ? { x: 0, opacity: 1 } : { x: 200 }}
        transition={{ duration: 0.5, delay: 1 }}
        ref={homeButtonRef}
      >
        Comece a comprar
      </motion.button>
    </section>
  );
}
