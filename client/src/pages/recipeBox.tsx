import RecipeList from '../components/recipeList.js';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries.js';
// import { getRandomQuote } from '../assets/quotes.js'

const RecipeBox = () => {
    const { loading, error, data } = useQuery(QUERY_ME, {
        fetchPolicy: 'cache-and-network',
    });


    if (loading) return <p className="title is-4 has-text-primary">Loading your recipe box...</p>;
    if (error) return <p className="title is-4 has-text-danger">Error loading your recipe box: {error.message}</p>;

    const savedRecipes = data?.me?.recipeBox || [];

    // const quote = getRandomQuote();

    return (
        <div>
            <section className="hero is-small has-background-primary-dark">
                <div className="hero-body is-flex-direction-column">
                    <p className="title has-text-primary">Your Recipe Box</p>
                    {/* <p className="subtitle">{quote.quote}<br />- {quote.author}</p> */}
                </div>
            </section>
            {savedRecipes.length > 0 ? (
                <RecipeList filterBySaved={true} />
            ) : (
                <p className="subtitle">Your recipe box is empty. Start uploading or collecting your favorite recipes!</p>
            )}
        </div>
    );
};


export default RecipeBox;
