import React from 'react';

import './_time.scss';

const Time = ({dateTime = ''}) => {

    const matches = typeof dateTime === 'string' ? dateTime.match(Time.DATE_PARSE_REGEXP) : null;
    const attr = matches ? dateTime : Date.now();
    //const text = matches ? `Date.parse('${matches[1]}')` : 'Date.now()';

    const text = matches ? `${Time.MONTHS['m' + matches[2]]} ${matches[1]}` : '-'; //eslint-disable-line prefer-template

    return (
        <time className="o-time" dateTime={attr}>
            <span>{text}</span>
        </time>
    );
};

Time.propTypes = {
    dateTime: React.PropTypes.string
};

Time.MONTHS = {
    m01: 'January',
    m02: 'February',
    m03: 'March',
    m04: 'April',
    m05: 'May',
    m06: 'June',
    m07: 'July',
    m08: 'August',
    m09: 'September',
    m10: 'October',
    m11: 'November',
    m12: 'December'
};

Time.DATE_PARSE_REGEXP = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/;

export default Time;