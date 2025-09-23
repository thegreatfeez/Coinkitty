import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Insight from './pages/Insight';
import Learn from './pages/Learn';
import TokenDetails from './pages/TokenDetails';


function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/portfolio" element={<div>Portfolio Page</div>} />
                <Route path="/insights" element= {<Insight/>}/>
                <Route path="/learn" element={<Learn/>} />
                 <Route path="/token/:tokenId" element={<TokenDetails/>} />
                <Route path="/Login" element={<div>Please Login</div>} />
            </Routes>
        </Router>
    );
}

export default App;