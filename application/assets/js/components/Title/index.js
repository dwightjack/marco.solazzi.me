import React from 'react';
import classNames from 'classnames';

import pure from '../../base/pure';

import './_title.scss';

export const Title = ({className, prefix = 'me', title}) => (
    <h2 className={classNames('o-title', className)}>
        <strong className="o-title__prefix">{prefix}</strong>
        <span className="o-title__text">.{title}</span>
    </h2>
);

Title.propTypes = {
    className: React.PropTypes.string,
    prefix: React.PropTypes.string,
    title: React.PropTypes.string.isRequired
};


export default pure(Title);
