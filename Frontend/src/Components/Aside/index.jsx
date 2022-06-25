import { useEffect, useState } from "react";
import { getCategoryOfGames } from "../../Api/gamesEndpoints";
import {  Placeholder } from "react-bootstrap";
import { AsideMain } from "../../Layout/layout.styled";

export const AsideMainLayout = () => {
  const [categorys, setCategorys] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const listCategorys = await getCategoryOfGames();
      setCategorys(listCategorys);
      setLoading(false)
    })();
  }, []);
  return (
    <AsideMain>
      <div>
        <h1>Genres</h1>
        <ul>
          {!loading &&
            categorys.length > 0 &&
            categorys.map((category, idx) => <li key={idx}>{category}</li>)}
          {loading &&
           [...Array(10)].map((_, idx) => <li key={idx}> <Placeholder xs={6} /></li>)}
        </ul>
      </div>
    </AsideMain>
  );
};
