import React from 'react';
import CompositionList from '../components/compositionList';

const Home: React.FC = () => {
    return (
        <div className="home-container">
            <h1>Welcome to ArtVine</h1>
            <CompositionList />
            <p>
                Use the left (<kbd>←</kbd>) and right (<kbd>→</kbd>) arrow keys to navigate through poems.
            </p>
        </div>
    );
};

export default Home;


