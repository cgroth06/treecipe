import { useNavigate, Link } from "react-router-dom";
import React from "react";
import { SAVE_TO_LIBRARY } from "../utils/mutations";
import { useMutation } from "@apollo/client";

export interface CompositionProps {
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
            console.error('Error saving composition:', err);
        }
    };


    const handleTagClick = (tag: string) => {
        navigate(`/explore?search=${encodeURIComponent(tag)}`);
    };

    return (
        <div className="card">
            <div className="card-content">
                <div className="media">
                    <div className="media-content" style={{ height: "70px" }}>
                        <p className="title is-4">{compositionTitle}</p>
                        <p className="subtitle is-6">
                            by <Link to={`/profile/${compositionAuthor}`}>{compositionAuthor}</Link>
                            </p>
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
                                    <div className="tags" style={{ marginTop: '1px', display: 'flex', flexDirection: 'column', }}>
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
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* End of dropdown */}
                </div>
                <div className="content" style={{ height: "330px" }}>
                    <textarea value={compositionText || ''} className="card-textarea textarea has-fixed-size" style={{ minHeight: '100%' }} readOnly />
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
