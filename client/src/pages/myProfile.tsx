import React, { useState } from 'react';
import RecipeForm from '../components/recipeForm.js';
// import CompositionList from '../components/compositionList.jsx';
import Auth from '../utils/auth.js';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries.js';
import ManageRecipes from '../components/manageRecipes.js';

const MyProfile: React.FC = () => {
    const [showForm, setShowForm] = useState(false);
    const userEmail = Auth.loggedIn() ? Auth.getProfile()?.data.email : '';
    const { refetch } = useQuery(QUERY_ME);
    // const { data, refetch } = useQuery(QUERY_ME);
    // const [compositions, setCompositions] = useState([]);
    const toggleForm = () => {
        setShowForm((prev) => !prev);
    };
    // useEffect(() => {
    //     if (data?.me?.compositions) {
    //         setCompositions(data.me.compositions);
    //     }
    // }, [data]);
    if (!Auth.loggedIn()) {
        return <p>You need to be logged in to view this page.</p>;
    }

    return (
        <div className="profile-page" style={{ padding: '2rem' }}>
            <p className="title is-3">Welcome, {userEmail}</p>
            <button
                className="button is-primary mb-2"
                onClick={toggleForm}
            >
                {showForm ? 'Hide Form' : 'Add a Recipe'}
            </button>
            {showForm && <RecipeForm refetch={refetch}/>}
            <p className="title is-4">Manage Your Recipes</p>
            <ManageRecipes />
            {/* <p className="title is-4">Your Poems</p>
            <CompositionList compositions={compositions} filterByAuthor={true}/> */}
        </div>
    );
};

export default MyProfile;
