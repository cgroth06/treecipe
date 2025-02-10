import { useNavigate, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { SAVE_TO_RECIPEBOX, REMOVE_FROM_RECIPEBOX } from "../utils/mutations";
import { useMutation, useQuery } from "@apollo/client";
import { useAuth } from "../utils/auth"; // Custom hook to get user info
import { CHECK_RECIPEBOX_STATUS } from "../utils/queries"; // Query to check if recipe is in the RecipeBox

interface RecipeProps {
    recipeId: string;
    recipeTitle: string;
    recipeText: string;
    recipeAuthor: string;
    createdAt: string;
    tags: string[];
}

const RecipeCard: React.FC<RecipeProps> = ({
    recipeId,
    recipeTitle,
    recipeText,
    recipeAuthor,
    tags,
}) => {
    const navigate = useNavigate();
    const { profile: user } = useAuth() as { profile: { recipes: string[] } | null }; // Get logged-in user info
    const [inRecipeBox, setInRecipeBox] = useState(false); // Local state for recipe box status

    // Fetch initial Recipe Box status
    const { data, loading: recipeBoxLoading, refetch } = useQuery(CHECK_RECIPEBOX_STATUS, {
        variables: { recipeId },
        skip: !user, // Skip query if the user is not logged in
        fetchPolicy: "network-only", // Always fetch fresh data from the server
    });

    useEffect(() => {
        if (data?.checkRecipeBoxStatus) {
            setInRecipeBox(data.checkRecipeBoxStatus.inRecipeBox);
        }
    }, [data]);

    // Mutations for adding and removing recipes
    const [saveToRecipeBox] = useMutation(SAVE_TO_RECIPEBOX, {
        onCompleted: () => {
            setInRecipeBox(true); // Update local state
            // alert("Recipe added to your Recipe Box!");
            refetch(); // Refetch the Recipe Box status after mutation
        },
        onError: (err) => console.error("Error adding recipe:", err),
    });

    const [removeFromRecipeBox] = useMutation(REMOVE_FROM_RECIPEBOX, {
        onCompleted: () => {
            setInRecipeBox(false); // Update local state
            // alert("Recipe removed from your Recipe Box!");
            refetch(); // Refetch the Recipe Box status after mutation
        },
        onError: (err) => console.error("Error removing recipe:", err),
    });

    const handleRecipeBoxAction = async () => {
        try {
            if (inRecipeBox) {
                await removeFromRecipeBox({ variables: { recipeId } });
            } else {
                await saveToRecipeBox({ variables: { recipeId } });
            }
        } catch (err) {
            console.error("Error updating Recipe Box status:", err);
        }
    };

    // const handleEditClick = () => {
    //     navigate(`/editRecipe/${RecipeId}`);
    // };

    const handleTagClick = (tag: string) => {
        navigate(`/explore?search=${encodeURIComponent(tag)}`);
    };

    return (
        <div className="cell">
            <div className="card">
                <div className="card-content">
                    <div className="media">
                        <div className="media-content" style={{ height: "70px" }}>
                            <p className="title is-4">{recipeTitle}</p>
                            <p className="subtitle is-6">by {recipeAuthor}</p>
                        </div>
                        <div className="media-right">
                            <div className="dropdown is-hoverable is-right">
                                <div className="dropdown-trigger">
                                    <button
                                        id="dropdown-button"
                                        className="button"
                                        aria-haspopup="true"
                                        aria-controls="dropdown-menu"
                                    >
                                        <span>#</span>
                                    </button>
                                </div>
                                <div className="dropdown-menu is-right" id="dropdown-menu" role="menu">
                                    <div className="dropdown-content is-shadowless">
                                        {tags && tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="dropdown-item"
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => handleTagClick(tag)}
                                            >
                                                #{tag}<br></br>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content" style={{ height: "330px" }}>
                        <textarea
                            className="card-textarea textarea has-fixed-size"
                            style={{ minHeight: "100%" }}
                            readOnly
                            value={recipeText}
                        />

                    </div>
                </div>
                <footer className="card-footer has-background-primary-30">
                    <Link
                        to={`/recipeDetails/${recipeId}`}
                        className="card-footer-item"
                    >
                        View Recipe
                    </Link>
                    <button
                        onClick={handleRecipeBoxAction}
                        className="card-footer-item"
                        disabled={recipeBoxLoading}
                    >
                        {recipeBoxLoading
                            ? "Loading..."
                            : inRecipeBox
                                ? "Remove from RecipeBox"
                                : "Add to RecipeBox"}
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default RecipeCard;
