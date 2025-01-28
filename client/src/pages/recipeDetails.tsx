import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_SINGLE_RECIPE } from '../utils/queries';
import { SAVE_TO_RECIPEBOX, REMOVE_FROM_RECIPEBOX } from '../utils/mutations';


const RecipeDetails: React.FC = () => {

    const [helperText, setHelperText] = useState('');
    const [helperFormat, setHelperFormat] = useState('help is-hidden');

    const navigate = useNavigate(); //Used to navigate between pages
    const { recipeId } = useParams<{ recipeId: string }>(); // Retrieve the recipe ID from the URL

    // Fetch the recipe data using the QUERY_RECIPE query
    const { loading, error, data } = useQuery(QUERY_SINGLE_RECIPE, {
        variables: { recipeId },
    });

    // Mutations for adding and removing recipes
    const [saveToRecipeBox] = useMutation(SAVE_TO_RECIPEBOX, {
        onCompleted: () => {
        },
        onError: (err) => console.error("Error adding recipe:", err),
    });

    const [removeFromRecipeBox] = useMutation(REMOVE_FROM_RECIPEBOX, {
        onCompleted: () => {
        },
        onError: (err) => console.error("Error removing recipe:", err),
    });

    const handleAddToRecipeBox = async () => {
        try {
            await saveToRecipeBox({ variables: { recipeId } });
            setHelperText("Added to your Recipe Box!")
            setHelperFormat("has-text-success has-text-centered");
        } catch (err) {
            console.error("Error updating Recipe Box status:", err);
        }
    };

    const handleRemoveFromRecipeBox = async () => {
        try {
            await removeFromRecipeBox({ variables: { recipeId } });
            setHelperText("Removed from your Recipe Box.");
            setHelperFormat("has-text-danger has-text-centered");
        } catch (err) {
            console.error("Error updating Recipe Box status:", err);
        }
    };

    const handleTagClick = (tag: string) => {
        navigate(`/explore?search=${encodeURIComponent(tag)}`);
    };

    //Handle the loading and error states
    if (loading) return <p className="loading-spinner">Loading recipe details...</p>;
    if (error) {
        console.error('Error fetching recipe:', error);
        return <p>Oops! Something went wrong while loading the recipe. Please try again later.</p>;
    }
    // Extract the fetched recipe data
    const fetchedRecipe = data?.recipe;

    // If no recipe is found, show an error message
    if (!fetchedRecipe) {
        return <p>Recipe not found. Please check the recipe ID and try again later.</p>;
    };

    // Destructuring recipe data from the fetched recipe object
    const { recipeTitle, recipeText, recipeAuthor, /* createdAt, */ tags } = fetchedRecipe;

    // Handle the back button functionality
    const handleBackButton = () => {
        navigate(-1); // Go back to the previous page
    };

    return (

        <div>
            <div className="hero is-small has-background-primary-dark">
                <div className="hero-body">
                    <h2 className="title has-text-primary">{recipeTitle}</h2>
                    <div className="subtitle">
                        <p>By: {recipeAuthor}</p>
                    </div>
                </div>
            </div>

            {/* Displays recipe content  */}
            <div className="content" style={{ whiteSpace: 'pre-line' }}>

                <p className="details-text">{recipeText}</p>
            </div>


            {/* Tags Section */}
            <div className="level">
                <div className="level-item">
                    {tags?.length > 0 ? (
                        tags.map((tag: string, index: number) => (
                            <span
                                key={index}
                                className="tag is-primary is-light"
                                style={{ margin: '0 5px', cursor: 'pointer' }}
                            onClick={() => handleTagClick(tag)}
                            >
                                #{tag}
                            </span>
                        ))
                    ) : (
                        <p className="has-text-warning">No tags available</p>
                    )}
                </div>
            </div>

            {/* Buttons for saving and navigation */}
            <div className="buttons has-addons is-centered">
                <button className="button is-primary" onClick={handleAddToRecipeBox}>
                    Add to Recipe Box
                </button>
                <button className="button is-light" onClick={handleBackButton}>
                    Go Back
                </button>
                <button className="button is-danger" onClick={handleRemoveFromRecipeBox}>
                    Remove from Recipe Box
                </button>
            </div>
            <div>
                <p className={helperFormat}>{helperText}</p>
            </div>

        </div>
    )
};

export default RecipeDetails