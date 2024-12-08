import { useNavigate } from "react-router-dom";
import React from "react";
import { SAVE_TO_LIBRARY } from "../utils/mutations";
import { useMutation } from "@apollo/client";

interface CompositionProps {
    compositionId: string;
    compositionTitle: string;
    compositionText: string;
    compositionAuthor: string;
    createdAt: string;
    tags: string[];
}

const CompositionCard: React.FC<CompositionProps> = ({ compositionId, compositionTitle, compositionText, compositionAuthor, tags }) => {
    const navigate = useNavigate();

    const [saveToLibrary] = useMutation(SAVE_TO_LIBRARY, {
        onCompleted: (data) => {
            console.log('Composition saved to library:', data);
            alert('Composition added to your library!');
        },
    });

    const handleSaveClick = async () => {
        try {
            await saveToLibrary({ variables: { compositionId } });
        } catch (err) {
            console.error('Error 1 saving composition:', err);
            if (err instanceof Error) {
                alert('Failed 2 to save the composition. ' + err.message);
            } else {
                alert('Failed 3 to save the composition.');
            }
        }
    };


    const handleTagClick = (tag: string) => {
        navigate(`/explore?search=${encodeURIComponent(tag)}`);
    };

    return (
        // <div className="composition-card" style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem', borderRadius: '8px' }}>
        //     <h3>{compositionAuthor}</h3>
        //     <p>{compositionText}</p>
        //     <small>Created on: {new Date(createdAt).toLocaleDateString()}</small>
        // </div>
        <div className="card">
            <div className="card-content">
                <div className="media">
                    <div className="media-content" style={{ height: "70px" }}>
                        <p className="title is-4 has-text-primary">{compositionTitle}</p>
                        <p className="subtitle is-6 has-text-primary-30">by {compositionAuthor}</p>
                    </div>
                    {/* Start of dropdown */}
                    <div className="media-right">
                        <div className="dropdown is-hoverable">
                            <div className="dropdown-trigger">
                                <button id="dropdown-button" className="button" aria-haspopup="true" aria-controls="dropdown-menu">
                                    <span>#</span>
                                </button>
                            </div>
                            <div className="dropdown-menu" id="dropdown-menu" role="menu" style={{ right: 0, left: 'auto', maxWidth: '300px', overflow: 'auto' }}>
                                <div className="dropdown-content">
                                    <div className="tags" style={{ marginTop: '10px', display: 'flex', flexDirection: 'column' }}>
                                        {tags && tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="tag is-link"
                                                style={{ margin: '0 5px', cursor: 'pointer' }}
                                                onClick={() => handleTagClick(tag)}
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* End of dropdown */}
                </div>
                <div className="content" style={{ height: "330px" }}>
                    <textarea className="card-textarea textarea has-fixed-size" style={{ minHeight: '100%' }} readOnly>
                        {compositionText}
                    </textarea>
                </div>
            </div>
            <footer className="card-footer has-background-primary-30">
                <a href="#" className="card-footer-item has-text-primary-invert">Details</a>
                <a href="#" className="card-footer-item has-text-primary-invert">Author</a>
                <button onClick={handleSaveClick} className="card-footer-item has-text-primary-invert">Collect</button>
            </footer>
        </div>
    );
};

export default CompositionCard;
