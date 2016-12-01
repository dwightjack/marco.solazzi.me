import React from 'react';

import Time from '../Time';


const Row = ({heading, value}) => {

    let rowData = value;

    if (heading === 'to' || heading === 'from' || heading === 'date') {
        rowData = <td><Time dateTime={value} /></td>;
    } else {
        rowData = <td dangerouslySetInnerHTML={{__html: value}} />; //eslint-disable-line react/no-danger
    }

    return (
        <tr data-row={heading}>
            <th scope="row">{heading}</th>
            {rowData}
        </tr>
    );
};

Row.propTypes = {
    heading: React.PropTypes.string,
    value: React.PropTypes.oneOfType([
        React.PropTypes.number,
        React.PropTypes.string
    ])
};

export default Row;
