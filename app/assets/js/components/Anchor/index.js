import React from 'react';
import classnames from 'classnames';

import Ico from '../Ico';

import './_anchor.scss';

export const AnchorIco = ({ico, label = '', title = '', link, className, tabIndex}) => (
    <a href={link} target="_blank" rel="noopener noreferrer" className={classnames('o-anchor', className)} title={title} tabIndex={tabIndex}>
        <Ico name={ico} className="o-anchor__ico" /> {label && <span className="o-anchor__label">{label}</span>}
    </a>
);

export default AnchorIco;

AnchorIco.propTypes = {
    ico: React.PropTypes.string.isRequired,
    link: React.PropTypes.string.isRequired,
    label: React.PropTypes.string,
    title: React.PropTypes.string,
    className: React.PropTypes.string,
    tabIndex: React.PropTypes.number
};

AnchorIco.defaultProps = {
    tabIndex: 0
};