import { LayoutPage } from "../../Layout";
import { CarrouselMain } from "../../Components/CarrouselMain";
import { CardGame } from "../../Components/CardGame";
import { RowCarrousel } from "../../Components/RowCarrousel";
import { getCategoryOfGames, getGamesInitials } from "../../Api/gamesEndpoints";
import { useEffect, useState } from "react";
import { AsideMain } from "../../Layout/layout.styled";
import { ContentContainer, ContentHome } from "./home.styled";
export const HomePage = () => {
  const [categorys, setCategorys] = useState([]);
  const [listGames, setListGames] = useState({
    popularGames: [],
    newsGames: [],
    recommendedGames: [],
  });
  useEffect(() => {
    (async () => {
      const listCategorys = await getCategoryOfGames();
      setCategorys(listCategorys);
      const { popularGames, newsGames, recommendedGames } =
        await getGamesInitials();
      setListGames({ popularGames, newsGames, recommendedGames });
    })();
  }, []);

  return (
    <LayoutPage>
      <ContentContainer>
      <AsideMain>
        <div>
          <h1>Genres</h1>
          <ul>
            {categorys.length > 0 &&
              categorys.map((category, idx) => <li key={idx}>{category}</li>)}
          </ul>
        </div>
      </AsideMain>
      <ContentHome>
        <CarrouselMain />
        <RowCarrousel title="Recommended for you">
          {listGames?.recommendedGames?.map(
            ({
              title,
              genre,
              _id,
              developer,
              release_date,
              price,
              thumbnail,
            }) => (
              <CardGame
                thumbnail={thumbnail}
                key={_id}
                title={title}
                genre={genre}
                id={_id}
                developer={developer}
                release_date={release_date}
                price={price}
              />
            )
          )}
        </RowCarrousel>
        <RowCarrousel title="Popular games">
          {listGames?.popularGames?.map(
            ({
              title,
              genre,
              _id,
              developer,
              release_date,
              price,
              thumbnail,
            }) => (
              <CardGame
                thumbnail={thumbnail}
                key={_id}
                title={title}
                genre={genre}
                id={_id}
                developer={developer}
                release_date={release_date}
                price={price}
              />
            )
          )}
        </RowCarrousel>
        <RowCarrousel title="New games">
          {listGames?.newsGames?.map(
            ({
              title,
              genre,
              _id,
              developer,
              release_date,
              price,
              thumbnail,
            }) => (
              <CardGame
                thumbnail={thumbnail}
                key={_id}
                title={title}
                genre={genre}
                id={_id}
                newGame
                developer={developer}
                release_date={release_date}
                price={price}
              />
            )
          )}
        </RowCarrousel>
      </ContentHome>
      </ContentContainer>
     
    </LayoutPage>
  );
};
