import React from 'react';
import isPlainObject from 'lodash/isPlainObject';

import Ico from '../Ico';

import './_data-list.scss';

const DataList = ({items = [], children}) => {

    const listItems = items.map((item) => {
        const {data = '', label, ico} = item;
        const props = isPlainObject(data) ? {...data} : {data};
        const enhancedChildren = React.Children.map(
            children,
            (child) => React.cloneElement(child, props)
        );
        return (
            <li className="c-data-list__item" key={label}>
                <span className="c-data-list__label">
                    {ico ? <Ico name={ico} className={'c-data-list__ico'} /> : ''}
                    {label}
                </span>
                <div className="c-data-list__body">
                    {enhancedChildren}
                </div>
            </li>
        );

    });

    return (<ul className="c-data-list">{listItems}</ul>);

};

DataList.propTypes = {
    items: React.PropTypes.arrayOf(React.PropTypes.object),
    children: React.PropTypes.node
};

export default DataList;