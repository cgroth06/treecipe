import { Link } from 'react-router-dom';
// import axios from 'axios';
import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries.js';
import { REMOVE_RECIPE, UPDATE_RECIPE } from '../utils/mutations.js';
import authService from '../utils/auth.js';
import { uploadImageToS3 } from '../utils/uploadImage.js';
// import { set } from 'mongoose';

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

    const [uploadError, setUploadError] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleRemove = async (recipeId: string) => {
        if (!authService.loggedIn()) {
            return alert('You need to be logged in to remove a recipe.');
        }

        try {
            setHelperText('Removing...');
            setHelperTextStyle('help is-warning');

            // Call REMOVE_RECIPE mutation
            await removeRecipe({
                variables: { recipeId }, // Pass the recipe ID to the mutation
            });

            setHelperText('Recipe has been removed successfully!');
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

            let photoUrl = editingRecipe.photoUrl; // Preserve the existing photo URL if not uploading a new image.

            // If a new image was selected, handle the upload
            if (editingRecipe.newImage) {
                const uploadResult = await uploadImageToS3(editingRecipe.newImage);
                if (uploadResult) {
                    photoUrl = uploadResult; // Extract the URL without query params
                    console.log('Uploaded photo URL:', photoUrl);
                } else {
                    console.error('Error uploading image');
                    setHelperText('An error occurred while uploading the image.');
                    setHelperTextStyle('help is-danger');
                    return;
                }
            }

            console.log('Editing Recipe before save:', editingRecipe);

            const variables = {
                recipeId: editingRecipe._id,
                input: {
                    recipeTitle: editingRecipe.recipeTitle,
                    recipeText: editingRecipe.recipeText,
                    recipeAuthor: editingRecipe.recipeAuthor,
                    tags: editingRecipe.tags,
                    photoUrl, // Use the updated photoUrl
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

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const validFileTypes = ['image/jpeg', 'image/png', 'image/jpg'];

        if (!authService.loggedIn()) {
            return alert('You need to be logged in to upload an image.');
        }
        const files = e.target.files;
        if (!files) {
            setUploadError('No file selected');
            return;
        }
        const file = files[0];

        if (!validFileTypes.find(type => type === file.type)) {
            setUploadError('File must be in JPG/PNG format');
            return;
        }

        setUploadError(''); // Clear previous errors

        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);

        setEditingRecipe({
            ...editingRecipe,
            newImage: file, // Save the selected file to be uploaded later
        });
    };

    if (loading) return <p>Loading Recipe...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const recipes = data?.me?.recipes ?? [];

    return (
        <div className="manage-recipes">
            {/* Display helper text */}
            <p className={helperTextStyle}>{helperText}</p>

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
                                <label className="label">Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    id="file"
                                    style={{ display: 'none' }}
                                    onChange={handleUpload}
                                />
                                <button className="button is-success mr-3" onClick={() => document.getElementById('file')?.click()}>Upload Image</button>
                                {uploadError && (
                                    <p className="help is-danger">{uploadError}</p>
                                )}
                                {/* Display image preview if available */}
                                {imagePreview && (
                                    <div>
                                        <p>Selected Image:</p>
                                        <img src={imagePreview} alt="Selected" style={{ maxWidth: '200px', marginTop: '10px' }} />
                                    </div>
                                )}
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
