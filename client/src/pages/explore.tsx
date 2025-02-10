import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { SEARCH_RECIPES_AND_USERS } from '../utils/queries.js';
import SearchBar from '../components/searchBar.jsx';
import RecipeCard from '../components/recipeCard.js';
import RecipeList from '../components/recipeList.js';

const ExplorePage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();
    const [displaySearchResults, setDisplaySearchResults] = useState(false);
    const [startIndex, setStartIndex] = useState(0);
    const recipesPerPage = 6;

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const tag = params.get('search');
        if (tag) {
            setSearchQuery(tag);
            setDisplaySearchResults(true);
        }
    }, [location]);

    // Use the search query in a GraphQL query via Apollo Client's useQuery hook
    const { data, loading, error } = useQuery(SEARCH_RECIPES_AND_USERS, {
        variables: { query: searchQuery },
        skip: !searchQuery,  // Skip the query if searchQuery is empty
    });

    const onSearch = (query: string) => {
        setSearchQuery(query);  // Update the search query when the user types something
        setDisplaySearchResults(true);  // Display search results when the user types something
        setStartIndex(0);  // Reset the start index when the user types something
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (!data?.searchRecipesAndUsers.recipes) return;

            const totalRecipes = data.searchRecipesAndUsers.recipes.length;
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
    }, [data]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const recipes = data?.searchRecipesAndUsers?.recipes?.slice(
        startIndex,
        startIndex + recipesPerPage
    ) || [];


    return (
        <>
            <div className="hero is-small has-background-primary-lightest">
                <div className="hero-body is-flex-direction-column">
                    <p className="title has-text-primary">Explore</p>
                    <p className="subtitle">Here you can explore all of the recipes submitted to Treecipe.</p>
                    <SearchBar onSearch={onSearch} />
                </div>
            </div>

            {displaySearchResults ? (
                <div>
                    {/* <div className="block">
                        <p className="title is-4">Users:</p>
                        {data?.searchRecipesAndUsers?.users?.length > 0 ? (
                            data.searchRecipesAndUsers.users.map((user: { _id: string; name: string; email: string }) => (
                                <div key={user._id}>
                                    <p className="tag is-dark is-medium mb-1">{user.name} - {user.email}s</p>
                                </div>
                            ))
                        ) : (
                            <p className="tag is-warning">No users found.</p>
                        )}
                    </div> */}
                    <div className="block">
                        <p className="title is-4">Recipes:</p>
                        <div className="composition-grid grid is-col-min-16">
                            {recipes.length > 0 ? (
                                recipes.map(
                                    (recipe: {
                                        _id: string;
                                        recipeTitle: string;
                                        recipeText: string;
                                        createdAt: string;
                                        recipeAuthor: string;
                                        tags: string[];
                                    }) => (
                                            <RecipeCard
                                                key={recipe._id}
                                                recipeId={recipe._id}
                                                recipeTitle={recipe.recipeTitle}
                                                recipeText={recipe.recipeText}
                                                recipeAuthor={recipe.recipeAuthor}
                                                createdAt={recipe.createdAt}
                                                tags={recipe.tags}
                                            />
                                    )
                                )
                            ) : (
                                <div className="mb-2">
                                    <p className="tag is-warning">No recipes found.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <RecipeList />
                </>
            )}
            <p className="mt-2">
                Use the left (<kbd>←</kbd>) and right (<kbd>→</kbd>) arrow keys to navigate through recipes.
            </p>
        </>
    );
};

export default ExplorePage;
