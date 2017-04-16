import React from 'react';
import classnames from 'classnames';

import './_bracket.scss';

const Bracket = ({className}) => (
    <div className={classnames('o-bracket', className)} />
);
Bracket.propTypes = {
    className: React.PropTypes.string
};

export default Bracket;