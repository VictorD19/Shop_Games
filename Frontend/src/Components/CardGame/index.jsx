import { NewButton } from "../Button";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CardContainer, DescriptionCard } from "./cardGame.styled";
import { GetScoreGame } from "../ScoreGame";
import { useNavigate } from "react-router-dom";

export const CardGame = ({
  title,
  genre,
  thumbnail,
  id,
  developer,
  release_date,
  price,
  newGame,
  isUser,
}) => {
  const navigate = useNavigate();
  return (
    <CardContainer
      isUser={isUser ? "true" : ""}
      onClick={() => navigate(`/game/${id}`)}
    >
      {newGame && <span className={newGame ? "active" : ""}>New</span>}

      <figure>
        <img src={thumbnail} alt={title} />
        <figcaption>
          {price} $
          <NewButton>
            <AiOutlineShoppingCart />
          </NewButton>
        </figcaption>
      </figure>
      <DescriptionCard isUser={isUser ? "true" : ""}>
        <h1>
          {title} <small>2022</small>
        </h1>
        <div className="descriptionDetails">
          {genre} - {developer}
        </div>
        <GetScoreGame />
      </DescriptionCard>
    </CardContainer>
  );
};
