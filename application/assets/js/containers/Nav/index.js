import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import {
    NAV_PATH_HOME,
    NAV_PATH_JOBS,
    NAV_PATH_EDUCATION,
    NAV_PATH_SKILLS,
    NAV_PATH_PORTFOLIO
} from '../../base/constants';
import { createRefs, getPseudoContent, bindAll } from '../../base/utils';
import { toggleNavAction } from './actions';

import Burger from '../../components/Burger';
import { AnchorIco } from '../../components/Anchor';

import social from '../../database/social.json';

import './_nav.scss';

const filters = ['linkedin', 'twitter', 'github'];
const navSocials = social.filter(({type}) => filters.indexOf(type) !== -1);

export class Nav extends PureComponent {

    constructor(props) {
        super(props);
        bindAll(this, 'goTo', 'onBurgerClick', 'closeNav');
        createRefs(this, 'root');

        this.state = {
            navState: 'closed'
        };

        this.timeouts = {
            idx: null
        };

        this.paths = [
            {
                path: NAV_PATH_HOME,
                label: 'Home'
            },
            {
                path: NAV_PATH_JOBS,
                label: 'Jobs'
            },
            {
                path: NAV_PATH_EDUCATION,
                label: 'Education'
            },
            {
                path: NAV_PATH_SKILLS,
                label: 'Skills'
            },
            {
                path: NAV_PATH_PORTFOLIO,
                label: 'Portfolio'
            }
        ];
    }

    componentWillReceiveProps({active}) {
        if (active !== this.props.active) {
            if (active === true) {
                this.navTransition('entering', 'opened');
            } else {
                this.navTransition('leaving', 'closed');
            }
        }
    }

    onBurgerClick() {
        this.props.toggleNav();
    }

    getTimeout(transition) {
        const { timeouts } = this;
        if (timeouts[transition]) {
            return timeouts[transition];
        }
        const pseudo = getPseudoContent(this.root, transition === 'entering' ? '::after' : '::before', parseInt);
        this.timeouts[transition] = pseudo;
        return pseudo;
    }

    closeNav(e) {
        if (e.key === 'Escape') {
            this.props.toggleNav(false);
        }
    }

    navTransition(transition, final) {
        const timeout = this.getTimeout(transition);

        if (this.timeouts.idx !== null) {
            clearTimeout(this.timeouts.idx);
        }

        this.setState({navState: transition}, () => {

            this.timeouts.idx = setTimeout(() => {
                this.setState({navState: final});
                this.timeouts.idx = null;
            }, timeout);

        });
    }

    goTo(e) {
        e.preventDefault();
        const hash = e.target.getAttribute('href');
        this.props.toggleNav(false);

        setTimeout(() => {

            this.props.onNavItemClick(hash);

        }, this.getTimeout('leaving') + 300);


    }

    render() {

        const { active, className, route } = this.props;
        const { navState } = this.state;
        const navClassName = classNames('c-nav', className, {'is-active': active}, `is-${navState}`);
        const burgerClassName = classNames('c-nav__burger', {'is-active': active});
        const tabIndex = active ? 0 : -1;

        const socialAnchors = navSocials.map(({type, url, label}) => (
            <AnchorIco ico={type} link={url} title={label} key={type} tabIndex={tabIndex} />
        ));
        /* eslint-disable jsx-a11y/no-static-element-interactions */
        return (
            <nav className={navClassName} ref={this.rootRef} role="navigation" onKeyUp={this.closeNav}>
                <Burger className={burgerClassName} onClick={this.onBurgerClick} active={active} controls="nav-menu" />
                <ul className="c-nav__menu" id="nav-menu">
                    {this.paths.map(({path, label}) => (
                        <li className={classNames('c-nav__item', {'is-current': (route === path)})} key={path}>
                            <a href={path} onClick={this.goTo} className="c-nav__route" tabIndex={tabIndex}>{label}</a>
                        </li>
                    ))}
                </ul>
                <footer className="c-nav__footer">
                    {socialAnchors}
                </footer>
            </nav>
        );
        /* eslint-enable jsx-a11y/no-static-element-interactions */
    }

}

Nav.propTypes = {
    className: React.PropTypes.string,
    active: React.PropTypes.bool,
    route: React.PropTypes.string,
    onNavItemClick: React.PropTypes.func,
    toggleNav: React.PropTypes.func //eslint-disable-line react/no-unused-prop-types
};

const mapStateToProps = (state) => ({
    active: state.activeNav,
    route: state.route
});

const mapDispatchToProps = (dispatch) => ({
    toggleNav(toggle) {
        dispatch(toggleNavAction(toggle));
    }
});

export const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(Nav);
