import { createContext, useContext, useReducer } from "react";
import { getCookie } from "../Utils/cookie";
import { initialUserData } from "./Data/initialState";
import { reducerUser } from "./Data/reducers";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // const token = getCookie('token')
  const [userState, dispatch] = useReducer(reducerUser, initialUserData);
  return (
    <UserContext.Provider value={{ userState, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useDataUser = () => {
  const { userState, dispatch } = useContext(UserContext);
  return { userState, dispatch };
};
