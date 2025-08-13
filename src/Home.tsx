import './App.css';
import React from 'react';
import logo from './logo.svg';
import {Link} from "react-router-dom";

class Home extends React.Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <p className="App-title">
                        Csokonay Witéz Misi
                    </p><br/>
                    <p className={"text-gray-200"}><i>"A magyar felvilágosodáskori irodalom egyik legjelentősebb költője.<br/>Tanárai a jövő tudósaként emlegették."</i></p>
                </header>
            </div>
        );
    }

}

export default Home;
