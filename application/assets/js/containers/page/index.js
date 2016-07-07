import React, {Component} from 'react';

import './_page.scss';

export default class Page extends Component {

    render() {

        const {children} = this.props;

        return (
            <section className="c-page">
                <span className="c-page__glyph"></span>
                <div className="c-page__body">
                    {children}
                </div>
            </section>
        );
    }

}

Page.propTypes = {
    children: React.PropTypes.node
};