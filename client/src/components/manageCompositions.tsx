import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries.js';
import { REMOVE_COMPOSITION } from '../utils/mutations.js';
import authService from '../utils/auth.js';

const ManageCompositions: React.FC = () => {
    const { loading, error, data, refetch } = useQuery(QUERY_ME);
    const [removeComposition] = useMutation(REMOVE_COMPOSITION, {
        onCompleted: () => {
            refetch();
        },
        onError: (err) => {
            console.error('Error removing Composition:', err);
        },
    });

    const [helperTextStyle, setHelperTextStyle] = useState('help is-hidden');
    const [helperText, setHelperText] = useState('');

    const handleRemove = async (compositionId: string) => {
        if (!authService.loggedIn()) {
            return alert('You need to be logged in to remove a poem.');
        }

        try {
            setHelperText('Removing...');
            setHelperTextStyle('help is-warning');

            // Call REMOVE_COMPOSITION mutation
            await removeComposition({
                variables: { compositionId }, // Pass the composition ID to the mutation
            });

            setHelperText('Poem has been removed successfully!');
            setHelperTextStyle('help is-success');
        } catch (err) {
            console.error(err);
            setHelperText('An error occurred while removing the poem.');
            setHelperTextStyle('help is-danger');
        }
    };


    if (loading) return <p>Loading Compositions...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const compositions = data?.me?.compositions ?? [];

    return (
        <div className="manage-compositions">
            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {compositions.map((composition: any) => (
                        <tr key={composition._id}>
                            <td>{composition.compositionTitle}</td>
                            <td>{composition.compositionAuthor}</td>
                            <td>
                                <button className="button is-primary is-small mr-2">
                                    <Link
                                        className="has-text-black"
                                        to={`/compositionDetails/${composition._id}`}
                                    >
                                        View
                                    </Link>
                                </button>
                                <button
                                    className="button is-danger is-small"
                                    onClick={() => handleRemove(composition._id)}
                                >
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <p className={helperTextStyle}>{helperText}</p>
            </table>
        </div>
    );
};

export default ManageCompositions;
