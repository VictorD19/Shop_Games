import { NewButton } from "../Button";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CardContainer, DescriptionCard } from "./cardGame.styled";
import { GetScoreGame } from "../ScoreGame";

export const CardGame = () => {
  return (
    <CardContainer>
      <figure>
        <img src="https://www.mmobomb.com/g/1116/thumbnail.jpg" alt="Trulli" />
        <figcaption>
          30 $
          <NewButton>
            <AiOutlineShoppingCart />
          </NewButton>
        </figcaption>
      </figure>
      <DescriptionCard>
        <h1>
          Space Punks <small>2022</small>
        </h1>
        <div className="descriptionDetails">Shooter : Flying Wild Hog</div>
        <GetScoreGame/>
      </DescriptionCard>
    </CardContainer>
  );
};
