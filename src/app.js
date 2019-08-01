import React from 'react';
import ReactDOM from 'react-dom';

import './app.scss';

function App() {
    return (
        <>
            <div className="stan-loading-container">
                <div className="stan-loading-content">
                </div>
            </div>
            <div className="app" style={{display: 'flex'}}>
                <div style={{margin: 'auto'}}>
                    react demo modify
                </div>
            </div>
        </>
    );
}

ReactDOM.render(<App/>, document.getElementById('root'));