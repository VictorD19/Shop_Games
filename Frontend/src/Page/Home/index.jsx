import { LayoutPage } from "../../Layout";
import { CarrouselMain } from "../../Components/CarrouselMain";
import { CardGame } from "../../Components/CardGame";
import { RowCarrousel } from "../../Components/RowCarrousel";
import { getGamesInitials } from "../../Api/gamesEndpoints";
import { useEffect, useState } from "react";
export const HomePage = () => {
  const [listGames, setListGames] = useState({
    popularGames: [],
    newsGames: [],
    recommendedGames: [],
  });
  useEffect(() => {
    (async () => {
      const { popularGames, newsGames, recommendedGames } =
        await getGamesInitials();
      setListGames({ popularGames, newsGames, recommendedGames });
    })();
  }, []);

  return (
    <LayoutPage>
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
    </LayoutPage>
  );
};
