import { FaHeart } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi2";
import { Container } from "./container";

export const Footer = () => {
  return (
    <footer className="bg-neutral text-white">
      <div className="h-1 bg-linear-to-r from-primary via-primary-accent to-tertiary" />

      <Container className="flex flex-col items-center text-center py-14 gap-6">
        <div className="flex items-center gap-2 text-primary-accent">
          <FaHeart />
          <span className="font-semibold tracking-wide text-lg">My Picasso</span>
          <FaHeart />
        </div>

        <p className="font-serif text-2xl text-white/90 max-w-md leading-relaxed">
          "Every song, every memory, every word here — curated just for you."
        </p>

        <div className="flex items-center gap-3 text-white/40 text-sm">
          <span className="h-px w-12 bg-white/20" />
          <HiOutlineSparkles className="text-primary-accent" />
          <span>Happy 26th Birthday, Glory</span>
          <HiOutlineSparkles className="text-primary-accent" />
          <span className="h-px w-12 bg-white/20" />
        </div>

        <p className="text-white/30 text-xs tracking-widest uppercase">
          Made with love · 2026
        </p>
      </Container>
    </footer>
  );
};
