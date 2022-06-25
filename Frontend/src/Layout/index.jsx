import { Navbar } from "../Components/Navbar";
import { ContainerLayout } from "./layout.styled";

export const LayoutPage = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};
