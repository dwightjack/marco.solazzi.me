import React from 'react';

import './_table-list.scss';

const TableList = (props) => (
    <div className="c-table-list">
        {props.children}
    </div>
);

TableList.propTypes = {
    children: React.PropTypes.node
};

export default TableList;