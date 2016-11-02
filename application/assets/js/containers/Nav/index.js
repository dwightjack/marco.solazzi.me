import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { bindProps } from '../../base/utils';
import { toggleNavAction } from './actions';

import Burger from '../../components/Burger';
import { AnchorIco } from '../../components/Anchor';

import social from '../../database/social.json';

import './_nav.scss';

export class Nav extends PureComponent {

    constructor(props) {
        super(props);
        bindProps(this, 'onBurgerClick');
    }

    render() {

        const {active} = this.props;
        const navClassName = classNames('c-nav', {'is-active': active});
        const burgerClassName = classNames('c-nav__burger', {'is-active': active});

        const socialAnchors = social.filter((i) => i.type !== 'pencil').map(({type, url, label}) => (
            <AnchorIco ico={type} link={url} title={label} key={type} />
        ));

        return (
            <nav className={navClassName}>
                <Burger className={burgerClassName} onClick={this.onBurgerClick} />
                <ul className="c-nav__menu">
                    <li className="c-nav__item">
                        <a href="#home" className="c-nav__route">Home</a>
                    </li>
                    <li className="c-nav__item">
                        <a href="#jobs" className="c-nav__route">Jobs</a>
                    </li>
                    <li className="c-nav__item">
                        <a href="#education" className="c-nav__route">Education</a>
                    </li>
                    <li className="c-nav__item">
                        <a href="#skills" className="c-nav__route">Skills</a>
                    </li>
                    <li className="c-nav__item">
                        <a href="#portfolio" className="c-nav__route">Portfolio</a>
                    </li>
                </ul>
                <footer className="c-nav__footer">
                    {socialAnchors}
                </footer>
            </nav>
        );
    }

}

Nav.propTypes = {
    active: React.PropTypes.bool,
    onBurgerClick: React.PropTypes.func
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
