import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scrollbar from 'react-smooth-scrollbar';
import classnames from 'classnames';
import { TweenMax, Power2 } from 'gsap';


import { NAV_PATH_HOME } from '../../base/constants';
import { createRefs, bindAll } from '../../base/utils';

import {
    pagelistScrollUpdateAction
} from './actions';

import { AnchorIco } from '../../components/Anchor';
import social from '../../database/social.json';

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
        if (this.props.active === false) {
            TweenMax.set(this.root, {autoAlpha: 0});
        }
        this.currentPage = this.props.route;
    }

    componentDidUpdate({route, active}) {
        const newActive = this.props.active;
        if (newActive !== active) {
            if (newActive === true) {
                this.componentWillEnter();
            } else {
                this.componentWillLeave();
            }
        }
        if (route !== this.props.route) {
            this.scrollTo(this.props.route);
        }
        this.currentPage = this.props.route;
    }

    onScroll(status, scrollbar) {
        if (this.forcedScrolling === false) {
            this.childRefs.some((child) => {
                if (child.root) {
                    const isVisible = scrollbar.isVisible(child.root);
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

    componentWillEnter() {
        TweenMax.killTweensOf(this.root);
        TweenMax.set(this.root, {autoAlpha: 1});
        TweenMax.fromTo(this.root, 0.8, {
            yPercent: 100
        }, {
            yPercent: 0,
            delay: 1.2,
            ease: Power2.easeInOut
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

    scrollTo(route) {
        const { scrollbar } = this.scrollbar;

        if (route === NAV_PATH_HOME) {
            scrollbar.setPosition(0, 0, true);
            this.props.onScrollCallback(0);
        } else {
            const el = this.root.querySelector(`[name="${route}"]`);
            if (scrollbar.isVisible(el) === false) {
                const top = el.getBoundingClientRect().top;
                this.forcedScrolling = true;
                scrollbar.scrollTo(0, top + scrollbar.scrollTop, 300, () => {
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
                        {social.filter((i) => i.type !== 'pencil').map(({type, url, label}) => (
                            <AnchorIco ico={type} link={url} title={label} key={type} />
                        ))}
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