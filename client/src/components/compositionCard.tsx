interface CompositionProps {
    compositionText: string;
    compositionAuthor: string;
    createdAt: string;
}

const Composition: React.FC<CompositionProps> = ({ compositionText, compositionAuthor, createdAt }) => {
    return (
        <div className="composition-card" style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem', borderRadius: '8px' }}>
            <h3>{compositionAuthor}</h3>
            <p>{compositionText}</p>
            <small>Created on: {new Date(createdAt).toLocaleDateString()}</small>
        </div>
    );
};

export default Composition;
