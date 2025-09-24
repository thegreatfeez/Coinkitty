import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Insight from "./pages/Insight";
import Learn from "./pages/Learn";
import TokenDetails from "./pages/TokenDetails";
import { PortfolioProvider } from "./contexts/PortfolioContext";
import Portfolio from "./pages/Portfolio"
import Login from "./pages/Login";
import AuthRequired from "./components/AuthRequired";

function App() {
  return (
  <PortfolioProvider>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<AuthRequired/>}>
           <Route path="portfolio" element={<Portfolio/>} />
        </Route>
       

        <Route path="insights" element={<Insight />} />
        <Route path="learn" element={<Learn />} />
        <Route path="token/:tokenId" element={<TokenDetails />} />
        <Route path="Login" element={<Login/>} />
      </Routes>
    </Router>
  </PortfolioProvider>
  );
}

export default App;
