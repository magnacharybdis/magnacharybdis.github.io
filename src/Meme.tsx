import React from 'react';

const divStyle = {
    color:'white'
};

class Meme extends React.Component {

    render() {
        return (
            <div className={'bg-[#181a1b]'} style={divStyle}>
                <h2>About Page</h2>
                <main>
                    <p>This section contains information about...</p>
                </main>
            </div>
        )
    }
}

export default Meme;
