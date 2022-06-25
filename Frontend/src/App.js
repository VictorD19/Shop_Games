import "./App.css";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./Page/Home";
import { Games } from "./Page/Games";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="search_games/:param" element={<Games />} />
    </Routes>
  );
}

export default App;
