import { createContext, useContext, useEffect, useReducer } from "react";
import { getCartDetails } from "../Api/cartEnpoints";
import { initialCart } from "./Data/initialState";
import { reducerCart } from "./Data/reducers";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(reducerCart, initialCart);

  useEffect(() => {
    (async () => {
      try {
        const cartDetails = await getCartDetails();
        dispatch({ method: "INITIAL_CART", cart: cartDetails });
      } catch (error) {}
    })();
  }, []);

  return (
    <CartContext.Provider value={{ cartState, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const { cartState, dispatch } = useContext(CartContext);
  return { cartState, dispatch };
};
