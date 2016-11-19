import React from 'react';

import './_wrapper.scss';

const Wrapper = ({children}) => (
    <div className="o-wrapper">
        {children}
    </div>
);

Wrapper.propTypes = {
    children: React.PropTypes.node
};

export default Wrapper;