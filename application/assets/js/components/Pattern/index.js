import React, { Component } from 'react';
import { TweenMax } from 'gsap';
import { createRefs } from '../../base/utils';

import './_pattern.scss';

class Pattern extends Component {

    constructor(props) {
        super(props);
        createRefs(this, 'root');
    }

    componentDidMount() {
        TweenMax.fromTo(this.root, 0.4, {
            autoAlpha: 0
        }, {
            autoAlpha: 1,
            delay: 1
        });
    }

    render() {
        return (
            <div className="c-pattern" ref={this.rootRef}>
                <span />
            </div>
        );
    }
}


export default Pattern;