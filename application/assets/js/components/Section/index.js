import React from 'react';
import { findDOMNode } from 'react-dom';
import PureComponent from '../../base/PureComponent';
import Title from '../Title';

import './_section.scss';

export default class Section extends PureComponent {

    componentDidMount() {
        const root = findDOMNode(this);
        const title = root.querySelector('.c-section__title');

        window.addEventListener('scroll', () => {
            const scrollDiff = title.offsetTop - window.scrollY;
            const maxScroll = root.offsetTop + root.offsetHeight - title.offsetHeight;
            console.log(maxScroll);
            if (scrollDiff <= 0) {
                if (window.scrollY < maxScroll) {
                    title.style.transform = `translateY(${scrollDiff * -1}px)`;
                }
            } else {
                title.style.transform = 'none';
            }
        });
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
