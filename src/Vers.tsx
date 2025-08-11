import React from 'react';
import poems from './poems.json'

const divStyle = {
    color:'white',

};

interface Poem {
    title: string;
    verses: string[];
    id: number;
}

function onSelect(item: string, items:Poem[]) {
    const match = items.find((i) => i.title === item);
    if(match) {
        const target = document.getElementById(item);
        if (target) {
            target.scrollIntoView({behavior: "smooth"});
        }
    }
}

class Vers extends React.Component {

    render() {
        const ps: Poem[] = poems
        return (
            <div style={divStyle}>
                <h1 className="text-7xl bold">CsWM Versek</h1>
                <main>
                    <p>Hányóvödör használata ajánlott</p>
                </main>
                <aside className="w-64 h-screen bg-gray-800 top-16 text-gray-200 p-4 fixed left-0 top-0">
                    <ul className="space-y-2">
                        {ps.map((poem) =>{ return poem.title }).map((item, index) => (
                            <li
                                key={index}
                                onClick={() => onSelect(item, ps)}
                                className="px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                </aside>
                {ps.map((item) => (
                    <section key={item.id} id={String(item.id)} className="scroll-mt-20">
                        <h2 className="text-2xl font-bold mb-4">{item.title}</h2>
                        <p className="text-gray-600">
                            This is the {item.title} section. Add your content here.
                        </p>
                    </section>
                ))}
            </div>
        )
    }
}



export default Vers;
