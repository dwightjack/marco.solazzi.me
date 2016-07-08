import React, {Component} from 'react';

import './_table.scss';

let id = 0;

class Table extends Component {

    constructor(props) {
        super(props);
        this._id = `table-${(++id)}`;
    }

    render() {
        const now = Date.now();
        return (
            <article className="c-table">
                <h3 className="c-table__caption" id={this._id}>company: AQuest Srl</h3>
                <table className="c-table__data" aria-labelledby={this._id}>
                    <tr>
                        <th scope="row">title</th>
                        <td>
                            Senior Frontend Developer
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">from</th>
                        <td>
                            <time dateTime="2014-12-01">Date.parse('2014-12')</time>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">to</th>
                        <td>
                            <time dateTime={now}>Date.now()</time>
                        </td>
                    </tr>
                </table>
            </article>
        );
    }
}

export default Table;