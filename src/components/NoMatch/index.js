import React from 'react';
import './index.css'
import NavBar from '../NavBar';

const NoMatch = () => {
    return (
        <div>
            <NavBar />
            <div className="card">
                <h1>Page not found!</h1>
                <p>Uh oh, that page doesn't exist.</p>
            </div>
        </div>
    );
};

export default NoMatch;
