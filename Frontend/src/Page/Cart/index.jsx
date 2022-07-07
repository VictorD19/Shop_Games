import { Formik } from "formik";
import { useRef, useState } from "react";
import { Form, FormControl, InputGroup, ProgressBar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  applyDiscount,
  removeDiscount,
  removeItemCart,
} from "../../Api/cartEnpoints";
import { NewButton } from "../../Components/Button";
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
  RemoveCupom,
} from "./cart.styled";
import { Confirm } from "./Confirm";
import { Payament } from "./Payament";

export const CartPage = () => {
  const { cartState, dispatch } = useCart();
  const { handleCreateToast } = useAlert();
  const [progress, setProgress] = useState(0);
  const { products, amount, total, discount } = cartState;
  const [selectCard, setCart] = useState("");
  const [active, setActive] = useState(false);
  const navigate = useNavigate()
  const handleApplyDiscount = async ({ cupom }) => {
    try {
      const discountCart = await applyDiscount(cupom);
      if (discountCart.error) throw new Error(discountCart.error);
      dispatch({ method: "UPDATE_CART", cart: discountCart });
      handleCreateToast("success", "Discount applied");
    } catch (error) {
      return handleCreateToast("error", error.message);
    }
  };
  const handleNextStep = (values = {}) => {
    if (progress === 0) {
      setProgress(50);
      setActive(true);
    }
    if (progress === 50) {
      setProgress(100);
      setActive(true);
      return;
    }
    if (progress === 100) {
      navigate('/my_games')
    }
  };
  const handleBackStep = () => {
    if (progress === 100) setProgress(50);
    if (progress === 50) setProgress(0);
  };
  const handleRemoveDiscount = async () => {
    try {
      const newCart = await removeDiscount();
      if (newCart.error) throw new Error(newCart.error);
      dispatch({ method: "UPDATE_CART", cart: newCart });
      handleCreateToast("success", "Discount removed");
    } catch (error) {
      return handleCreateToast("error", error.message);
    }
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
        {progress === 50 && (
          <Payament
            selectCard={selectCard}
            setCart={setCart}
            setActive={setActive}
          />
        )}
        {progress === 100 && <Confirm setActive={setActive} />}

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
          {progress === 0 && (
            <Formik
              initialValues={{ cupom: "" }}
              onSubmit={handleApplyDiscount}
            >
              {({ handleSubmit, handleChange, values }) => (
                <Form>
                  <InputGroup>
                    <FormControl
                      name="cupom"
                      onChange={handleChange}
                      value={values.cupom}
                      placeholder="Apply cupom"
                    />
                    <NewButton onClick={handleSubmit} type="submit">
                      Apply
                    </NewButton>
                  </InputGroup>
                  {discount !== 0 && (
                    <RemoveCupom onClick={handleRemoveDiscount}>
                      Remove Cupom
                    </RemoveCupom>
                  )}
                </Form>
              )}
            </Formik>
          )}
          <NewButton
            variant="success"
            disabled={active}
            onClick={handleNextStep}
          >
            {progress === 0
              ? "GO TO PAYMENT"
              : progress === 50
              ? "PAY"
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
