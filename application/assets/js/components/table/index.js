import React, {Component} from 'react';
import omit from 'lodash/omit';

import Time from '../time';

import './_table.scss';

let id = 0;

class Table extends Component {

    constructor(props) {
        super(props);
        this._id = `table-${(++id)}`;
    }


    buildRows(rows) {

        return Object.keys(rows).map((key) => {

            let value = rows[key];

            if (key === 'to' || key === 'from') {
                value = <Time dateTime={value} />;
            }

            return (
                <tr>
                    <th scope="row">{key}</th>
                    <td>
                        {value}
                    </td>
                </tr>
            );
        });
    }

    render() {
        const {caption, data = {}} = this.props;
        const captionText = `${caption}: ${data[caption]}`;

        const rows = this.buildRows(omit(data, caption));

        return (
            <article className="c-table">
                <h3 className="c-table__caption" id={this._id}>{captionText}</h3>
                <table className="c-table__data" aria-labelledby={this._id}>
                    {rows}
                </table>
            </article>
        );
    }
}

Table.propTypes = {
    caption: React.propTypes.string.required,
    data: React.propTypes.arrayOf(Object)
};

export default Table;