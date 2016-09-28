import React, { PureComponent } from 'react';

import './_glyph.scss';

const DEFAULT_GLYPH = {};

export default class Glyph extends PureComponent {

    constructor(props) {
        super(props);
        this.updateGlyphStyle(props.glyph);
    }

    componentWillReceiveProps(nextProps) {
        this.updateGlyphStyle(nextProps.glyph);
    }

    updateGlyphStyle(glyph) {
        this.glyphStyle = glyph ? {backgroundImage: `url("${glyph}")`} : DEFAULT_GLYPH;
    }

    render() {

        console.log(this.glyphStyle);

        return (
            <span className="c-glyph" style={this.glyphStyle} />
        );
    }

}

Glyph.propTypes = {
    glyph: React.PropTypes.string
};
