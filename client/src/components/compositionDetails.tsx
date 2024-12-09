import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_COMPOSITIONS } from '../utils/queries';
import { SAVE_TO_LIBRARY } from '../utils/mutations';
import dayjs from 'dayjs';



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

    const { compositionTitle, compositionText, compositionAuthor, createdAt, tags } = fetchedComposition;

    //Handler to save a composition to library
    const handleSaveToLibrary = async () => {
        try {
            await saveToLibrary({ variables: { compositionId } });
        } catch (err) {
            console.error("Error saving composition", err);
        }
    };

    //Handler to handle filtering logic by tag
    const handleTagClick = (tag: string) => {
        navigate(`/explore?search=${encodeURIComponent(tag)}`);
    };

    // Handle the back button functionality
    const handleBackButton = () => {
        navigate(-1); // Go back to the previous page
    };

    return (
        
        <div className="composition-detail">
            <h2 className="title">{compositionTitle}</h2>
            <div className="content">
                <p>By: {compositionAuthor}</p>
                <p className="has-text-grey">
                    Created on {dayjs(createdAt).format('MMMM D, YYYY')}
                </p>
            </div>

            {/* Displays composition content  */}
            <div className="text-content">
                <p>{compositionText}</p>
            </div>

            {/* Tags Section */}
            <div className="tags">
                {tags && tags.map((tag, index) => (
                    <span
                        key={index}
                        className="tag is-primary is-light"
                        style={{ margin: '0 5px', cursor: 'pointer' }}
                        onClick={() => handleTagClick(tag)}
                    >
                        #{tag}
                    </span>
                ))}
            </div>

            {/* Filtered Compositions based on the search term */}
            
        </div>
    )

}