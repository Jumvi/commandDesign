import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CommandPage from "./pages/command-page";
import CommandSecondPage from "./pages/command-second-page";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/" element={<CommandPage />} />
          <Route path="/nouvelle-commande" element={<CommandSecondPage />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

export default App;
