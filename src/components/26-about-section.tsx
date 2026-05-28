import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi2";
import { useFireworks } from "../hooks/useFireworks";
import { Container } from "./container";
import { twentySixAboutContent } from "../constants/26-about";

export const TwentySixAbout = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useFireworks(ref);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % twentySixAboutContent.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const current = twentySixAboutContent[currentIndex];
  const number = String(current.id).padStart(2, "0");

  return (
    <div ref={ref} className="relative overflow-hidden bg-linear-to-br from-primary/10 via-[#fbf9f5] to-tertiary/10">

      {/* Decorative layer */}
      <div className="absolute inset-0 pointer-events-none">
        <span className="absolute top-1/2 -translate-y-1/2 -left-10 text-[200px] font-bold text-primary/5 leading-none select-none">26</span>

        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute top-6 right-8">
          <FaHeart className="text-primary/25 text-4xl" />
        </motion.div>
        <motion.div animate={{ y: [0, -7, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute top-16 right-24">
          <FaHeart className="text-primary-accent/15 text-2xl -rotate-12" />
        </motion.div>
        <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="absolute bottom-8 right-12">
          <HiOutlineSparkles className="text-tertiary/25 text-3xl rotate-6" />
        </motion.div>
        <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute bottom-12 left-8">
          <HiOutlineSparkles className="text-secondary/35 text-3xl" />
        </motion.div>
        <motion.div animate={{ y: [0, -9, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }} className="absolute top-8 left-16">
          <FaHeart className="text-primary/15 text-3xl rotate-6" />
        </motion.div>
      </div>

    <Container className="flex flex-col items-center justify-center gap-6 py-6 text-center">
      <p className="uppercase text-primary-accent font-medium">
        A celebration of you
      </p>
      <h3 className="text-4xl font-bold">26 Things I Love About You</h3>
      <div className="flex items-center w-full max-w-sm gap-3">
        <span className="flex-1 h-0.75 bg-linear-to-r from-transparent to-primary" />
        <FaHeart className="text-primary text-2xl shrink-0" />
        <span className="flex-1 h-0.75 bg-linear-to-l from-transparent to-primary" />
      </div>

      <div
        className="shadow-md border-t-6 cursor-pointer border-t-primary w-full max-w-100 bg-white rounded-sm select-none h-90 flex flex-col items-center overflow-hidden px-8"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
        
            key={currentIndex}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className="flex flex-col items-center justify-between w-full h-full py-8"
          >
            <h3 className="text-5xl text-primary-accent opacity-50">
              {number}
            </h3>
            <h4 className="text-2xl font-bold leading-snug text-brown">{current.item}</h4>
            <div className="h-12 aspect-square rounded-full bg-primary-accent/10 flex items-center justify-center">
              <img src="assets/images/book-icon.svg" alt="book" className="h-6" />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </Container>
    </div>
  );
};
