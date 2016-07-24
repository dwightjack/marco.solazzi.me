import React from 'react';
import { findDOMNode } from 'react-dom';
import PureComponent from '../../base/PureComponent';
import Title from '../Title';

import './_section.scss';

export default class Section extends PureComponent {

    componentDidMount() {
        const root = findDOMNode(this);
        const title = root.querySelector('.c-section__title');

        let atTop = 0;
        let max = 0;

        window.addEventListener('scroll', function (e) {
            if (atTop == 0) {
                atTop = title.getBoundingClientRect().top + window.scrollY;
                max = root.getBoundingClientRect().top + window.scrollY + root.offsetHeight - title.offsetHeight;
            }
            console.log(max);
            if (window.scrollY >= atTop) {
                title.style.transform = 'translateY(' + (window.scrollY - Math.min(atTop, max)) + 'px)';
            } else {
                title.style.transform = 'translateY(0)';
            }
        })
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
