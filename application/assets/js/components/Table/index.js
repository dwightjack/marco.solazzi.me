import React, { PureComponent } from 'react';
import omit from 'lodash/omit';
import isPlainObject from 'lodash/isPlainObject';
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

        return Object.keys(rows).filter((key) => key.indexOf('_') !== 0).map((key, idx) => {

            let value = rows[key];

            if (key === 'to' || key === 'from' || key === 'date') {
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

    renderCaption(data, caption) {

        const captionData = data[caption] || '';

        if (isPlainObject(captionData)) {
            return <a href={captionData.url} target="_blank">{captionData.name}</a>;
        }

        if (data._link) {
            return <a href={data._link} target="_blank">{captionData.toString()}</a>;
        }

        return captionData.toString();
    }

    render() {
        const {caption, data = {}} = this.props;
        return (
            <article className="c-table">
                <h3 className="c-table__caption" id={this._id}>
                    {`${caption}: `}{this.renderCaption(data, caption)}
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
