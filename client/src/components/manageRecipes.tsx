import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries.js';
import { REMOVE_RECIPE, UPDATE_RECIPE } from '../utils/mutations.js';
import authService from '../utils/auth.js';

const ManageRecipes: React.FC = () => {
    const { loading, error, data, refetch } = useQuery(QUERY_ME);
    const [removeRecipe] = useMutation(REMOVE_RECIPE, {
        onCompleted: () => {
            refetch();
        },
        onError: (err) => {
            console.error('Error removing Recipe:', err);
        },
    });

    const [updateRecipe] = useMutation(UPDATE_RECIPE, {
        onCompleted: () => {
            refetch();
        },
        onError: (err) => {
            console.error('Error updating Recipe:', err);
        },
    });

    const [helperTextStyle, setHelperTextStyle] = useState('help is-hidden');
    const [helperText, setHelperText] = useState('');
    const [editingRecipe, setEditingRecipe] = useState<any>(null);
    const [removingRecipe, setRemovingRecipe] = useState<any>(null);

    const handleRemove = async (recipeId: string) => {
        if (!authService.loggedIn()) {
            return alert('You need to be logged in to remove a poem.');
        }

        try {
            setHelperText('Removing...');
            setHelperTextStyle('help is-warning');

            // Call REMOVE_RECIPE mutation
            await removeRecipe({
                variables: { recipeId }, // Pass the recipe ID to the mutation
            });

            setHelperText('Poem has been removed successfully!');
            setHelperTextStyle('help is-success');
            setRemovingRecipe(null);
        } catch (err) {
            console.error(err);
            setHelperText('An error occurred while removing the recipe.');
            setHelperTextStyle('help is-danger');
        }
    };

    const handleEdit = (recipe: any) => {
        setEditingRecipe(recipe);
    };

    const handleSave = async () => {
        if (!authService.loggedIn()) {
            return alert('You need to be logged in to edit a recipe.');
        }

        try {
            setHelperText('Saving...');
            setHelperTextStyle('help is-warning');

            const variables = {
                recipeId: editingRecipe._id,
                input: {
                    recipeTitle: editingRecipe.recipeTitle,
                    recipeText: editingRecipe.recipeText,
                    recipeAuthor: editingRecipe.recipeAuthor,
                    tags: editingRecipe.tags,
                },
            };

            console.log('Updating Recipe with variables:', variables);

            // Call UPDATE_RECIPE mutation
            const response = await updateRecipe({ variables });

            console.log('Update response:', response);

            setHelperText('Recipe has been updated successfully!');
            setHelperTextStyle('help is-success');
            setEditingRecipe(null);
        } catch (err) {
            console.error('Error updating Recipe:', err);
            setHelperText('An error occurred while updating the recipe.');
            setHelperTextStyle('help is-danger');
        }
    };

    if (loading) return <p>Loading Recipe...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const recipes = data?.me?.recipes ?? [];

    return (
        <div className="manage-recipes">
            {/* DAT P TAG STARTS HERE NOW */}
            <p className={helperTextStyle}>{helperText}</p>
            {/* DAT P TAG ENDS HERE NOW */}
            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {recipes.map((recipe: any) => (
                        <tr key={recipe._id}>
                            <td>{recipe.recipeTitle}</td>
                            <td>{recipe.recipeAuthor}</td>
                            <td>
                                <button className="button is-primary is-small mr-2">
                                    <Link
                                        className="has-text-black"
                                        to={`/recipeDetails/${recipe._id}`}
                                    >
                                        View
                                    </Link>
                                </button>
                                <button
                                    className="button is-info is-small mr-2"
                                    onClick={() => handleEdit(recipe)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="button is-small is-danger"
                                    onClick={() => setRemovingRecipe(recipe)}
                                >
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                {/* the p tag was here before */}
            </table>

            {editingRecipe && (
                <div className="modal is-active">
                    <div className="modal-background"></div>
                    <div className="modal-content">
                        <div className="box">
                            <h2 className="title">Edit Recipe</h2>
                            <div className="field">
                                <label className="label">Title</label>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="text"
                                        value={editingRecipe.recipeTitle}
                                        onChange={(e) =>
                                            setEditingRecipe({
                                                ...editingRecipe,
                                                recipeTitle: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Text</label>
                                <div className="control">
                                    <textarea
                                        className="textarea"
                                        value={editingRecipe.recipeText}
                                        onChange={(e) =>
                                            setEditingRecipe({
                                                ...editingRecipe,
                                                recipeText: e.target.value,
                                            })
                                        }
                                    ></textarea>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Tags</label>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="text"
                                        value={editingRecipe.tags}
                                        onChange={(e) =>
                                            setEditingRecipe({
                                                ...editingRecipe,
                                                tags: e.target.value,
                                            })
                                        }
                                    />
                                    <p className="help">Separate tags with commas</p>
                                </div>
                            </div>
                            <button className="button is-success mr-3" onClick={handleSave}>
                                Save
                            </button>
                            <button
                                className="button"
                                onClick={() => setEditingRecipe(null)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                    <button
                        className="modal-close is-large"
                        aria-label="close"
                        onClick={() => setEditingRecipe(null)}
                    ></button>
                </div>
            )}
            {removingRecipe && (
                <div className="modal is-active">
                    <div className="modal-background"></div>
                    <div className="modal-content">
                        <div className="box">
                            <h2 className="title">Remove Recipe</h2>
                            <p>Are you sure you want to permanently delete the following recipe?</p>
                            <p className="has-text-weight-bold m-4">Recipe Title: {removingRecipe.recipeTitle}</p>
                            <button
                                className="button is-danger mr-3"
                                onClick={() => handleRemove(removingRecipe._id)}
                            >
                                Confirm
                            </button>
                            <button
                                className="button"
                                onClick={() => setRemovingRecipe(null)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                    <button
                        className="modal-close is-large"
                        aria-label="close"
                        onClick={() => setRemovingRecipe(null)}
                    ></button>
                </div>
            )}
        </div>
    );
};

export default ManageRecipes;