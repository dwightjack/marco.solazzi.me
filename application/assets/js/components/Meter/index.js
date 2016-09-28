import React from 'react';
import classNames from 'classnames';


import './_meter.scss';

const Meter = ({label, value}) => (
    <div className={classNames('c-meter', {'c-meter--high': value > 80})}>
        <span className="c-meter__label">{label}</span>
        <strong className={`c-meter__bar c-meter__bar--${value}`}>
            <span className="c-meter__value">{value}%</span>
        </strong>
    </div>
);

Meter.propTypes = {
    label: React.PropTypes.string.isRequired,
    value: React.PropTypes.number.isRequired
};

export default Meter;
