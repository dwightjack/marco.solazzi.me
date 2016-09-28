import React from 'react';

import pure from '../../base/pure';

import './_title.scss';

export const Title = ({className = '', prefix = 'me', title, subtitle}) => (
    <header className={className}>
        <h2 className="o-title">
            <strong className="o-title__prefix">{prefix}</strong>
            <span className="o-title__text">.{title}</span>
        </h2>
        {subtitle ? <h3 className="o-title o-title--sub">{subtitle}</h3> : ''}
    </header>
);

Title.propTypes = {
    className: React.PropTypes.string,
    prefix: React.PropTypes.string,
    title: React.PropTypes.string.isRequired,
    subtitle: React.PropTypes.string
};


export default pure(Title);
