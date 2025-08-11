import React from 'react';
import poems from './poems.json'

const divStyle = {
    color:'white'
};

interface Poem {
    title: string;
    verses: string[];
}

class Vers extends React.Component {

    render() {
        let ps: Poem[];
        if(typeof poems === 'string')
            ps = JSON.parse(poems);
        return (
            <div style={divStyle}>
                <h2>About Page</h2>
                <main>
                    <p>This section contains information about...</p>
                </main>
            </div>
        )
    }
}



export default Vers;
