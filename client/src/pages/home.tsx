import React from 'react';
import RecipeList from '../components/recipeList.js';
import LogoImage from '../assets/stool.png';

const Home: React.FC = () => {
    return (
        <div className="home-container">
            <section className="hero is-small has-background-primary-dark">
                <div className="hero-body">
                    <div className="columns is-flex-direction-row">
                        <div className="column is-one-fifth">
                            <img className="is-pulled-right" src={LogoImage}></img>
                        </div>
                        <div className="column is-four-fifths">
                            <p className="title has-text-primary">Welcome to Treecipe</p>
                            <p className="subtitle">Connect, Share, Create, Repeat.</p>
                        </div>
                    </div>
                </div>
            </section>
            <RecipeList />
            <p className="mt-2">
                Use the left (<kbd>←</kbd>) and right (<kbd>→</kbd>) arrow keys to navigate through recipes.
            </p>
        </div>
    );
};

export default Home;


