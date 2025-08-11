import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Link, Route, Routes} from "react-router-dom";
import Home from "./Home";
import About from "./About";
import ErrPage from "./ErrPage";
import Example from "./Example";
import {NavbarWithSubmenu} from "./NavBar";
import Navbar from "./navbar";
import Vers from "./Vers";
import Meme from "./Meme";

function App() {
  return (
    <div className="App">
        <div>
              <Navbar></Navbar>
            {/*<nav>
                  <ul id="navigation">
                      <li>
                          <Link to="/">Home</Link>
                      </li>
                      <li>
                          <Link to="/about">About</Link>
                      </li>
                      <li>
                          <Link to="/contact">Contact</Link>
                      </li>
                  </ul>
              </nav>*/}
          </div>
        <Routes>
            <Route path={"/"} element={<Home></Home>}></Route>
            <Route path="/vers" element={<Vers></Vers>}></Route>
            <Route path="/meme" element={<Meme></Meme>}></Route>
            <Route path="/about" element={<About></About>}></Route>
            <Route path="*" element={<ErrPage />} />
        </Routes>
    </div>
  );
}


export default App;
