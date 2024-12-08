import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { SEARCH_COMPOSITIONS_AND_USERS } from '../utils/queries';
import SearchBar from '../components/searchBar';
import CompositionCard from '../components/compositionCard';
import CompositionList from '../components/compositionList';

const ExplorePage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();
    const [displaySearchResults, setDisplaySearchResults] = useState(false);
    const [startIndex, setStartIndex] = useState(0);
    const compositionsPerPage = 6;

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const tag = params.get('search');
        if (tag) {
            setSearchQuery(tag);
            setDisplaySearchResults(true);
        }
    }, [location]);

    // Use the search query in a GraphQL query via Apollo Client's useQuery hook
    const { data, loading, error } = useQuery(SEARCH_COMPOSITIONS_AND_USERS, {
        variables: { query: searchQuery },
        skip: !searchQuery,  // Skip the query if searchQuery is empty
    });

    const onSearch = (query: string) => {
        setSearchQuery(query);  // Update the search query when the user types something
        setDisplaySearchResults(true);  // Display search results when the user types something
        setStartIndex(0);  // Reset the start index when the user types something
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (!data?.searchCompositionsAndUsers.compositions) return;

            const totalCompositions = data.searchCompositionsAndUsers.compositions.length;
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
    }, [data]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const compositions = data?.searchCompositionsAndUsers?.compositions?.slice(
        startIndex,
        startIndex + compositionsPerPage
    ) || [];


    return (
        <div >
            <h1>Explore</h1>
            <p>Here you can explore all the work that has been submitted to ArtVine.</p>
            <SearchBar onSearch={onSearch} />

            {displaySearchResults ? (
                <div>
                    <h2>Users:</h2>
                    {data?.searchCompositionsAndUsers?.users?.length > 0 ? (
                        data.searchCompositionsAndUsers.users.map((user: { _id: string; name: string; email: string }) => (
                            <div key={user._id}>
                                <p>{user.name} - {user.email}</p>
                            </div>
                        ))
                    ) : (
                        <p>No users found.</p>
                    )}

                    <h2>Compositions:</h2>
                    <div
                        className="composition-grid"
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                            gap: '1rem',
                            margin: '2rem 0',
                        }}
                    >
                        {compositions.length > 0 ? (
                            compositions.map(
                                (composition: {
                                    _id: string;
                                    compositionTitle: string;
                                    compositionText: string;
                                    createdAt: string;
                                    compositionAuthor: string;
                                    tags: string[];
                                }) => (
                                    <CompositionCard
                                        key={composition._id}
                                        compositionId={composition._id}
                                        compositionTitle={composition.compositionTitle}
                                        compositionText={composition.compositionText}
                                        compositionAuthor={composition.compositionAuthor}
                                        createdAt={composition.createdAt}
                                        tags={composition.tags}
                                    />
                                )
                            )
                        ) : (
                            <p>No compositions found.</p>
                        )}
                    </div>
                </div>
            ) : (
                <>
                    <CompositionList />
                </>
            )}
            <p>
                Use the left (<kbd>←</kbd>) and right (<kbd>→</kbd>) arrow keys to navigate through poems.
            </p>
        </div>
    );
};

export default ExplorePage;
