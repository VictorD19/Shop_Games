import { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { MdMemory, MdDesktopWindows, MdStorage } from "react-icons/md";
import { FaMemory } from "react-icons/fa";
import { ImWindows } from "react-icons/im";
import { getDetailsGame } from "../../Api/gamesEndpoints";
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
};

export const GameDetailsPage = () => {
  const { gameId } = useParams();
  const [game, setGame] = useState(initialGameData);

  useEffect(() => {
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
        setGame(gameDetails);
      } catch (error) {}
    })();
  }, [gameId]);
  return (
    <LayoutPage>
      <ContentContainer>
        <AsideMainLayout />
        <Content>
          <NewTitle>{game?.title}</NewTitle>

          <div className="mainPhotos">
            {game?.thumbnail && (
              <Carousel fade>
                <Carousel.Item>
                  <img className=" " src={game?.thumbnail} alt="First slide" />
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
        </Content>
      </ContentContainer>
    </LayoutPage>
  );
};
