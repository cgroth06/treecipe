import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_COMPOSITIONS } from '../utils/queries';
import Composition from './composition';

const CompositionList: React.FC = () => {
    const { loading, error, data } = useQuery(QUERY_COMPOSITIONS);

    if (loading) return <p>Loading compositions...</p>;
    if (error) return <p>Error loading compositions.</p>;

    return (
        <div className="composition-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', margin: '2rem 0' }}>
            {data.compositions.slice(0, 6).map((composition: any) => (
                <Composition
                    key={composition._id}
                    compositionText={composition.compositionText}
                    compositionAuthor={composition.compositionAuthor}
                    createdAt={composition.createdAt}
                />
            ))}
        </div>
    );
};

export default CompositionList;
