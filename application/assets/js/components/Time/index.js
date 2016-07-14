import React from 'react';

import './_time.scss';

const Time = ({dateTime = ''}) => {

    const matches = typeof dateTime === 'string' ? dateTime.match(Time.DATE_PARSE_REGEXP) : null;
    const attr = matches ? dateTime : Date.now();
    const text = matches ? `Date.parse('${matches[1]}')` : 'Date.now()';

    return (
        <time className="o-time" dateTime={attr} aria-label={attr}><span>{text}</span></time>
    );
};

Time.propTypes = {
    dateTime: React.PropTypes.string
};

Time.DATE_PARSE_REGEXP = /^([0-9]{4}-[0-9]{2})-[0-9]{2}$/;

export default Time;