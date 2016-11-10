import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scrollbar from 'react-smooth-scrollbar';
import classnames from 'classnames';
import { TweenMax, Power2 } from 'gsap';


import { NAV_PATH_HOME } from '../../base/constants';
import { createRefs } from '../../base/utils';

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
    }

    componentDidMount() {
        if (this.props.active === false) {
            TweenMax.set(this.root, {autoAlpha: 0});
        }
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
            scrollbar.setPosition(0, 0, false);
        } else {
            scrollbar.scrollIntoView(document.querySelector(`[name="${route}"]`), {
                offsetTop: 60
            });
        }
    }

    render() {

        const {children, active, onScrollCallback} = this.props;

        return (
            <main className={classnames('c-pagelist', {'is-active': active})} ref={this.rootRef}>
                <Scrollbar
                    ref={this.scrollbarRef}
                    alwaysShowTracks
                    onScroll={onScrollCallback}
                >
                    {children}
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
    active: React.PropTypes.bool,
    route: React.PropTypes.string
};

PageList.defaultProps = {
    active: false
};

const mapDispatchToProps = (dispatch) => ({
    onScrollCallback({offset}) {
        const scrollAmount = offset ? offset.y : 0;
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