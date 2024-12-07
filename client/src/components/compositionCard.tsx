interface CompositionProps {
    compositionTitle: string;
    compositionText: string;
    compositionAuthor: string;
    createdAt: string;
}

const CompositionCard: React.FC<CompositionProps> = ({ compositionTitle, compositionText, compositionAuthor, createdAt }) => {
    return (
        // <div className="composition-card" style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem', borderRadius: '8px' }}>
        //     <h3>{compositionAuthor}</h3>
        //     <p>{compositionText}</p>
        //     <small>Created on: {new Date(createdAt).toLocaleDateString()}</small>
        // </div>
        <div className="card">
            <div className="card-content">
                <div className="media">
                    <div className="media-content" style={{height: "70px"}}>
                        <p className="title is-4 has-text-primary">{compositionTitle}</p>
                        <p className="subtitle is-6 has-text-primary-30">by {compositionAuthor}</p>
                    </div>
                    {/* Start of dropdown */}
                    <div className="media-right">
                        <div className="dropdown is-hoverable">
                            <div className="dropdown-trigger">
                                <button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
                                    <span>#</span>
                                </button>
                            </div>
                            <div className="dropdown-menu" id="dropdown-menu" role="menu">
                                <div className="dropdown-content">
                                    <div className="dropdown-content">
                                        <a href="#" className="dropdown-item"> More Details </a>
                                        <a href="#" className="dropdown-item"> Author Page </a>
                                        <hr className="dropdown-divider" />
                                        <a href="#" className="dropdown-item"> Collect </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* End of dropdown */}
                </div>
                <div className="content" style={{ height: "330px" }}>
                    <textarea className="textarea has-fixed-size" style={{ minHeight: '100%' }} readOnly>
                        {compositionText}
                    </textarea>
                </div>
            </div>
            <footer className="card-footer has-background-primary-30">
                <a href="#" className="card-footer-item has-text-primary-invert">Details</a>
                <a href="#" className="card-footer-item has-text-primary-invert">Author</a>
                <a href="#" className="card-footer-item has-text-primary-invert">Collect</a>
            </footer>
        </div>
    );
};

export default CompositionCard;
