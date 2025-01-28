import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_RECIPES, QUERY_ME } from '../utils/queries.js';
import Recipe from './recipeCard.js';

interface RecipeProps {
    _id: string;
    recipeId: string;
    recipeTitle: string;
    recipeText: string;
    recipeAuthor: string;
    createdAt: string;
    tags: string[];
}

interface RecipeListProps {
    recipes?: RecipeProps[];
    filterByAuthor?: boolean; // Determines if we filter by the logged-in user
    filterBySaved?: boolean;  // Determines if we filter by the user's saved Recipes
}

const RecipeList: React.FC<RecipeListProps> = ({ filterByAuthor, filterBySaved }) => {
    const [displayedRecipes, setDisplayedRecipes] = useState<RecipeProps[]>([]);
    const [startIndex, setStartIndex] = useState(0);
    const recipesPerPage = 6;

    // Use the appropriate query based on filters
    const { loading, error, data } = useQuery(filterByAuthor || filterBySaved ? QUERY_ME : QUERY_RECIPES);

    useEffect(() => {
        if (!data) return;

        let recipes = data.recipes ?? [];
        if (filterByAuthor) {
            recipes = data.me?.recipes ?? [];
        } else if (filterBySaved) {
            recipes = data.me?.library ?? [];
        }

        setDisplayedRecipes(recipes.slice(startIndex, startIndex + recipesPerPage));
    }, [data, startIndex, filterByAuthor, filterBySaved]);

    // Handle cycling recipes with arrow keys
    useEffect(() => {
        if (!filterByAuthor && !filterBySaved) {
            const handleKeyDown = (event: KeyboardEvent) => {
                if (!data?.recipes) return;

                const totalRecipes = data.recipes.length;
                if (event.key === 'ArrowRight') {
                    setStartIndex((prev) =>
                        Math.min(prev + recipesPerPage, totalRecipes - recipesPerPage)
                    );
                } else if (event.key === 'ArrowLeft') {
                    setStartIndex((prev) => Math.max(prev - recipesPerPage, 0));
                }
            };

            window.addEventListener('keydown', handleKeyDown);
            return () => {
                window.removeEventListener('keydown', handleKeyDown);
            };
        }
    }, [data, filterByAuthor, filterBySaved]);

    const handleNext = () => {
        if (!data?.recipes) return;
        const totalRecipes = data.recipes.length;
        setStartIndex((prev) => Math.min(prev + recipesPerPage, totalRecipes - recipesPerPage));
    };

    const handlePrevious = () => {
        if (!data?.recipes) return;
        setStartIndex((prev) => Math.max(prev - recipesPerPage, 0));
    };

    if (loading) return <p>Loading recipes...</p>;
    if (error) return <p>Error loading recipes.</p>;

    return (
        <div>
            <div className="buttons has-addons block mt-4">
                <button
                    onClick={handlePrevious}
                    disabled={startIndex === 0}
                    className="button is-primary"
                    >
                        Previous
                    </button>
                <button
                    onClick={handleNext}
                    disabled={startIndex + recipesPerPage >= (data?.recipes?.length || 0)}
                    className="button is-primary"
                    >
                        Next
                    </button>
            </div>
            <div className="recipe-grid">
                <div className="grid is-col-min-16">
                {displayedRecipes.map((recipe) => (
                    <Recipe
                        key={recipe._id}
                        recipeId={recipe._id}
                        recipeTitle={recipe.recipeTitle}
                        recipeText={recipe.recipeText}
                        recipeAuthor={recipe.recipeAuthor}
                        createdAt={recipe.createdAt}
                        tags={recipe.tags}
                    />
                ))}
                </div>
            </div>
            <div className="buttons has-addons block mt-4">
                <button
                    onClick={handlePrevious}
                    disabled={startIndex === 0}
                    className="button is-primary"
                    >
                        Previous
                    </button>
                <button
                    onClick={handleNext}
                    disabled={startIndex + recipesPerPage >= (data?.recipes?.length || 0)}
                    className="button is-primary"
                    >
                        Next
                    </button>
            </div>
        </div>
    );
};

export default RecipeList;
