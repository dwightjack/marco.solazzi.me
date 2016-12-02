import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scrollbar from 'react-smooth-scrollbar';
import classnames from 'classnames';
import { TweenMax, Power2 } from 'gsap';

import { NAV_PATH_HOME } from '../../base/constants';
import Router from '../../router';
import { createRefs, bindAll, shallowEqual, pick } from '../../base/utils';
import { connected as MediaQuery } from '../../components/MediaQuery';
import Footer from '../../components/Footer';

import {
    pagelistScrollUpdateAction
} from './actions';

import './_pagelist.scss';



export class PageList extends Component {

    constructor(props) {
        super(props);
        createRefs(this, 'root', 'scrollbar');
        bindAll(this, 'onScroll', 'mediaQueryCallback', 'updatePageOffsets');
        this.pagesRefs = [];
        this.pages = [];
        this.currentPage = '';
        this.entered = false;
        this.autoScroll = false;
        this.windowHeightOffset = 0;
        this._updateKeys = ['active', 'route'];
    }

    componentWillMount() {
        this.updatePagesRefs();
    }

    componentDidMount() {
        const { route, router } = this.props;
        TweenMax.set(this.root, {autoAlpha: 0, yPercent: 100});
        this.currentPage = route;

        router.listen((nextRoute, prevRoute) => {
            if (nextRoute === '' || nextRoute === NAV_PATH_HOME) {
                return;
            }

            if (prevRoute === '' || prevRoute === NAV_PATH_HOME) {
                //place it at the top
                TweenMax.set(this.root, {autoAlpha: 0, yPercent: 0});
                //scroll (if not doing so, the scrollbar calculations will fail)
                this.scrollTo(nextRoute, {
                    offset: -60,
                    duration: 0
                });
                //enter!
                this.componentWillEnter();
                return;
            }

            this.scrollTo(nextRoute);
        });

    }

    componentWillReceiveProps() {

        if (this.autoScroll === true) {
            return;
        }

        this.pagesRefs.some((child) => {
            if (child.root) {
                const { bottom } = child;
                const isVisible = bottom > this.windowHeightOffset + this.props.pagelistScroll;
                if (isVisible && this.currentPage !== child.props.name) {
                    this.props.onPageChange(child.props.name, true);
                }
                return isVisible;
            }
            return false;
        });
    }

    shouldComponentUpdate(nextProps) {

        const uKeys = this._updateKeys;

        return !shallowEqual(pick(nextProps, uKeys), pick(this.props, uKeys));
    }

    componentWillUpdate(nextProps) {
        // In my scenario pages won't really change so... just in case I'm adding something :P
        if (React.Children.count(this.props.children) !== React.Children.count(nextProps.children)) {
            this.updatePagesRefs();
        }
    }

    componentDidUpdate(prevProps) {
        const { active, route } = this.props;

        this.currentPage = route;

        if (prevProps.active !== active && active === false) {
            this.componentWillLeave();
        }

    }

    onScroll(status) {
        const {y = 0} = status.offset;
        this.props.onScrollCallback(y);
    }

    updatePageOffsets() {
        const { scrollbar } = this.scrollbar;
        const scrollTop = scrollbar ? scrollbar.scrollTop : 0;
        this.windowHeightOffset = parseInt(window.innerHeight * 0.25, 10);
        this.pagesRefs.forEach((child) => {
            if (child.root) {
                const { bottom } = child.root.getBoundingClientRect();
                child.bottom = bottom + scrollTop; //eslint-disable-line no-param-reassign
            }
        });
    }

    componentWillEnter() {
        TweenMax.killTweensOf(this.root);
        TweenMax.set(this.root, {autoAlpha: 1});
        TweenMax.fromTo(this.root, 0.8, {
            yPercent: 100
        }, {
            yPercent: 0,
            delay: 1.2,
            ease: Power2.easeInOut,
            onComplete: () => {
                this.componentDidEnter();
            }
        });
    }

    componentWillAppear() {
        TweenMax.killTweensOf(this.root);
        TweenMax.fromTo(this.root, 0.5, {
            autoAlpha: 0
        }, {
            autoAlpha: 1,
            delay: 0.5,
            ease: Power2.easeInOut,
            onComplete: () => {
                this.componentDidEnter();
            }
        });
    }

    componentDidEnter() {
        this.entered = true;
        this.updatePageOffsets();
        window.addEventListener('resize', this.updatePageOffsets);
        window.addEventListener('orientationchange', this.updatePageOffsets);
    }

    componentWillLeave() {
        this.entered = false;
        window.removeEventListener('resize', this.updatePageOffsets);
        window.removeEventListener('orientationchange', this.updatePageOffsets);

        TweenMax.killTweensOf(this.root);
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

    updatePagesRefs() {
        this.pagesRefs = [];
        let idx = -1;
        this.pages = React.Children.map(this.props.children, (child) => {
            idx += 1;
            return React.cloneElement(child, {
                ref: function compRef(i, component) {
                    this.pagesRefs[i] = component;
                }.bind(this, idx)
            });
        });
    }

    resetScrollbar() {
        const { scrollbar } = this.scrollbar;
        if (scrollbar) {
            scrollbar.stop();
            scrollbar.setPosition(0, 0, true);
        }
        this.props.onScrollCallback(0);
    }

    scrollTo(route, { duration, offset = 0 } = {}) {
        const { scrollbar } = this.scrollbar;

        if (route === NAV_PATH_HOME) {
            this.resetScrollbar();
        } else if (scrollbar) {
            const el = this.root.querySelector(`[name="${route}"]`);
            if (el && scrollbar.isVisible(el) === false) {
                this.autoScroll = true;
                const top = el.getBoundingClientRect().top;
                const scrollToY = top + scrollbar.scrollTop + offset;
                const timing = typeof duration !== 'undefined' ? duration : Math.max(300, parseInt(scrollToY * 0.5, 10));

                scrollbar.scrollTo(0, scrollToY, timing, () => {
                    this.autoScroll = false;
                });

            }
        }
    }

    mediaQueryCallback(breakpoint, mq) {
        if (mq.matchFrom('tablet-landscape')) {
            return (
                <Scrollbar ref={this.scrollbarRef} alwaysShowTracks onScroll={this.onScroll}>
                    {this.pages}
                    <Footer className="c-pagelist__footer" />
                </Scrollbar>
            );
        }

        return (
            <div className="c-pagelist__scroll" ref={this.scrollbarRef}>
                {this.pages}
                <Footer className="c-pagelist__footer" />
            </div>
        );
    }

    render() {

        const {active} = this.props;

        return (
            <section className={classnames('c-pagelist', {'is-active': active})} ref={this.rootRef}>
                <MediaQuery>
                    {this.mediaQueryCallback}
                </MediaQuery>
            </section>
        );
    }
}

PageList.propTypes = {
    children: React.PropTypes.node,
    onScrollCallback: React.PropTypes.func,
    onPageChange: React.PropTypes.func,
    active: React.PropTypes.bool,
    pagelistScroll: React.PropTypes.number,
    route: React.PropTypes.string,
    router: React.PropTypes.instanceOf(Router)
};

PageList.defaultProps = {
    active: false
};

const mapDispatchToProps = (dispatch) => ({
    onScrollCallback(scrollAmount) {
        dispatch(pagelistScrollUpdateAction(scrollAmount));
    }
});

const mapStateToProps = ({route, pagelistScroll}) => ({
    route,
    pagelistScroll
});

export const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(PageList);