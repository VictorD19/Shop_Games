import { Navbar } from "../Components/Navbar";

export const LayoutPage = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div>{children}</div>
    </div>
  );
};
