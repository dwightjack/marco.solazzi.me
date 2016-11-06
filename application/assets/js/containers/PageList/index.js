import React, { Component } from 'react';
import Scrollbar from 'react-smooth-scrollbar';
import classnames from 'classnames';
import { TweenMax, Power2 } from 'gsap';


import { NAV_PATH_HOME } from '../../base/constants';
import { createRefs } from '../../base/utils';

import './_pagelist.scss';

class PageList extends Component {

    constructor(props) {
        super(props);
        createRefs(this, 'root', 'scrollbar');
    }

    componentDidUpdate({route}) {
        if (route !== this.props.route) {
            this.scrollTo(this.props.route);
        }
    }

    componentWillEnter(callback) {
        TweenMax.fromTo(this.root, 0.8, {
            yPercent: 100
        }, {
            yPercent: 0,
            delay: 1.2,
            ease: Power2.easeInOut,
            clearProps: 'all',
            onComplete: callback
        });
    }

    componentWillLeave(callback) {
        TweenMax.fromTo(this.root, 0.8, {
            yPercent: 0
        }, {
            yPercent: 100,
            ease: Power2.easeOut,
            onComplete: callback
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
    onScrollCallback: () => {},
    active: false
};

export default PageList;