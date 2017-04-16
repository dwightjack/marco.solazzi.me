import React from 'react';
import classnames from 'classnames';

import './_list.scss';

export const ListItem = ({children, className}) => (
    <li className={classnames('o-list__item', className)}>
        {children}
    </li>
);

ListItem.propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string
};


const List = ({children, className}) => (
    <ul className={classnames('o-list', className)}>
        {children}
    </ul>
);

List.propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string
};


export default List;