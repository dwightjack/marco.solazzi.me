import React from 'react';

import './_burger.scss';

const Burger = ({onClick}) => (
    <button className="o-burger" onClick={onClick}>
        <span className="o-burger__label">Menu</span>
    </button>
);

Burger.propTypes = {
    onClick: React.PropTypes.func
};

export default Burger;