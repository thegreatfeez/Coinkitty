import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<div>Home Page</div>} />
                <Route path="/portfolio" element={<div>Portfolio Page</div>} />
                <Route path="/insights" element={<div>Insights Page</div>} />
                <Route path="/learn" element={<div>Learn Page</div>} />
                <Route path="/Login" element={<div>Please Login</div>} />
            </Routes>
        </Router>
    );
}

export default App;