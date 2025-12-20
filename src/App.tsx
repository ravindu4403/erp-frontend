import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainMenu from "./pages/MainMenu";
import PosMainMenu from "./pages/PosMainMenu";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/main-menu" element={<MainMenu />} />
        <Route path="/pos" element={<PosMainMenu />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
