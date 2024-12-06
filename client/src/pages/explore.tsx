import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { SEARCH_COMPOSITIONS_AND_USERS } from '../utils/queries';
import SearchBar from '../components/searchBar';
import Composition from '../components/compositionCard'; // Import the Composition card component

const ExplorePage = () => {
    const [searchQuery, setSearchQuery] = useState('');

    // Use the search query in a GraphQL query via Apollo Client's useQuery hook
    const { data, loading, error } = useQuery(SEARCH_COMPOSITIONS_AND_USERS, {
        variables: { query: searchQuery },
        skip: !searchQuery,  // Skip the query if searchQuery is empty
    });

    const onSearch = (query: string) => {
        setSearchQuery(query);  // Update the search query when the user types something
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h1>Explore</h1>
            <p>Here you can explore all the work that has been submitted to ArtVine.</p>
            <SearchBar onSearch={onSearch} />

            <div>
                <h2>Users</h2>
                {data?.searchCompositionsAndUsers?.users?.length > 0 ? (
                    data.searchCompositionsAndUsers.users.map((user: { _id: string; name: string; email: string }) => (
                        <div key={user._id}>
                            <p>{user.name} - {user.email}</p>
                        </div>
                    ))
                ) : (
                    <p>No users found.</p>
                )}

                <h2>Compositions</h2>
                {data?.searchCompositionsAndUsers?.compositions?.length > 0 ? (
                    data.searchCompositionsAndUsers.compositions.map((composition: { _id: string; title: string; text: string; createdAt: string; compositionAuthor: string }) => (
                        <Composition
                            key={composition._id}
                            compositionText={composition.text}
                            compositionAuthor={composition.compositionAuthor}
                            createdAt={composition.createdAt}
                        />
                    ))
                ) : (
                    <p>No compositions found.</p>
                )}
            </div>
        </div>
    );
};

export default ExplorePage;
