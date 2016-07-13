import React from 'react';



const Time = ({dateTime = ''}) => {

    const matches = typeof dateTime === 'string' ? dateTime.match(Time.DATE_PARSE_REGEXP) : null;
    const attr = matches ? dateTime : Date.now();
    const text = matches ? `Date.parse(${matches[1]})` : 'Date.now()';

    return (
        <time dateTime={attr}>{text}</time>
    );
};

Time.propTypes = {
    dateTime: React.PropTypes.string
};

Time.DATE_PARSE_REGEXP = /^([0-9]{4}-[0-9]{2})-[0-9]{2}$/;

export default Time;