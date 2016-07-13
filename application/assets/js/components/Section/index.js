import React, {Component} from 'react';

import './_section.scss';

import Title from '../Title';

export default class Section extends Component {

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