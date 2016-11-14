import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scrollbar from 'react-smooth-scrollbar';
import classnames from 'classnames';
import { TweenMax, Power2 } from 'gsap';


import { NAV_PATH_HOME, NAV_PATH_JOBS } from '../../base/constants';
import { createRefs, bindAll } from '../../base/utils';

import {
    pagelistScrollUpdateAction
} from './actions';

import './_pagelist.scss';

export class PageList extends Component {

    constructor(props) {
        super(props);
        createRefs(this, 'root', 'scrollbar');
        bindAll(this, 'onScroll');
        this.childRefs = [];
        this.forcedScrolling = false;
        this.currentPage = '';
    }

    componentDidMount() {
        const { active, route } = this.props;
        if (active === false) {
            TweenMax.set(this.root, {autoAlpha: 0});
        } else {
            this.scrollTo(route, {
                offset: window.innerHeight * -1,
                duration: 0
            });
            this.componentWillEnter();
        }
        this.currentPage = route;
    }

    componentDidUpdate({route}) {
        const newActive = this.props.active;

        this.currentPage = this.props.route;

        if (newActive && route !== this.props.route) {

            if (route === '' || route === NAV_PATH_HOME) {
                this.scrollTo(this.props.route, {
                    offset: window.innerHeight * -1,
                    duration: 0
                });
                this.componentWillEnter();
                return;
            }
            this.scrollTo(this.props.route);
            return;
        }

        if (newActive === false) {
            this.componentWillLeave();
        }

    }

    onScroll(status) {
        if (this.forcedScrolling === false) {
            const windowHeight = parseInt(window.innerHeight * 0.25, 10);
            this.childRefs.some((child) => {
                if (child.root) {
                    const { bottom } = child.root.getBoundingClientRect();
                    const isVisible = bottom > windowHeight;//scrollbar.isVisible(child.root);
                    if (isVisible && this.currentPage !== child.props.name) {
                        this.props.onPageChange(child.props.name);
                    }
                    return isVisible;
                }
                return false;
            });
        }

        const {y = 0} = status.offset;
        this.props.onScrollCallback(y);
    }

    componentWillEnter(callback) {
        TweenMax.killTweensOf(this.root);
        TweenMax.set(this.root, {autoAlpha: 1});
        TweenMax.fromTo(this.root, 0.8, {
            yPercent: 100
        }, {
            yPercent: 0,
            delay: 1.2,
            ease: Power2.easeInOut,
            onComplete: callback
        });
    }

    componentWillLeave() {
        TweenMax.fromTo(this.root, 0.8, {
            yPercent: 0
        }, {
            yPercent: 100,
            ease: Power2.easeOut,
            onComplete: () => {
                TweenMax.set(this.root, {autoAlpha: 0});
            }
        });
    }

    resetScrollbar() {
        const { scrollbar } = this.scrollbar;
        scrollbar.stop();
        scrollbar.setPosition(0, 0, true);
        this.props.onScrollCallback(0);
    }

    scrollTo(route, { duration, offset = 0 } = {}) {
        const { scrollbar } = this.scrollbar;

        if (route === NAV_PATH_HOME) {
            this.resetScrollbar();
        } else {
            const el = this.root.querySelector(`[name="${route}"]`);
            if (scrollbar.isVisible(el) === false) {
                const top = el.getBoundingClientRect().top;
                this.forcedScrolling = true;
                const scrollToY = top + scrollbar.scrollTop + offset;
                const timing = typeof duration !== 'undefined' ? duration : Math.max(300, parseInt(scrollToY * 0.5, 10));

                scrollbar.scrollTo(0, scrollToY, timing, () => {
                    this.forcedScrolling = false;
                });

            }
        }
    }

    render() {

        const {children, active} = this.props;

        this.childRefs = [];
        let idx = -1;
        const newChildren = React.Children.map(children, (child) => {
            idx += 1;
            return React.cloneElement(child, {
                ref: function compRef(i, component) { //eslint-disable-line react/jsx-no-bind
                    this.childRefs[i] = component;
                }.bind(this, idx)
            });
        });

        return (
            <main className={classnames('c-pagelist', {'is-active': active})} ref={this.rootRef}>
                <Scrollbar
                    ref={this.scrollbarRef}
                    alwaysShowTracks
                    onScroll={this.onScroll}
                >
                    {newChildren}
                    <footer className="c-pagelist__footer">
                        &copy; {new Date().getFullYear()} Marco Solazzi - <a href="#" target="_blank" rel="noopener noreferrer">license</a> <a href="#" target="_blank" rel="noopener noreferrer">source</a>
                    </footer>
                </Scrollbar>
            </main>
        );
    }
}

PageList.propTypes = {
    children: React.PropTypes.node,
    onScrollCallback: React.PropTypes.func,
    onPageChange: React.PropTypes.func,
    active: React.PropTypes.bool,
    route: React.PropTypes.string
};

PageList.defaultProps = {
    active: false
};

const mapDispatchToProps = (dispatch) => ({
    onScrollCallback(scrollAmount) {
        dispatch(pagelistScrollUpdateAction(scrollAmount));
    }
});

const mapStateToProps = (state) => ({
    route: state.route
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PageList);