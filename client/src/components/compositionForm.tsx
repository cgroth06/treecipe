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
{/* <div>  
    <h2>Submission Terms and Conditions</h2>
    <p>By submitting your work to ArtVine, you agree to the following:
        Originality of Work
        You affirm that the work you submit is your original work and does not infringe upon any copyright, trademark, or other intellectual property rights of any third party.
        Copyright Compliance
        You confirm that your submission does not contain material that violates any copyright laws, including but not limited to:
        Work created by someone else without proper authorization.
        Material taken from copyrighted works without the necessary permissions.
        License to Display
        By submitting your work, you grant ArtVine a non-exclusive, royalty-free license to publish and display your work on our platform. You retain full ownership of your work and may withdraw your submission at any time.
        Responsibility for Submissions
        You agree to take full responsibility for the content of your submission, including any legal consequences arising from copyright disputes.
        Indemnification
        You agree to indemnify and hold ArtVine harmless from any claims, damages, or liabilities arising from your submission, including disputes over copyright ownership.
    </p>

    <h3>Submission Agreement</h3>
    <form action="/submit" method="post">
        <input type="checkbox" id="agreement" name="agreement" value="agree">
        <label htmlFor="agreement"> I confirm that the work I am submitting is my original work, and I agree to the submission terms and conditions.</label>
        </input>
    </form>
    
</div> */}