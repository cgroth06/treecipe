import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_COMPOSITIONS, QUERY_ME } from '../utils/queries.js';
import { REMOVE_COMPOSITION } from '../utils/mutations.js';

const ManageCompositions: React.FC = () => {
    const {loading, error, data, refetch} = useQuery(QUERY_COMPOSITIONS);
    const compositions = data?.compositions || [];
    const [removeComposition] = useMutation(REMOVE_COMPOSITION, {
        onCompleted: () => {
            refetch();
        },
        onError: (err) => {
        console.error('Error removing Composition:', err);
    },
});

const handleRemove = async (compositionId: string) => {
    try {
        await removeComposition({
            variables: {compositionId},
        });
    } catch (err) {
        console.error('Error removing Composition:', err);
    }
};

if (loading) return <p>Loading Compositions...</p>;
if (error) return <p>Error: {error.message}</p>;

return (
    <div className="manage-compositions">
        <h2 className="title is-4">Manage Compositions</h2>
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
        </table>
    </div>
);
};

export default ManageCompositions;
