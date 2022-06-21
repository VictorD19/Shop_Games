import { removeCookie } from "../../Utils/cookie";
import { initialUserData } from "./initialState";

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
