import React, { Component } from 'react';

import { bindAll } from '../../base/utils';



var gesuredZone = document.getElementById('gesuredZone');





export default class Swipe extends Component {

    constructor(props) {
        super(props);

        bindAll(this, 'onTouchStart', 'onTouchEnd');

        this.touchstartY = 0;
        this.touchendY = 0;


    }

    onTouchStart(e) {
        this.touchstartY = e.changedTouches[0].screenY;
    }

    onTouchEnd(e) {
        this.touchendY = e.changedTouches[0].screenY;
        this.handleGesture();
    }

    handleGesture() {
        const { touchendY, touchstartY } = this;

        if (Math.abs(touchendY - touchstartY) < this.props.threshold) {
            return;
        }

        if (touchendY < touchstartY) {
            this.props.onSwipe('down');
        }
        if (touchendY > touchstartY) {
            this.props.onSwipe('up');
        }
    }

    render() {
        return (
            <div onTouchStart={this.onTouchStart} onTouchEnd={this.onTouchEnd}>
                {this.props.children}
            </div>
        );
    }

}

Swipe.propTypes = {
    children: React.PropTypes.node,
    threshold: React.PropTypes.number,
    onSwipe: React.PropTypes.func
};

Swipe.defaultProps = {
    threshold: 20
};