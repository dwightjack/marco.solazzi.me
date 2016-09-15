import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import { bindAll } from '../../base/utils';
import Title from '../Title';

import './_section.scss';

export default class Section extends PureComponent {

    constructor(props) {
        super(props);

        this.offsetTop = 0;
        this.maxScroll = 0;
        this.state = {
            inView: false,
            scrollAmount: false,
            atBottom: false
        };

        bindAll(this, 'setTitlePosition');
    }

    componentDidMount() {
        const root = findDOMNode(this);
        this.title = root.querySelector('.c-section__title');

        //wait just nothing for the layout to render
        setTimeout(() => {
            const offset = parseInt(window.innerHeight * 0.1, 10);
            const rect = this.title.getBoundingClientRect();
            this.offsetTop = rect.top - offset - rect.height;
            this.rootOffsetTop = root.offsetTop;
            this.maxScroll = root.offsetTop + root.offsetHeight - rect.height - offset;
            this.setTitlePosition();
        }, 100);

        document.querySelector('.c-pagelist').addEventListener('scroll', this.setTitlePosition);
    }

    setTitlePosition() {
        const scroll = document.querySelector('.c-pagelist').scrollTop; //window.pageYOffset
        const scrollDiff = this.offsetTop - scroll;
        const scrollAmount = this.rootOffsetTop + parseInt(window.innerHeight * 0.2, 10) - (scroll + (window.innerHeight / 2));

        if (scrollDiff <= 0) {
            if (scroll < this.maxScroll) {
                this.setState({inView: true, atBottom: false, scrollAmount});
            } else {
                this.setState({inView: false, atBottom: true, scrollAmount});
            }

        } else {
            this.setState({inView: false, atBottom: false, scrollAmount});
        }
    }

    render() {
        const {children, title, prefix} = this.props;
        const {inView, atBottom, scrollAmount} = this.state;
        const titleClass = classNames('c-section__title', {'is-fixed': inView, 'is-bottom': atBottom});
        const style = {transform: `translateY(${scrollAmount * 0.2}px)`};
        return (
            <section className="c-section">
                <Title className={titleClass} prefix={prefix} title={title} />
                <div className="c-section__body" style={style}>
                    {children}
                </div>
            </section>
        );
    }
}

Section.propTypes = {
    children: React.PropTypes.node,
    title: React.PropTypes.string,
    prefix: React.PropTypes.string
};
