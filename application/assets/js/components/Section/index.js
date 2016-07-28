import React from 'react';
import { findDOMNode } from 'react-dom';
import PureComponent from '../../base/PureComponent';
import { bindAll } from '../../base/utils';
import Title from '../Title';

import './_section.scss';

export default class Section extends PureComponent {

    constructor(props) {
        super(props);

        this.offsetTop = 0;
        this.maxScroll = 0;

        bindAll(this, 'setTitlePosition');
    }

    componentDidMount() {
        const root = findDOMNode(this);
        this.title = root.querySelector('.c-section__title');

        //wait just nothing for the layout to render
        setTimeout(() => {
            const offset = parseInt(window.innerHeight * 0.05, 10);
            const {offsetTop, offsetHeight} = this.title;
            this.offsetTop = offsetTop - offset;
            this.maxScroll = root.offsetTop + root.offsetHeight - offsetHeight - offset;
            console.log(offsetHeight);
        }, 100);




        window.addEventListener('scroll', this.setTitlePosition);
    }

    setTitlePosition() {
        const scrollDiff = this.offsetTop - window.scrollY;

        if (scrollDiff <= 0) {
            if (window.scrollY < this.maxScroll) {
                this.title.style.transform = `translateY(${scrollDiff * -1}px)`;
            }
        } else {
            this.title.style.transform = 'none';
        }
    }

    render() {
        const {children, title, prefix} = this.props;
        return (
            <section className="c-section">
                <Title className="c-section__title" prefix={prefix} title={title} />
                <div className="c-section__body">
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
