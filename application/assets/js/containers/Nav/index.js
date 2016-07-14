import React, {Component} from 'react';

import './_nav.scss';

export default class Nav extends Component {

    render() {

        return (
            <nav className="c-nav">
                <ul className="c-nav__menu">
                    <li className="c-nav__item">
                        <a href="#" className="c-nav__route">Home</a>
                    </li>
                    <li>
                        <a href="#" className="c-nav__route">Jobs</a>
                    </li>
                    <li>
                        <a href="#" className="c-nav__route">Skills</a>
                    </li>
                </ul>
            </nav>
        );
    }

}

Nav.propTypes = {
};