import { TwentySixAbout } from "./components/26-about-section";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { Hero } from "./components/hero";
import { ImageShow } from "./components/image-show";
import { Songs } from "./components/songs";
import { useConfetti } from "./hooks/useConfetti";

function App() {
  useConfetti(20000); // TODO: restore to 1 * 60 * 1000

  return (
    <>
      <Header />
      <Hero />
      <TwentySixAbout />
      <ImageShow />
      <Songs />
      <Footer />
    </>
  );
}

export default App;
