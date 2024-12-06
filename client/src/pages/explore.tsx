import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_USER, QUERY_ME } from '../utils/queries';


const ExplorePage = () => {
    const { email: userParam } = useParams();

    const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
        variables: { email: userParam },
    });
    

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Explore</h1>
            <p>Here you can explore all the work that has been submitted to ArtVine.</p>
        </div>
    );
}

export default ExplorePage;