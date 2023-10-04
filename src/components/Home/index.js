import React from 'react';
import './index.css'
import NavBar from '../NavBar';

const Home = () => {
    return (
        <div>
            <NavBar />
            <div className="card">
                <h1>Welcome to Movie Discover</h1>
                <p>Explore and find your favorite movies!</p>
            </div>
        </div>
    );
};

export default Home;
