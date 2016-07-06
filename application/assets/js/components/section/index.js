import React, {Component} from 'react';

export default class Section extends Component {

    render() {

        const {children, title, prefix} = this.props;

        return (
            <section className="c-section">
                <h2 className="c-section__title o-title">
                    <strong className="o-title__prefix">{prefix || 'me'}</strong>
                    <span className="o-title__text">.{title}</span>
                </h2>
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