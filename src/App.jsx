import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Insight from "./pages/Insight";
import Learn from "./pages/Learn";
import TokenDetails from "./pages/TokenDetails";
import { PortfolioProvider } from "./contexts/PortfolioContext";
import Portfolio from "./pages/Portfolio"

function App() {
  return (
  <PortfolioProvider>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio/>} />
        <Route path="/insights" element={<Insight />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/token/:tokenId" element={<TokenDetails />} />
        <Route path="/Login" element={<div>Please Login</div>} />
      </Routes>
    </Router>
  </PortfolioProvider>
  );
}

export default App;
