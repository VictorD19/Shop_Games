import { NewButton } from "../Button";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CardContainer, DescriptionCard } from "./cardGame.styled";
import { GetScoreGame } from "../ScoreGame";

export const CardGame = ({
  title,
  genre,
  thumbnail,
  id,
  developer,
  release_date,
  price,
  newGame,
}) => {
  return (
    <CardContainer>
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
      <DescriptionCard>
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
