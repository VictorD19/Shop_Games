import { NewButton } from "../Button";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CardContainer, DescriptionCard } from "./cardGame.styled";
import { GetScoreGame } from "../ScoreGame";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../Context/cartContext";
import { addItemCart } from "../../Api/cartEnpoints";
import { useAlert } from "../../Context/alertContext";

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
  const { dispatch } = useCart();
  const { handleCreateToast } = useAlert();
  const handleAddItemCart = async () => {
    try {
      const addItemCardSuccess = await addItemCart(id);
      if (addItemCardSuccess.error) throw new Error(addItemCardSuccess.error);
      dispatch({ method: "UPDATE_CART", cart: addItemCardSuccess });
      handleCreateToast("success", "Game added");
    } catch (error) {
      handleCreateToast("error", error.message);
    }
  };
  return (
    <CardContainer isUser={isUser ? "true" : ""}>
      {newGame && <span className={newGame ? "active" : ""}>New</span>}

      <figure>
        <img
          src={thumbnail}
          alt={title}
          onClick={() => navigate(`/game/${id}`)}
        />
        <figcaption>
          {price} $
          <NewButton onClick={handleAddItemCart}>
            <AiOutlineShoppingCart />
          </NewButton>
        </figcaption>
      </figure>
      <DescriptionCard
        isUser={isUser ? "true" : ""}
        onClick={() => navigate(`/game/${id}`)}
      >
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
