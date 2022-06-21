import { useEffect, useState } from "react";
import { getCategoryOfGames } from "../Api/gamesEndpoints";
import { Navbar } from "../Components/Navbar";
import { AsideMain, ContainerLayout } from "./layout.styled";

export const LayoutPage = ({ children }) => {
  const [categorys, setCategorys] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const listCategorys = await getCategoryOfGames();
        setCategorys(listCategorys);
      } catch (error) {}
    })();
  }, []);

  return (
    <div>
      <Navbar />
      <ContainerLayout>
        <AsideMain>
          <div>
            <h1>Genres</h1>
            <ul>
              {categorys.length > 0 &&
                categorys.map((category, idx) => <li key={idx}>{category}</li>)}
            </ul>
          </div>
        </AsideMain>
        <div>{children}</div>
      </ContainerLayout>
    </div>
  );
};
