import { AsideMainLayout } from "../../Components/Aside";
import { CardGame } from "../../Components/CardGame";
import { NewTitle } from "../../Components/Title";
import { useDataUser } from "../../Context/userContext";
import { LayoutPage } from "../../Layout";
import { ContentContainer, ContentHome } from "../Home/home.styled";
import { ContentGames } from "./games.styled";

export const MyGamesPage = () => {
    const {userState} = useDataUser()
    const {my_games} = userState
  return (
    <LayoutPage>
      <ContentContainer>
        <AsideMainLayout />
        <ContentHome>
         <NewTitle >My games</NewTitle>
            <ContentGames>
                {my_games?.map(
                ({
                  title,
                  genre,
                  id,
                  developer,
                  release_date,
                  price,
                  thumbnail,
                }) => (
                  <CardGame
                    thumbnail={thumbnail}
                    key={id}
                    title={title}
                    genre={genre}
                    id={id}
                    isUser
                    developer={developer}
                    release_date={release_date}
                    price={price}
                  />
                )
              )}
            </ContentGames>
        </ContentHome>
      </ContentContainer>
    </LayoutPage>
  );
};
