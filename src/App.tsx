import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CommandPage from "./pages/command-page";
import CommandSecondPage from "./pages/command-second-page";
import { RecoilRoot } from "recoil";
import "normalize.css";
import MenuPage from "./pages/menu-page";

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/" element={<CommandPage />} />
          <Route path="/nouvelle-commande" element={<CommandSecondPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route
            path="*"
            element={
              <main>
                <h1>404 - Page non trouvée</h1>
                <Link to={"/"}>{`Retour à la page d'accueil`}</Link>
              </main>
            }
          />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

export default App;
