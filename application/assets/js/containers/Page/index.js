import React from 'react';
import PureComponent from '../../base/PureComponent';

import './_page.scss';

export default class Page extends PureComponent {

    render() {

        const {children, glyph} = this.props;

        const glyphStyle = glyph ? {backgroundImage: `url("${glyph}")`} : '';

        return (
            <section className="c-page">
                <span className="c-page__glyph" style={glyphStyle} />
                <div className="c-page__body">
                    {children}
                </div>
            </section>
        );
    }

}

Page.propTypes = {
    children: React.PropTypes.node,
    glyph: React.PropTypes.string
};
