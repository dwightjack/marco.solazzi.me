import React from 'react';
import classNames from 'classnames';
import './_burger.scss';

const Burger = ({onClick, className}) => (
    <button className={classNames('o-burger', className)} onClick={onClick}>
        <span className="o-burger__label">Menu</span>
    </button>
);

Burger.propTypes = {
    onClick: React.PropTypes.func.isRequired,
    className: React.PropTypes.string
};

export default Burger;
