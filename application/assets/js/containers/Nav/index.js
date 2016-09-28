import React, { PureComponent } from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {toggleNavAction} from './actions';

import Burger from '../../components/Burger';

import './_nav.scss';

export class Nav extends PureComponent {

    constructor(props) {
        super(props);
        this.onBurgerClick = this.props.onBurgerClick.bind(this);
    }

    render() {
        const {active} = this.props;
        const navClassName = classNames('c-nav', {'is-active': active});
        const burgerClassName = classNames('c-nav__burger', {'is-active': active});
        return (
            <nav className={navClassName}>
                <Burger className={burgerClassName} onClick={this.onBurgerClick} />
                <ul className="c-nav__menu">
                    <li className="c-nav__item">
                        <a href="#" className="c-nav__route">Home</a>
                    </li>
                    <li className="c-nav__item">
                        <a href="#" className="c-nav__route">Jobs</a>
                    </li>
                    <li className="c-nav__item">
                        <a href="#" className="c-nav__route">Education</a>
                    </li>
                    <li className="c-nav__item">
                        <a href="#" className="c-nav__route">Skills</a>
                    </li>
                    <li className="c-nav__item">
                        <a href="#" className="c-nav__route">Public</a>
                    </li>
                </ul>
            </nav>
        );
    }

}

Nav.propTypes = {
    active: React.PropTypes.bool
};

const mapStateToProps = (state) => ({active: state.activeNav});

const mapDispatchToProps = (dispatch) => ({
    onBurgerClick: () => {
        dispatch(toggleNavAction());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Nav);
