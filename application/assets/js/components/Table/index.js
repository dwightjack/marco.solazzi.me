import React from 'react';
import omit from 'lodash/omit';
import isPlainObject from 'lodash/isPlainObject';


import PureComponent from '../../base/PureComponent';
import Time from '../Time';

import './_table.scss';
import Bracket from 'babel!svg-react!../../../images/bracket-left.svg?name=Bracket';

let id = 0;

class Table extends PureComponent {

    constructor(props) {
        super(props);
        this._id = `table-${(++id)}`;
    }


    buildRows(rows) {

        return Object.keys(rows).map((key, idx) => {

            let value = rows[key];

            if (key === 'to' || key === 'from') {
                value = <td><Time dateTime={value} /></td>;
            } else {
                value = <td dangerouslySetInnerHTML={{__html: value}} />;
            }

            return (
                <tr key={key} data-row={key}>
                    <th scope="row">{key}</th>
                    {value}
                </tr>
            );
        });
    }

    renderCaption(caption) {

        if (isPlainObject(caption)) {
            return <a href={caption.url} target="_blank">{caption.name}</a>;
        }

        return caption.toString();
    }

    render() {
        const {caption, data = {}} = this.props;
        return (
            <article className="c-table">
                <h3 className="c-table__caption" id={this._id}>
                    {`${caption}: `}{this.renderCaption(data[caption])}
                </h3>
                <Bracket className="c-table__bracket" />
                <table className="c-table__data" aria-labelledby={this._id}>
                    <tbody>
                        {this.buildRows(omit(data, [caption, 'id']))}
                    </tbody>
                </table>
            </article>
        );
    }
}

Table.propTypes = {
    caption: React.PropTypes.string.isRequired,
    data: React.PropTypes.object
};

export default Table;
