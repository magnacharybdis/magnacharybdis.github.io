import React from 'react';
import poems from './poems.json'

const divStyle = {
    color:'white',

};
const ps: Poem[] = poems

interface Poem {
    title: string;
    verses: string[];
    id: number;
}

function onSelect(index: number) {
    const target = document.getElementById(String(index));
    if (target) {
        target.scrollIntoView({behavior: "smooth"});
    }
}

function getVerses(poem: Poem) {
    return poem.verses.map((verse) => { return verse.split('\n') });
}

class Vers extends React.Component {

    render() {
        return (
            <div style={divStyle}>
                <h1 className="text-7xl"><b>CsWM Versek</b></h1>
                <main>
                    <p><i>Hányóvödör használata ajánlott</i></p>
                </main>
                <br/>
                <aside className="w-64 h-screen bg-gray-800 top-16 text-gray-200 p-4 fixed left-0 top-0">
                    <ul className="space-y-2">
                        {ps.map((poem) =>{ return poem.title }).map((title, index) => (
                            <li
                                key={index}
                                onClick={() => onSelect(index)}
                                className="px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
                            >
                                {title}
                            </li>
                        ))}
                    </ul>
                </aside>
                {ps.map((item,upperindex) => (
                    <section key={upperindex} id={String(upperindex)} className="scroll-mt-20">
                        <h2 className="text-2xl font-bold mb-4">{item.title}</h2>
                        <p className="text-gray-600">
                            <div>
                                {getVerses(item).map((verse, index) => (
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
                            {/*{
                                const rows = []
                                for (verse in item.verses.map((verse) => { return verse.split('\n') })) {
                                <span key={index} className="block mb-2">
                            {verse}
                            <br/>
                        </span>
                        return rows;
                        }}*/}
                        </p>
                    </section>
                ))}
            </div>
        )
    }
}



export default Vers;
