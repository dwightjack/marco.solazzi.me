import React from 'react';

import './_title.scss';

const Title = (props) => (
    <h2 className={`o-title ${props.className}`}>
        <strong className="o-title__prefix">{props.prefix || 'me'}</strong>
        <span className="o-title__text">.{props.title}</span>
    </h2>
);

Title.propTypes = {
    className: React.PropTypes.string,
    prefix: React.PropTypes.string,
    title: React.PropTypes.string.isRequired
};

export default Title;