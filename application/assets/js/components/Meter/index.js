import React from 'react';


import './_meter.scss';

const Meter = ({label, value}) => (
    <div className="c-meter">
        <span className="c-meter__label">{label}</span>
        <meter className="c-meter__value" min="0" max="100" value={value} />
    </div>
);

Meter.propTypes = {
    label: React.PropTypes.string.isRequired,
    value: React.PropTypes.number.isRequired
};

export default Meter;
