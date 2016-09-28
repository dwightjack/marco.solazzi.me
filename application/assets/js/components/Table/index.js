import React, { PureComponent } from 'react';
import omit from 'lodash/omit';
import Time from '../Time';
import { AnchorIco } from '../Anchor';

import './_table.scss';
import Bracket from 'babel!svg-react!../../../images/bracket-left.svg?name=Bracket';

let id = 0;

class Table extends PureComponent {

    constructor(props) {
        super(props);
        this._id = `table-${(++id)}`;
        this.caption = this.renderCaption(props.data, props.caption);
    }

    componentWillUpdate({data, caption}) {
        this.caption = this.renderCaption(data, caption);
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

    renderCaption(data = {}, caption) {

        const captionData = data[caption] || '';
        const {_link} = data;

        if (_link) {
            return <a href={_link} target="_blank">{captionData.toString()}</a>;
        }

        return captionData.toString();
    }

    metaTitle(type, title = '') {

        switch (type) {
        case 'video':
            return `Watch video for: ${title}`;

        case 'slides':
            return `Slides for: ${title}`;

        default:
            return '';
        }
    }

    render() {
        const {caption, data = {}} = this.props;
        const {_meta = []} = data;

        return (
            <article className="c-table">
                <h3 className="c-table__caption" id={this._id}>
                    {`${caption}: `}{this.caption}
                </h3>
                <Bracket className="c-table__bracket" />
                <table className="c-table__data" aria-labelledby={this._id}>
                    <tbody>
                        {this.buildRows(omit(data, [caption, 'id']))}
                    </tbody>
                </table>
                <footer className="c-table__footer">
                    {_meta.map(({type, link, label}) => (
                        <AnchorIco link={link} ico={type} label={label || type} title={this.metaTitle(type, data[caption])} />
                    ))}
                </footer>
            </article>
        );
    }
}

Table.propTypes = {
    caption: React.PropTypes.string.isRequired,
    data: React.PropTypes.object
};

export default Table;
