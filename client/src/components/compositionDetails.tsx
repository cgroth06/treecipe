import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_COMPOSITIONS } from '../utils/queries';
import { SAVE_TO_LIBRARY } from '../utils/mutations';



const CompositionDetails: React.FC = () => {
    const navigate = useNavigate(); //Used to navigate between pages
    const { compositionId } = useParams<{ compositionId: string }>(); // Retrieve the composition ID from the URL


    // Fetch the composition data using the QUERY_COMPOSITION query
    const { loading, error, data } = useQuery(QUERY_COMPOSITIONS, {
        variables: { id: compositionId },
    });


    //Mutation for saving a composition to the library
    const [saveToLibrary] = useMutation(SAVE_TO_LIBRARY, {
        onCompleted: (data) => {
            console.log('Composition saved to library:', data);
            alert('Composition added to your library!');
        },
    });

    //Handle the loading and error states
    if (loading) return <p>Loading composition details...</p>;
    if (error) return <p>Error loading composition: {error.message}</p>;

    const fetchedComposition = data?.composition;

    if (!fetchedComposition) {
        return <p>Composition not found.</p>;
    };

    const { compositionTitle, compositionText, compositionAuthor, createdAt, tags} = fetchedComposition;

    //Handler to save a composition to library
    const handlerSaveToLibrary = async () => {
        try {
            await saveToLibrary({ variables: { compositionId } });
        } catch (err) {
            console.error("Error saving composition", err);
        }
    };


}