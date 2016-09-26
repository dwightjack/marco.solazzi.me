import React from 'react';

import Ico from '../Ico';

import './_anchor.scss';

export const AnchorIco = ({ico, label = '', title = '', link}) => (
    <a href={link} target="_blank" className="o-anchor" title={title}>
        <Ico name={ico} className="o-anchor__ico" /> <span className="o-anchor__label">{label}</span>
    </a>
);

AnchorIco.propTypes = {
    ico: React.PropTypes.string.isRequired,
    link: React.PropTypes.string.isRequired,
    label: React.PropTypes.string,
    title: React.PropTypes.string
};