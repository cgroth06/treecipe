import { Link } from 'react-router-dom';
import { type MouseEvent } from 'react';
import Auth from '../utils/auth';
import LogoImage from '../assets/ArtVine_transparent.png';

const Header = () => {
    const logout = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        // Logs the user out by calling the logout method from Auth
        Auth.logout();
    };
    return (
        <header className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item">
                    <img src={LogoImage}></img>
                </a>
            </div>
            <div className="container flex-row justify-space-between-lg justify-center align-center">
                <div>
                    <Link className="text-light" to="/">
                        <h1 className="m-0">ArtVine</h1>
                    </Link>
                    <p className="m-0">Login To Share your work!</p>
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
