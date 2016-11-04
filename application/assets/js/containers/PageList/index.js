import React, { Component } from 'react';
import Scrollbar from 'react-smooth-scrollbar';
import classnames from 'classnames';
import { TweenMax, Power2 } from 'gsap';


import { createRefs } from '../../base/utils';

import './_pagelist.scss';


class PageList extends Component {

    constructor(props) {
        super(props);
        createRefs(this, 'root');
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

    render() {

        const {children, active, onScrollCallback} = this.props;

        return (
            <main className={classnames('c-pagelist', {'is-active': active})} ref={this.rootRef}>
                <Scrollbar
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
    active: React.PropTypes.bool
};

PageList.defaultProps = {
    onScrollCallback: () => {},
    active: false
};

export default PageList;