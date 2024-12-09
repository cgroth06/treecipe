import CompositionList from '../components/compositionList';

const Library: React.FC = () => {
    return (
        <div>
            <h1>Your Library</h1>
            <CompositionList filterBySaved={true} />
        </div>
    );
};

export default Library;
