import React from 'react';
import {allPoems} from "./poem";
import SideBar, {poemVerses} from "./PoemSideBar";

const divStyle = {
    color: 'white',
    display: 'flex',
    "flex-direction": 'column',
};

class Vers extends React.Component {
    render() {
        return (
            <>
                <SideBar poems={allPoems}></SideBar>
                <div style={divStyle}>
                    <h1 className="text-7xl"><b>CsWM Versek</b></h1>
                    <main>
                        <p><i>Hányóvödör használata ajánlott</i></p>
                    </main>
                    <br/>
                    {allPoems.map((item, upperindex) => (
                        <section key={upperindex} id={String(upperindex)} className="scroll-mt-20">
                            <h2 className="text-2xl font-bold mb-4">{item.title}</h2>
                            <p className="text-gray-300">
                                <div>
                                    {poemVerses(item).map((verse, index) => (
                                        <span key={index} className="block mb-2">
                                        {verse.map((item) => (
                                            <>
                                                {item.split('\n').map((line, index) => (
                                                    <span key={index} className="inline-block mr-2">{line}</span>
                                                ))}
                                                <br/>
                                            </>
                                        ))}
                                            <br/>
                                    </span>
                                    ))}
                                </div>
                                <br/>
                            </p>
                        </section>
                    ))}
                </div>
            </>
        )
    }
}

export default Vers;
