import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_COMPOSITION } from '../utils/mutations';
import Auth from '../utils/auth';

const CompositionForm: React.FC = () => {
    const [compositionText, setCompositionText] = useState('');
    const [addComposition] = useMutation(ADD_COMPOSITION);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!Auth.loggedIn()) {
            return alert('You need to be logged in to submit a poem.');
        }

        try {
            const { data } = await addComposition({
                variables: {
                    compositionText,
                },
            });
            setCompositionText(''); // Reset form
            alert('Poem added successfully!');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ margin: '2rem 0' }}>
            <textarea
                value={compositionText}
                onChange={(e) => setCompositionText(e.target.value)}
                placeholder="Write your poem here..."
                rows={5}
                style={{ width: '100%', padding: '1rem' }}
                required
            ></textarea>
            <button type="submit" style={{ marginTop: '1rem', padding: '0.5rem 2rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
                Submit
            </button>
        </form>
    );
};

export default CompositionForm;
