import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchGames } from "../../Api/gamesEndpoints";
import { AsideMainLayout } from "../../Components/Aside";
import { CardGame } from "../../Components/CardGame";
import { PaginationMain } from "../../Components/Pagination";
import { PlaceholderCardGame } from "../../Components/Placeholder";
import { LayoutPage } from "../../Layout";
import { ContentContainer, ContentHome } from "../Home/home.styled";
import { AlignPagination, ContentGames, TitlePage } from "./games.styled";

export const Games = () => {
  const { param } = useParams();
  const [loading, setLoading] = useState(true);
  const [games, setListGames] = useState({
    results: [],
    pagination: {
      count: 0,
      currentPage: 1,
      nextPage: null,
      prevPage: null,
      totalPages: null,
    },
  });
  useEffect(() => {
    setLoading(true);

    if (param) {
      (async () => {
        try {
          const listGames = await searchGames(param);
          if (listGames.error) throw new Error(listGames.error);
          setListGames(listGames);
          setLoading(false);
        } catch (error) {}
      })();
    }
  }, [param]);

  const handleNextPage = async (page) => {
    if (!page) return;
    setLoading(true);
    try {
      const resultsGames = await searchGames(param, page);
      if (resultsGames.error) throw new Error(resultsGames.error);
      window.scrollTo(0, 0);
      setListGames(resultsGames);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <LayoutPage>
      <ContentContainer>
        <AsideMainLayout />
        <ContentHome>
          {param && (
            <TitlePage>
              {loading
                ? "Looking for games..."
                : `Result for ${param}: ${games?.pagination?.count}`}
            </TitlePage>
          )}
          <ContentGames>
            {!loading &&
              games.results?.map(
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
              [...Array(10)].map((_, index) => <PlaceholderCardGame />)}
            {!games.results.length && !loading && (
              <h1>No matches found with the word {param}</h1>
            )}
          </ContentGames>
          <AlignPagination>
            <PaginationMain
              currentPage={games?.pagination?.currentPage}
              pages={games?.pagination?.totalPages}
              next={games?.pagination?.nextPage}
              prev={games?.pagination?.prevPage}
              toPage={handleNextPage}
            />
          </AlignPagination>
        </ContentHome>
      </ContentContainer>
    </LayoutPage>
  );
};
