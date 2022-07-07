import { useEffect, useState } from "react";
import { ConfirmMain, ConfirmPage } from "./confirm.styled";
import ProgressBar from "react-bootstrap/ProgressBar";
import { sendBuyOfGame } from "../../Api/cartEnpoints";
import { useAlert } from "../../Context/alertContext";
import { useCart } from "../../Context/cartContext";
import { useDataUser } from "../../Context/userContext";
export const Confirm = (props) => {
  const { handleCreateToast } = useAlert();
  const { dispatch } = useCart();
  const { dispatch: dispatchUser } = useDataUser();
  const [stage, setStage] = useState(0);
  const [loading, setLoading] = useState(25);
  const words = [
    "Creating purchase order",
    "Checking payment information",
    "Processing payment",
    "Payment successfully",
  ];

  useEffect(() => {
    let count = 3;
    let idInterval = setInterval(() => {
      if (count > 0) {
        setStage((prev) => prev + 1);
        setLoading((prev) => prev + 25);
        count--;
        return;
      }
    }, 3000);
    setTimeout(() => {
      props.setActive(false);
      clearInterval(idInterval);
      (async () => {
        try {
          const payGames = await sendBuyOfGame();
          if (payGames.error) throw new Error(payGames.error);
          dispatchUser({ method: "UPDATED_GAMES", games: payGames.games });
          dispatch({ method: "UPDATE_CART", cart: payGames.cart });
        } catch (error) {
          // props.setActive(true);
        }
      })();
      return;
    }, 9000);

    return () => clearInterval(idInterval);
  }, []);

  return (
    <ConfirmPage>
      <ConfirmMain>
        <div className="pay">{words[stage]}</div>
        <ProgressBar
          striped
          animated
          variant={loading < 100 ? "warning" : "success"}
          now={loading}
        />
      </ConfirmMain>
    </ConfirmPage>
  );
};
