import React from 'react';
import classNames from 'classnames';
import './_burger.scss';

const Burger = ({onClick, className, active, controls}) => (
    <button className={classNames('o-burger', className)} onClick={onClick} aria-expanded={active} aria-controls={controls}>
        <span className="o-burger__label">Menu</span>
    </button>
);

Burger.propTypes = {
    onClick: React.PropTypes.func.isRequired,
    className: React.PropTypes.string,
    active: React.PropTypes.bool,
    controls: React.PropTypes.string
};

Burger.defaultProps = {
    active: false
};

export default Burger;