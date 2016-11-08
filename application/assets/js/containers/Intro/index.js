import React, { Component } from 'react';
import { TweenMax, Power3 } from 'gsap';
import classnames from 'classnames';

import { createRefs } from '../../base/utils';

import './_intro.scss';


class Intro extends Component {

    constructor(props) {
        super(props);

        this.state = {
            entering: false
        };

        createRefs(this, 'root');

    }

    componentDidMount() {

        setTimeout(() => {
            this.setState({ entering: true });
        }, 500);
    }

    componentDidUpdate({active}) {
        const currentActive = this.props.active;

        if (active !== currentActive && currentActive === false) {
            TweenMax.to(this.root, 0.35, {
                xPercent: -5,
                autoAlpha: 0,
                ease: Power3.easeOut
            });
        }
    }

    render() {
        const { entering } = this.state;
        return (
            <header className="c-intro" ref={this.rootRef}>
                <div className={classnames('c-intro__body h1', {'is-entering': entering})}>
                    <span className="c-intro__line">Geeks.query(</span>
                    <span className="c-intro__line c-intro__line--pre">&apos;/usr/<mark className="u-type--mark">marco+solazzi</mark>&apos;,</span>
                    <span className="c-intro__line c-intro__line--pre">&apos;job=<mark className="u-type--mark">frontend</mark>&apos;</span>
                    <span className="c-intro__line">).then((me) =&rsaquo; </span>
                </div>
            </header>
        );
    }
}

Intro.propTypes = {
    active: React.PropTypes.bool
};

export default Intro;