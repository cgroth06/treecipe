import React from 'react';
import logo from '../assets/stool.png';

const Footer: React.FC = () => {
  return (
    <footer className="footer is-flex-align-items-flex-end">
      <div className="content has-text-centered">
        <img src={logo} alt="Treecipe Logo" style={{ width: '50px', height: 'auto'}} />
        <p>
          Content copyright &copy; {new Date().getFullYear()} by Treecipe. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
