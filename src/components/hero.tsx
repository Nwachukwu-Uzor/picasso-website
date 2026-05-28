import { motion } from "framer-motion";
import { useRef } from "react";
import { FaHeart } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi2";
import { useFireworks } from "../hooks/useFireworks";
import { Container } from "./container";

export const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  useFireworks(ref);

  return (
    <div ref={ref} className="relative overflow-hidden bg-linear-to-br from-primary/10 via-[#fbf9f5] to-tertiary/10">

      {/* Decorative layer */}
      <div className="absolute inset-0 pointer-events-none">
        <span className="absolute -top-6 right-2 text-[180px] font-bold text-primary/5 leading-none select-none">26</span>

        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute top-8 left-8">
          <HiOutlineSparkles className="text-primary/30 text-4xl" />
        </motion.div>
        <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.2 }} className="absolute top-16 left-20">
          <HiOutlineSparkles className="text-tertiary/20 text-2xl" />
        </motion.div>
        <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="absolute bottom-10 left-12">
          <FaHeart className="text-primary/20 text-3xl" />
        </motion.div>
        <motion.div animate={{ y: [0, -7, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute bottom-14 right-10">
          <HiOutlineSparkles className="text-secondary/40 text-3xl" />
        </motion.div>
        <motion.div animate={{ y: [0, -9, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }} className="absolute top-10 right-16">
          <FaHeart className="text-primary-accent/15 text-2xl rotate-12" />
        </motion.div>
      </div>

    <Container className="flex flex-col items-center justify-center min-h-[50vh] lg:min-h-[80vh] py-10">
      <p className="relative overflow-hidden flex items-center justify-center uppercase px-6 text-sm animate-bounce gap-2 py-1.5 rounded-full bg-primary-accent text-white">
        <HiOutlineSparkles />
        Celebrating a milestone
        <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent animate-glow-sweep pointer-events-none" />
      </p>

      <h3 className="text-6xl my-6 font-bold capitalize text-center leading-16">
        Happy{" "}
        <span className="text-primary relative inline-block overflow-hidden">
          26th{" "}
          <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#785900]"></span>
          <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent animate-glow-sweep pointer-events-none" />
        </span>{" "}
        <br />
        Birthday, <br />
        My Love
      </h3>
      <p className="max-w-150 text-center text-brown">
        One year of knowing you, and somehow it already feels like there are so
        many memories worth holding onto. Wishing you a beautiful 26th birthday
        filled with the same warmth and joy you bring to others.
      </p>
    </Container>
    </div>
  );
};
