import React from 'react';
import classnames from 'classnames';

const Footer = ({className}) => (
    <footer role="contentinfo" className={classnames('o-footer', className)}>
        &copy; {new Date().getFullYear()} Marco Solazzi - <a href="https://github.com/dwightjack/marco.solazzi.me/blob/master/LICENSE" target="_blank" rel="noopener noreferrer">license</a> <a href="https://github.com/dwightjack/marco.solazzi.me" target="_blank" rel="noopener noreferrer">source</a>
    </footer>
);

Footer.propTypes = {
    className: React.PropTypes.string
};

export default Footer;