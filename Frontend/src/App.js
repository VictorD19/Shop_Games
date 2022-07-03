import "./App.css";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./Page/Home";
import { Games } from "./Page/Games";
import { MyGamesPage } from "./Page/MyGames";
import { GameDetailsPage } from "./Page/GameDetails";
import { ProfilePage } from "./Page/Profile";
import { CartPage } from "./Page/Cart";
import { PrivateRoutes } from "./Routes/Private.routes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="search_games/:param" element={<Games />} />
      <Route
        path="my_games"
        element={
          <PrivateRoutes redirectTo='/'>
            <MyGamesPage />
          </PrivateRoutes>
        }
      />
      <Route path="game/:gameId" element={<GameDetailsPage />} />
      <Route
        path="cart"
        element={
          <PrivateRoutes redirectTo='/'>
            <CartPage />
          </PrivateRoutes>
        }
      />
      <Route
        path="profile"
        element={
          <PrivateRoutes redirectTo='/'>
            <ProfilePage />
          </PrivateRoutes>
        }
      />
    </Routes>
  );
}

export default App;
