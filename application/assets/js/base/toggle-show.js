import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { noop, createRefs, raf } from './utils';

const toggleShow = (WrappedComponent, options = {}) => { //arrow

    const params = Object.assign({
        toggle: 'active',
        onBeforeEnter: noop,
        displayProp: true,
        onEnter: noop,
        onLeave: noop
    }, options);

    return class EnhancedComponent extends Component {

        constructor(props) {
            super(props);

            createRefs(this, 'wrappedRoot');

            this.state = {
                display: null
            };
        }

        componentDidUpdate(prevProps) {
            const prev = prevProps[params.toggle];
            const current = this.props[params.toggle];
            if (current !== prev) {
                if (this.props[params.toggle] === true) {
                    this.onEnter();
                } else {
                    this.onLeave();
                }
            }
        }

        componentDidMount() {
            this.toggleDisplay(this.props[params.toggle]);
        }

        toggleDisplay(toggle) {
            const styleValue = toggle === true ? null : 'none';
            if (params.displayProp === false) {
                const el = ReactDOM.findDOMNode(this.wrappedRoot); // eslint-disable-line react/no-find-dom-node
                el.style.display = styleValue;
            } else {
                this.setState({display: styleValue});
            }

        }

        onEnter() {
            const el = ReactDOM.findDOMNode(this.wrappedRoot); // eslint-disable-line react/no-find-dom-node
            //const onBeforeEnter = typeof params.onBeforeEnter === 'string' ? this.wrappedRoot[params.onBeforeEnter] : params.onBeforeEnter;
            const onEnter = typeof params.onEnter === 'string' ? this.wrappedRoot[params.onEnter] : params.onEnter;
            //onBeforeEnter.call(this.wrappedRoot, el);
            this.toggleDisplay(true);
            onEnter.call(this.wrappedRoot, el);


        }

        onLeave() {
            const el = ReactDOM.findDOMNode(this.wrappedRoot); // eslint-disable-line react/no-find-dom-node
            const onLeave = typeof params.onLeave === 'string' ? this.wrappedRoot[params.onLeave] : params.onLeave;
            onLeave.call(this.wrappedRoot, el, this.toggleDisplay.bind(this, false));
        }

        render() {
            const props = Object.assign({ ref: this.wrappedRootRef, display: this.state.display }, this.props);
            return React.createElement(WrappedComponent, props, null);
        }
    };

};


export default toggleShow;