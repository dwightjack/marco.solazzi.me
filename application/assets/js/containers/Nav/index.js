import React, {Component} from 'react';

import Burger from '../../components/Burger';

import './_nav.scss';

export default class Nav extends Component {

    constructor(props) {
        super(props);

        this.state = {
            active: false
        };

        this.onBurgerClick = function onBurgerClick() {
            this.setState({
                active: !this.state.active
            });
        }.bind(this);
    }

    render() {

        return (
            <nav className={`c-nav${this.state.active ? ' is-active' : ''}`}>
                <Burger onClick={this.onBurgerClick} />
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