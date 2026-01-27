import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./Home";
import About from "./About";
import ErrPage from "./ErrPage";
import Navbar from "./navbar";
import Meme from "./Meme";
import Footer from "./Footer";
import PoemBrowser from "./PoemBrowser";
import SimplePoem from "./SimplePoem";
import FullPoem from "./FullPoem";
import {allPoems, bestPoems, mch1Poems, mch2Poems, worstPoems} from "./poem";
import SinglePoem from "./SinglePoem";

function App() {
  return (
    <div className="App">
        <Navbar></Navbar>
        <div className="pt-16">
            <Routes>
                <Route path={"/"} element={<Home></Home>}></Route>
                <Route path="/meme" element={<Meme></Meme>}></Route>
                <Route path="/about" element={<About></About>}></Route>
                <Route path="/poembrowser" element={<PoemBrowser></PoemBrowser>}></Route>
                <Route path="/poemroute" element={<SimplePoem title={""} poems={allPoems}></SimplePoem>}></Route>
                <Route path="/poems" element={<FullPoem title={"CsWM Versek"} poems={allPoems}></FullPoem>}></Route>
                <Route path="/mch1" element={<FullPoem title={"Magna Charybdis I"} poems={mch1Poems}></FullPoem>}></Route>
                <Route path="/mch2" element={<FullPoem title={"Magna Charybdis II"} poems={mch2Poems}></FullPoem>}></Route>
                <Route path="/best" element={<FullPoem title={"Legjobb CsWM művek"} poems={bestPoems}></FullPoem>}></Route>
                <Route path="/worst" element={<FullPoem title={"Legrosszabb CsWM művek"} poems={worstPoems}></FullPoem>}></Route>
                <Route path="/poem/:poem" element={<SinglePoem></SinglePoem>}></Route>
                <Route path="*" element={<ErrPage />} />
            </Routes>
        </div>
        <Footer></Footer>
    </div>
  );
}


export default App;
