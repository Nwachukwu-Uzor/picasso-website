import { motion } from "framer-motion";
import { TwentySixAbout } from "./components/26-about-section";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { Hero } from "./components/hero";
import { ImageShow } from "./components/image-show";
import { Songs } from "./components/songs";
import { useConfetti } from "./hooks/useConfetti";

const SectionReveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.08 }}
    transition={{ duration: 0.7, ease: "easeOut", delay }}
  >
    {children}
  </motion.div>
);

function App() {
  useConfetti(20000); // TODO: restore to 1 * 60 * 1000

  return (
    <>
      <Header />
      <SectionReveal>
        <Hero />
      </SectionReveal>
      <SectionReveal>
        <TwentySixAbout />
      </SectionReveal>
      <SectionReveal>
        <ImageShow />
      </SectionReveal>
      <SectionReveal>
        <Songs />
      </SectionReveal>
      <SectionReveal>
        <Footer />
      </SectionReveal>
    </>
  );
}

export default App;
