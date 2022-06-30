import { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { MdMemory, MdDesktopWindows, MdStorage } from "react-icons/md";
import { FaMemory } from "react-icons/fa";
import { ImWindows } from "react-icons/im";
import { getDetailsGame, getSimilarGames } from "../../Api/gamesEndpoints";
import { AsideMainLayout } from "../../Components/Aside";
import { NewTitle } from "../../Components/Title";
import { LayoutPage } from "../../Layout";
import { ContentContainer } from "../Home/home.styled";
import {
  Content,
  ContentDescription,
  ContentPrice,
  ContentRequirements,
} from "./gameDetails.styled";
import { NewButton } from "../../Components/Button";
import { RowCarrousel } from "../../Components/RowCarrousel";
import { CardGame } from "../../Components/CardGame";
import { LoadingAnimated } from "../../Components/Loading";

const initialGameData = {
  id: "",
  title: "",
  thumbnail: "",
  status: "",
  short_description: "",
  genre: "",
  platform: "",
  publisher: "",
  developer: "",
  release_date: "",
  description: [],
  profile_url: "",
  minimum_system_requirements: {
    os: null,
    processor: null,
    memory: null,
    graphics: null,
    storage: null,
  },
  screenshots: [],
  GameId: "",
  listSimilarGames: [],
};

export const GameDetailsPage = () => {
  const { gameId } = useParams();
  const [game, setGame] = useState(initialGameData);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const gameDetails = await getDetailsGame(gameId);

        if (gameDetails.error) throw new Error(gameDetails.error);

        let parser = new DOMParser();
        let parsedHtml = parser.parseFromString(
          gameDetails?.description,
          "text/html"
        );
        const obgP = parsedHtml.getElementsByTagName("p");
        const partsDescriptions = Object.keys(obgP).map(
          (keys) => obgP[keys].innerText
        );
        gameDetails.description = partsDescriptions;

        const listSimilarGames = await getSimilarGames(gameDetails.genre);
        if (!listSimilarGames.error)
          gameDetails.listSimilarGames = listSimilarGames;
        if (listSimilarGames.error) gameDetails.listSimilarGames = [];
        setGame(gameDetails);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        navigate("/");
      }
    })();
  }, [gameId]);
  return (
    <LayoutPage>
      <ContentContainer>
        <AsideMainLayout />
        <Content>
          {!loading && (
            <>
              <NewTitle>{game?.title}</NewTitle>

              <div className="mainPhotos">
                {game?.thumbnail && (
                  <Carousel fade>
                    <Carousel.Item>
                      <img
                        className=" "
                        src={game?.thumbnail}
                        alt="First slide"
                      />
                    </Carousel.Item>
                    {game?.screenshots &&
                      game?.screenshots.map(({ id, image }) => (
                        <Carousel.Item key={id}>
                          <img className="" src={image} alt="Second slide" />
                        </Carousel.Item>
                      ))}
                  </Carousel>
                )}
                <div className="descriptionGame">
                  <NewTitle>Game details</NewTitle>

                  <ul>
                    <li>
                      <span>Status:</span> {game?.status}
                    </li>
                    <li>
                      <span>Genre: </span> {game?.genre}
                    </li>
                    <li>
                      <span>Platform: </span> {game?.platform}
                    </li>
                    <li>
                      <span>Developer: </span>
                      {game?.developer}
                    </li>
                    <li>
                      <span>Publisher: </span>
                      {game?.publisher}
                    </li>
                    <li>
                      <span>Release date:</span> {game?.release_date}
                    </li>
                  </ul>
                  <ContentPrice>
                    <h3>$ {game?.price}</h3>
                    <NewButton>ADD CART</NewButton>
                  </ContentPrice>
                </div>
              </div>
              <ContentDescription>
                <NewTitle>Game Description</NewTitle>
                {game?.description?.map((tag, idx) => (
                  <p key={idx}>{tag}</p>
                ))}
              </ContentDescription>
              <ContentRequirements>
                <NewTitle>Game Requirements</NewTitle>
                <ul>
                  <li>
                    <span>
                      <ImWindows /> Os:
                    </span>{" "}
                    {game?.minimum_system_requirements?.os}
                  </li>
                  <li>
                    <span>
                      <MdMemory /> Processor:
                    </span>{" "}
                    {game?.minimum_system_requirements?.processor}
                  </li>
                  <li>
                    <span>
                      <MdDesktopWindows /> Graphics:
                    </span>{" "}
                    {game?.minimum_system_requirements?.graphics}
                  </li>
                  <li>
                    <span>
                      <FaMemory /> Memory:
                    </span>{" "}
                    {game?.minimum_system_requirements?.memory}
                  </li>
                  <li>
                    <span>
                      <MdStorage /> Storage:
                    </span>{" "}
                    {game?.minimum_system_requirements?.storage}
                  </li>
                </ul>
              </ContentRequirements>
              {game?.listSimilarGames.length != 0 && (
                <RowCarrousel title="Similar games">
                  {game?.listSimilarGames.map(
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
              )}
            </>
          )}
          {loading && <LoadingAnimated />}
        </Content>
      </ContentContainer>
    </LayoutPage>
  );
};
