import React from 'react';

import './_ico.scss';

const Ico = ({name, className = ''}) => (
    <svg className={`o-ico o-ico--${name} ${className}`.trim()}>
        <use xlinkHref={`#o-ico--${name}`} />
    </svg>
);

Ico.propTypes = {
    className: React.PropTypes.string,
    name: React.PropTypes.string.isRequired
};

export default Ico;