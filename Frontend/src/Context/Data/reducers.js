import { removeCookie } from "../../Utils/cookie";
import { initialUserData, initialCart } from "./initialState";

export const reducerUser = (state, action) => {
  switch (action.method) {
    case "INITIAL_USER":
      const { email, _id, games } = action.data;
      return { user: { email, _id }, my_games: games };
    case "LOGOUT":
      removeCookie("token");
      return initialUserData;
    default:
      return initialUserData;
  }
};

export const reducerCart = (state, action) => {
  switch (action.method) {
    case "INITIAL_CART":
      const cart = action.cart;
      return { ...state, ...cart };
    case "UPDATE_CART":
      const newCart = action.cart;
      return { ...state, ...newCart };

    default:
      return initialCart;
  }
};
