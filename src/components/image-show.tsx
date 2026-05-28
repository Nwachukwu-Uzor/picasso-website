import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaHeart } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi2";
import { Container } from "./container";
import { gloryImages } from "../constants/images";

const DotLine = () => (
  <div className="flex flex-col items-center h-[70vh]">
    <div className="w-3 h-3 rounded-full border-2 border-primary shrink-0" />
    <div className="w-px flex-1 bg-primary/50" />
    <div className="w-3 h-3 rounded-full border-2 border-primary shrink-0" />
    <div className="w-px flex-1 bg-primary/50" />
    <div className="w-3 h-3 rounded-full border-2 border-primary shrink-0" />
    <div className="w-px flex-1 bg-primary/50" />
    <div className="w-3 h-3 rounded-full border-2 border-primary shrink-0" />
    <div className="w-px flex-1 bg-primary/50" />
    <div className="w-3 h-3 rounded-full border-2 border-primary shrink-0" />
  </div>
);

export const ImageShow = () => {
  const plugins = useMemo(
    () => [Autoplay({ delay: 3500, stopOnInteraction: false })],
    []
  );
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, plugins);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  type AutoplayPlugin = ReturnType<typeof Autoplay>;
  const pause = useCallback(() => {
    (emblaApi?.plugins()?.autoplay as AutoplayPlugin | undefined)?.stop();
  }, [emblaApi]);
  const resume = useCallback(() => {
    (emblaApi?.plugins()?.autoplay as AutoplayPlugin | undefined)?.play();
  }, [emblaApi]);

  const dotLeft = selectedIndex % 2 === 0;

  return (
    <div className="relative overflow-hidden bg-[#FFEFD4]">

      {/* Decorative layer */}
      <div className="absolute inset-0 pointer-events-none">
        <FaHeart className="absolute -bottom-8 -right-8 text-[200px] text-primary/5" />

        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute top-8 left-8">
          <FaHeart className="text-primary/25 text-4xl" />
        </motion.div>
        <motion.div animate={{ y: [0, -7, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.2 }} className="absolute top-16 left-24">
          <HiOutlineSparkles className="text-secondary/40 text-3xl" />
        </motion.div>
        <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="absolute top-6 right-10">
          <HiOutlineSparkles className="text-primary-accent/20 text-4xl rotate-12" />
        </motion.div>
        <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute top-20 right-28">
          <FaHeart className="text-primary/15 text-2xl -rotate-12" />
        </motion.div>
        <motion.div animate={{ y: [0, -9, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }} className="absolute bottom-10 left-12">
          <HiOutlineSparkles className="text-tertiary/20 text-3xl" />
        </motion.div>
      </div>

      <Container className="flex flex-col items-center justify-center gap-6 py-6 text-center">
        <h2 className="uppercase font-medium text-4xl">Favorite Snaps</h2>
        <p className="text-2xl font-medium text-brown">
          These are some of my favorite pictures of my absolutely stunning baby
        </p>
        <div className="flex items-center w-full max-w-sm gap-3">
          <span className="flex-1 h-0.75 bg-linear-to-r from-transparent to-primary" />
          <FaHeart className="text-primary text-2xl shrink-0" />
          <span className="flex-1 h-0.75 bg-linear-to-l from-transparent to-primary" />
        </div>

        <div className="flex flex-col items-center gap-4">
          {/* carousel + dot line */}
          <div className="relative flex items-center justify-center w-full">
            <div className="relative">
              {[
                { cls: "-top-3 -left-3", delay: 0,   size: "text-xl",  color: "text-primary" },
                { cls: "-top-4 left-8",  delay: 0.7, size: "text-sm",  color: "text-secondary" },
                { cls: "-top-3 -right-3",delay: 1.4, size: "text-xl",  color: "text-primary" },
                { cls: "top-8 -right-4", delay: 0.4, size: "text-sm",  color: "text-primary-accent" },
                { cls: "-bottom-3 -right-3", delay: 1.1, size: "text-xl", color: "text-secondary" },
                { cls: "-bottom-3 -left-3",  delay: 0.9, size: "text-xl", color: "text-primary" },
                { cls: "bottom-8 -left-4",   delay: 1.7, size: "text-sm", color: "text-primary-accent" },
                { cls: "top-1/2 -left-4",    delay: 0.3, size: "text-sm", color: "text-secondary" },
                { cls: "top-1/2 -right-4",   delay: 1.9, size: "text-sm", color: "text-primary" },
              ].map(({ cls, delay, size, color }, i) => (
                <motion.div
                  key={i}
                  className={`absolute pointer-events-none ${cls}`}
                  animate={{ scale: [0, 1.2, 0], opacity: [0, 1, 0], rotate: [0, 20, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay }}
                >
                  <HiOutlineSparkles className={`${size} ${color}`} />
                </motion.div>
              ))}

              <div
                className="overflow-hidden h-[70vh] w-[52.5vh] rounded-md"
                ref={emblaRef}
                onMouseEnter={pause}
                onMouseLeave={resume}
              >
                <div className="flex h-full">
                  {gloryImages.map((img) => (
                    <div key={img.id} className="relative overflow-hidden shrink-0 w-[52.5vh] h-full">
                      <img
                        src={img.path}
                        className="h-full w-full border-10 border-white rounded-md object-contain bg-white cursor-pointer"
                      />
                      <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent animate-glow-sweep pointer-events-none" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={`absolute top-0 ${dotLeft ? "right-[calc(50%+26.25vh+1rem)]" : "left-[calc(50%+26.25vh+1rem)]"}`}>
              <DotLine />
            </div>
          </div>

          {/* controls below */}
          <div className="flex items-center gap-6">
            <button
              onClick={scrollPrev}
              className="bg-white hover:bg-primary hover:text-white text-primary rounded-full p-3 shadow transition-colors cursor-pointer"
            >
              <FaArrowLeft className="text-lg" />
            </button>
            <button
              onClick={scrollNext}
              className="bg-white hover:bg-primary hover:text-white text-primary rounded-full p-3 shadow transition-colors cursor-pointer"
            >
              <FaArrowRight className="text-lg" />
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};
