import { Formik } from "formik";
import { useState } from "react";
import { Form, FormControl, InputGroup, ProgressBar } from "react-bootstrap";
import { applyDiscount, removeItemCart } from "../../Api/cartEnpoints";
import { NewButton } from "../../Components/Button";
import { NewInputForm } from "../../Components/Input";
import { NewTitle } from "../../Components/Title";
import { useAlert } from "../../Context/alertContext";
import { useCart } from "../../Context/cartContext";
import { LayoutPage } from "../../Layout";
import {
  CartContainer,
  CartDetails,
  CartItemActions,
  CartItemInfo,
  CartItemPrice,
  ProgressContainer,
} from "./cart.styled";
import { Confirm } from "./Confirm";
import { Payament } from "./Payament";

export const CartPage = () => {
  const { cartState, dispatch } = useCart();
  const { handleCreateToast } = useAlert();
  const [progress, setProgress] = useState(0);
  const { products, amount, total, discount } = cartState;
  const handleApplyDiscount = async ({ cupom }) => {
    try {
      const discountCart = await applyDiscount(cupom);
      if (discountCart.error) throw new Error(discountCart.error);
      dispatch({ method: "UPDATE_CART", cart: discountCart });
    } catch (error) {
      return handleCreateToast("error", error.message);
    }
  };
  const handleNextStep = () => {
    if (progress === 0) setProgress(50);
    if (progress === 50) setProgress(100);
    if (progress === 100) console.log("games");
  };
  const handleBackStep = () => {
    if (progress === 100) setProgress(50);
    if (progress === 50) setProgress(0);
  };
  return (
    <LayoutPage>
      <ProgressContainer>
        <ProgressBar animated now={progress} />
        <div className="stepContainer">
          <span className="step active">1</span>
          <span className={`step ${progress >= 50 ? "active" : ""}`}>2</span>
          <span className={`step ${progress === 100 ? "active" : ""}`}>3</span>
        </div>
      </ProgressContainer>
      <CartContainer>
        {progress === 0 && (
          <div className="cart_items">
            <span>Game details</span>
            <span>Price</span>
            <span>Options</span>
            {products?.map(({ title, idGame, price, thumbnail }) => (
              <CartItem
                title={title}
                key={idGame}
                id={idGame}
                price={price}
                thumbnail={thumbnail}
              />
            ))}
          </div>
        )}
        {progress === 50 && <Payament />}
        {progress === 100 && <Confirm />}

        <CartDetails>
          <NewTitle>Cart details</NewTitle>
          <ul>
            <li>
              Games: <span> {amount}</span>
            </li>
            <li>
              Discount: <span>{`${discount}%`}</span>
            </li>
            <li>
              Total: <span>{total}</span>
            </li>
          </ul>
          <Formik initialValues={{ cupom: "" }} onSubmit={handleApplyDiscount}>
            {({ handleSubmit, handleChange, values }) => (
              <Form>
                <InputGroup>
                  <FormControl
                    name="cupom"
                    onChange={handleChange}
                    value={values.cupom}
                  />
                  <NewButton onClick={handleSubmit} type="submit">
                    Apply
                  </NewButton>
                </InputGroup>
              </Form>
            )}
          </Formik>
          <NewButton variant="success" onClick={handleNextStep}>
            {progress === 0
              ? "GO TO PAYMENT"
              : progress === 50
              ? "CONFIRM"
              : "TO GAMES"}
          </NewButton>
          {progress >= 50 && (
            <NewButton variant="secondary" onClick={handleBackStep}>
              BACK
            </NewButton>
          )}
        </CartDetails>
      </CartContainer>
    </LayoutPage>
  );
};

export const CartItem = ({ thumbnail, title, price, id }) => {
  const { handleCreateToast } = useAlert();
  const { dispatch } = useCart();
  const [loading, setLoading] = useState(false);

  const handledDeleteItemCart = async () => {
    setLoading(true);
    try {
      const itemDeleted = await removeItemCart(id);
      if (itemDeleted.error) throw new Error(itemDeleted.error);
      handleCreateToast("success", "Game removed successfully");
      setLoading(false);
      dispatch({ method: "UPDATE_CART", cart: itemDeleted });
    } catch (error) {
      handleCreateToast("error", error.message);
      setLoading(false);
    }
  };
  return (
    <>
      <CartItemInfo>
        <img src={thumbnail} alt="game" />
        <div>
          <h2>{title}</h2>
        </div>
      </CartItemInfo>
      <CartItemPrice>$ {price}</CartItemPrice>
      <CartItemActions>
        <NewButton
          disabled={loading}
          variant="danger"
          onClick={handledDeleteItemCart}
        >
          {loading ? "Wait..." : "Remove"}
        </NewButton>
      </CartItemActions>
    </>
  );
};
