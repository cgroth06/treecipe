import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_COMPOSITIONS, QUERY_ME } from '../utils/queries';
import Composition from './compositionCard';

interface CompositionProps {
    _id: string;
    compositionTitle: string;
    compositionText: string;
    compositionAuthor: string;
    createdAt: string;
}

interface CompositionListProps {
    filterByAuthor?: boolean; // Determines if we filter by the logged-in user
}

const CompositionList: React.FC<CompositionListProps> = ({ filterByAuthor }) => {
    const [displayedCompositions, setDisplayedCompositions] = useState<CompositionProps[]>([]);
    const [startIndex, setStartIndex] = useState(0);
    const compositionsPerPage = 6;

    // Use the appropriate query
    const { loading, error, data } = useQuery(filterByAuthor ? QUERY_ME : QUERY_COMPOSITIONS);

    // Update displayed compositions
    useEffect(() => {
        if (!data) return;

        const compositions = filterByAuthor
            ? data.me?.compositions ?? []
            : data.compositions ?? [];

        setDisplayedCompositions(compositions.slice(startIndex, startIndex + compositionsPerPage));
    }, [data, startIndex, filterByAuthor]);

    // Handle cycling compositions with arrow keys (only for non-filtered lists)
    useEffect(() => {
        if (!filterByAuthor) {
            const handleKeyDown = (event: KeyboardEvent) => {
                if (!data?.compositions) return;

                const totalCompositions = data.compositions.length;
                if (event.key === 'ArrowRight') {
                    setStartIndex((prev) =>
                        Math.min(prev + compositionsPerPage, totalCompositions - compositionsPerPage)
                    );
                } else if (event.key === 'ArrowLeft') {
                    setStartIndex((prev) => Math.max(prev - compositionsPerPage, 0));
                }
            };

            window.addEventListener('keydown', handleKeyDown);
            return () => {
                window.removeEventListener('keydown', handleKeyDown);
            };
        }
    }, [data, filterByAuthor]);

    if (loading) return <p>Loading compositions...</p>;
    if (error) return <p>Error loading compositions.</p>;

    return (
        <div
            className="composition-grid"
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1rem',
                margin: '2rem 0',
            }}
        >
            {displayedCompositions.map((composition) => (
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
