import { FaHeart } from "react-icons/fa";
import { Container } from "./container";
import { IoMdMenu } from "react-icons/io";

export const Header = () => {
  return (
    <header className="shadow-sm">
      <Container className="min-h-16 flex items-center justify-between text-primary text-bold">
        <div className="flex items-center gap-2">
          <FaHeart />
          <h3>My Picasso</h3>
        </div>
        <IoMdMenu />
      </Container>
    </header>
  );
};
