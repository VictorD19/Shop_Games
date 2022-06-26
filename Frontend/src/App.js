import "./App.css";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./Page/Home";
import { Games } from "./Page/Games";
import { MyGamesPage } from "./Page/MyGames";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="search_games/:param" element={<Games />} />
      <Route path="my_games" element={<MyGamesPage />} />
    </Routes>
  );
}

export default App;
