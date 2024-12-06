import { Link } from 'react-router-dom';
import { type MouseEvent } from 'react';
import Auth from '../utils/auth';

const Header = () => {
    const logout = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        // Logs the user out by calling the logout method from Auth
        Auth.logout();
    };
    return (
        <header className="bg-primary text-light mb-4 py-3 flex-row align-center">
            <div className="container flex-row justify-space-between-lg justify-center align-center">
                <div>
                    <Link className="text-light" to="/">
<<<<<<< HEAD
                        <h1 className="m-0">ArtVine</h1>
                    </Link>
                    <p className="m-0">Login To Share your work!</p>
=======
                        <h1 className="m-0">Art Vine</h1>
                    </Link>
                    <p className="m-0">KABOOM!</p>
>>>>>>> c0afc415fd38b120b3cdb42d30a52dc6810a146c
                </div>
                <div>
                    {/* Checking if the user is logged in to conditionally render profile link and logout button */}
                    {Auth.loggedIn() ? (
                        <>
                            <Link className="btn btn-lg btn-light m-2" to="/explore">
                                Explore
                            </Link>
                            <br />
                            <Link className="btn btn-lg btn-info m-2" to="/profile">
                                {/* Retrieving the logged-in user's profile to display the username */}
                                {Auth.getProfile().data.email}
                            </Link>
                            <br />
                            <button className="btn btn-lg btn-light m-2" onClick={logout}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link className="btn btn-lg btn-light m-2" to="/explore">
                                Explore
                            </Link>
                            <br />
                            <Link className="btn btn-lg btn-info m-2" to="/login">
                                Login
                            </Link>
                            <br />
                            <Link className="btn btn-lg btn-light m-2" to="/signup">
                                Signup
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
