import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaMusic } from "react-icons/fa";
import { IoMusicalNotes } from "react-icons/io5";
import { songs } from "../constants/songs";
import { Container } from "./container";

export const Songs = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  // Start with empty srcs — iframes only load when the section comes into view
  const [iframeSrcs, setIframeSrcs] = useState<string[]>(songs.map(() => ""));
  const prevIndexRef = useRef(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const currentIndex = prevIndexRef.current;
        if (entry.isIntersecting) {
          // First load: give all iframes real srcs; current one gets autoplay
          setIframeSrcs(
            songs.map((song, i) =>
              i === currentIndex ? `${song.link}&autoplay=1` : song.link
            )
          );
        } else {
          // Reset current song src to stop playback when section leaves view
          setIframeSrcs((prev) => {
            const next = [...prev];
            next[currentIndex] = songs[currentIndex].link;
            return next;
          });
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      const newIndex = emblaApi.selectedScrollSnap();
      const prevIndex = prevIndexRef.current;

      setSelectedIndex(newIndex);
      setIframeSrcs((prev) => {
        const next = [...prev];
        next[prevIndex] = songs[prevIndex].link; // reset old → stops playback
        next[newIndex] = `${songs[newIndex].link}&autoplay=1`;
        return next;
      });

      prevIndexRef.current = newIndex;
    };

    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div ref={sectionRef}>
      <div
        className="relative w-full bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/images/songs-bg.png')" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(182,0,85,0.8), rgba(182,0,85,0.2), rgba(182,0,85,0))",
          }}
        />
        {/* Decorative layer */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
          {/* Large watermark number */}
          <span className="absolute -top-4 right-4 text-[160px] font-bold text-white/5 leading-none select-none">
            26
          </span>

          {/* Floating music notes */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-6 right-12"
          >
            <IoMusicalNotes className="text-white/20 text-5xl rotate-12" />
          </motion.div>

          <motion.div
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-16 right-36"
          >
            <FaMusic className="text-white/15 text-3xl -rotate-6" />
          </motion.div>

          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute bottom-10 right-20"
          >
            <IoMusicalNotes className="text-white/20 text-4xl rotate-6" />
          </motion.div>

          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-10 right-56"
          >
            <FaMusic className="text-white/10 text-2xl rotate-12" />
          </motion.div>
        </div>

        <Container className="relative z-20 py-12">
          <span className="inline-flex items-center px-3 py-1 rounded-sm bg-primary text-[#D8A300] text-xs uppercase font-medium tracking-widest mb-5">
            Curated with Love
          </span>
          <h2 className="text-5xl font-bold text-white leading-tight mb-4 max-w-sm">
            26 Songs That Make Me Think of You
          </h2>
          <p className="text-white/75 max-w-xs leading-relaxed">
            A melodic journey through our shared memories, one track for every
            beautiful year of your life.
          </p>
        </Container>
      </div>

      <div className="relative overflow-hidden">
        {/* Decorative layer */}
        <div className="absolute inset-0 pointer-events-none">
          <span className="absolute top-1/2 -translate-y-1/2 -right-10 text-[180px] font-bold text-primary/5 leading-none select-none">26</span>

          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute top-6 left-8">
            <IoMusicalNotes className="text-primary/15 text-4xl rotate-12" />
          </motion.div>
          <motion.div animate={{ y: [0, -7, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute bottom-8 left-20">
            <FaMusic className="text-primary/10 text-3xl -rotate-6" />
          </motion.div>
          <motion.div animate={{ y: [0, -9, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.8 }} className="absolute top-10 right-8">
            <FaMusic className="text-primary/10 text-2xl rotate-6" />
          </motion.div>
        </div>

      <Container className="flex flex-col items-center gap-6 py-10">
        {/* Add design here */}
        <div className="overflow-hidden w-full" ref={emblaRef}>
          <div className="flex">
            {songs.map((song, i) => (
              <div key={song.id} className="shrink-0 w-full">
                <iframe
                  src={iframeSrcs[i]}
                  width="100%"
                  height="352"
                  style={{ border: "none" }}
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  className="rounded-xl"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={scrollPrev}
            className="bg-white hover:bg-primary hover:text-white text-primary rounded-full p-3 shadow transition-colors cursor-pointer"
          >
            <FaArrowLeft className="text-lg" />
          </button>

          <span className="text-brown font-medium tabular-nums">
            {selectedIndex + 1} / {songs.length}
          </span>

          <button
            onClick={scrollNext}
            className="bg-white hover:bg-primary hover:text-white text-primary rounded-full p-3 shadow transition-colors cursor-pointer"
          >
            <FaArrowRight className="text-lg" />
          </button>
        </div>
      </Container>
      </div>
    </div>
  );
};
