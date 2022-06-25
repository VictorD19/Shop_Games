import { LayoutPage } from "../../Layout";
import { CarrouselMain } from "../../Components/CarrouselMain";
import { CardGame } from "../../Components/CardGame";
import { RowCarrousel } from "../../Components/RowCarrousel";
import { getGamesInitials } from "../../Api/gamesEndpoints";
import { useEffect, useState } from "react";
import { ContentContainer, ContentHome } from "./home.styled";
import { AsideMainLayout } from "../../Components/Aside";
import { PlaceholderCardGame } from "../../Components/Placeholder";
export const HomePage = () => {
  const [loading, setLoading] = useState(true);
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
      setLoading(false);
    })();
  }, []);

  return (
    <LayoutPage>
      <ContentContainer>
        <AsideMainLayout />
        <ContentHome>
          <CarrouselMain />
          <RowCarrousel title="Recommended for you">
            {!loading &&
              listGames?.recommendedGames?.map(
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
            {loading &&
              [...Array(5)].map((_, index) => (
                <PlaceholderCardGame key={index} />
              ))}
          </RowCarrousel>
          <RowCarrousel title="Popular games">
            {!loading &&
              listGames?.popularGames?.map(
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
            {loading &&
              [...Array(5)].map((_, index) => (
                <PlaceholderCardGame key={index} />
              ))}
          </RowCarrousel>
          <RowCarrousel title="New games">
            {!loading &&
              listGames?.newsGames?.map(
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
            {loading &&
              [...Array(5)].map((_, index) => (
                <PlaceholderCardGame key={index} />
              ))}
          </RowCarrousel>
        </ContentHome>
      </ContentContainer>
    </LayoutPage>
  );
};
