import React, { Component } from 'react';
import { TweenMax } from 'gsap';

import { createRefs } from '../../base/utils';

import './_intro.scss';


class Intro extends Component {

    constructor(props) {
        super(props);

        createRefs(this, 'root');
    }

    componentWillAppear(callback) {

        TweenMax.fromTo(this.root, 1, {
            autoAlpha: 0
        }, {
            autoAlpha: 1,
            onComplete: callback
        });
    }

    componentWillLeave(callback) {
        TweenMax.to(this.root, 1, {
            xPercent: -100,
            onComplete: callback
        });
    }

    render() {
        return (
            <header className="c-intro" ref={this.rootRef}>
                <div className="c-intro__body h1">
                    <span className="c-intro__line">Geeks.query(</span>
                    <span className="c-intro__line">    '/usr/<mark className="u-type--mark">marco+solazzi</mark>',</span>
                    <span className="c-intro__line">    'job=<mark className="u-type--mark">frontend</mark>'</span>
                    <span className="c-intro__line">).then((me) => ...</span>
                </div>
            </header>
        );
    }
}

export default Intro;