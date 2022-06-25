import { Navbar } from "../Components/Navbar";

export const LayoutPage = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};
