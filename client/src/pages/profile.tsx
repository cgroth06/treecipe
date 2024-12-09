import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

const ProfilePage: React.FC = () => {
    const { name } = useParams<{ name: string }>();
    const { loading, error, data } = useQuery(QUERY_USER, {
        variables: { name },
    });

    if (loading) return <p>Loading profile...</p>;
    if (error) return <p>Error loading profile: {error.message}</p>;

    const user = data?.user;

    return (
        <div>
            <h1>{user.name}</h1>
            <h2>Compositions</h2>
            <ul>
                {user.compositions.map((composition: any) => (
                    <li key={composition._id}>
                        <h3>{composition.compositionTitle}</h3>
                        <p>{composition.compositionText}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProfilePage;
