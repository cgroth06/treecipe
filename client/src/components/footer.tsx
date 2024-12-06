import { Link, useLocation, useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (window.history.length > 1) { // Check if there is a previous page in the history stack
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <footer className="w-100 mt-auto bg-secondary p-4">
      <div className="container text-center mb-5">
        {location.pathname !== '/' && (
          <button
            className="btn btn-dark mb-3"
            onClick={handleGoBack}
          >
            &larr; Go Back
          </button>
        )}
        <nav>
          <Link className="Home1" to="./Home">
            Home
          </Link>
          <Link className="AboutArtVine1" to="/AboutArtVine1">
            About ArtVine
          </Link>
          <Link className="Contact1" to="https://github.com/EthanForrestCarr/ArtVine/graphs/contributors">
            Contact
          </Link>
        </nav>
        <h4>
          Made with{' '}
          <span
            className="emoji"
            role="img"
            aria-label="heart"
            aria-hidden="false"
          >
            ❤️
          </span>{' '}
          by the Tech Thoughts team.
        </h4>
      </div>
    </footer>
  );
};

export default Footer;
