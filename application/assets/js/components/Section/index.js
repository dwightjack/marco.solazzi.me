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
            atBottom: false
        };

        bindAll(this, 'setTitlePosition');
    }

    componentDidMount() {
        const root = findDOMNode(this);
        this.title = root.querySelector('.c-section__title');

        //wait just nothing for the layout to render
        setTimeout(() => {
            const offset = parseInt(window.innerHeight * 0.05, 10);
            const rect = this.title.getBoundingClientRect();
            this.offsetTop = rect.top - offset;
            this.maxScroll = root.offsetTop + root.offsetHeight - rect.height - offset;
        }, 100);

        window.addEventListener('scroll', this.setTitlePosition);
    }

    setTitlePosition() {
        const scrollDiff = this.offsetTop - window.scrollY;

        if (scrollDiff <= 0) {
            if (window.scrollY < this.maxScroll) {
                this.setState({inView: true, atBottom: false});
            } else {
                this.setState({inView: false, atBottom: true});
            }

        } else {
            this.setState({inView: false, atBottom: false});
        }
    }

    render() {
        const {children, title, prefix} = this.props;
        const {inView, atBottom} = this.state;
        const titleClass = classNames('c-section__title', {'is-fixed': inView, 'is-bottom': atBottom});
        return (
            <section className="c-section">
                <Title className={titleClass} prefix={prefix} title={title} />
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
