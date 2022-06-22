import { createContext, useContext, useEffect, useReducer } from "react";
import { getDataUser } from "../Api/userEndpoint";
import { getCookie } from "../Utils/cookie";
import { initialUserData } from "./Data/initialState";
import { reducerUser } from "./Data/reducers";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const token = getCookie("token");
  const [userState, dispatch] = useReducer(reducerUser, initialUserData);

  useEffect(() => {
    if (!token) return;
    (async () => {
      try {
        const data = await getDataUser();
        if (data.error) throw new Error(data.error);
        dispatch({ method: "INITIAL_USER", data });
      } catch (error) {
        console.error(error.message);
      }
    })();
  }, [token]);

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
