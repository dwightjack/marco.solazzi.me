import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TweenMax } from 'gsap';
import { bindAll, createRefs, raf, caf, shallowEqual, pick } from '../../base/utils';
import Title from '../Title';

import './_section.scss';

class Section extends Component {

    constructor(props) {
        super(props);

        this.offsetTop = 0;
        this.rafId = null;

        this._updateKeys = ['children', 'title', 'subtitle', 'prefix'];

        createRefs(this, 'root', 'body');
        bindAll(this, 'setTitlePosition');
    }

    componentDidMount() {
        const root = this.root;

        setTimeout(() => {
            this.rootOffsetTop = root.offsetTop;
            this.setTitlePosition();
        }, 100);

    }

    componentWillReceiveProps(nextProps) {
        if (this.props.pagelistScroll !== nextProps.pagelistScroll) {
            if (this.rafId) {
                caf(this.rafId);
                this.rafId = null;
            }
            this.rafId = raf(this.setTitlePosition);
        }
    }

    shouldComponentUpdate(nextProps) {

        const uKeys = this._updateKeys;

        return !shallowEqual(pick(nextProps, uKeys), pick(this.props, uKeys));
    }

    setTitlePosition() {
        const scroll = this.props.pagelistScroll;
        const scrollAmount = (this.rootOffsetTop + parseInt(window.innerHeight * 0.2, 10)) - (scroll + (window.innerHeight / 2));

        TweenMax.set(this.body, {
            y: Math.floor(scrollAmount * 0.1)
        });
    }

    render() {
        const {children, title, subtitle, prefix} = this.props;

        return (
            <section className="c-section" ref={this.rootRef}>
                <Title className="c-section__title" prefix={prefix} title={title} subtitle={subtitle} />
                <div className="c-section__body" ref={this.bodyRef}>
                    {children}
                </div>
            </section>
        );
    }
}

Section.propTypes = {
    children: React.PropTypes.node,
    title: React.PropTypes.string.isRequired,
    subtitle: React.PropTypes.string,
    prefix: React.PropTypes.string,
    pagelistScroll: React.PropTypes.number
};

const mapStateToProps = (state) => ({pagelistScroll: state.pagelistScroll});

export default connect(
    mapStateToProps,
    null
)(Section);
