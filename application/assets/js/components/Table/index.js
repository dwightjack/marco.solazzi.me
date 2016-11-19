import React, { PureComponent } from 'react';
import omit from 'lodash/omit';
import classnames from 'classnames';
import Time from '../Time';
import { AnchorIco } from '../Anchor';

import './_table.scss';
//import Bracket from 'babel!svg-react!../../../images/bracket-left.svg?name=Bracket';

import Bracket from '../Bracket';

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

        return Object.keys(rows).filter((key) => key.indexOf('_') !== 0).map((key) => {

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

    renderCaption(data = {}, caption) {

        const captionData = data[caption] || '';
        const {_link} = data;

        if (_link) {
            return <a href={_link} target="_blank" rel="noopener noreferrer">{captionData.toString()}</a>;
        }

        return captionData.toString();
    }


    render() {
        const {caption, data = {}} = this.props;
        const {_meta = []} = data;
        const styles = this.props.styles.map((style) => `c-table--${style}`).join(' ');

        return (
            <article className={classnames('c-table', styles)}>
                {caption ? <h3 className="c-table__caption" id={this._id}>
                    {`${caption}: `}{this.caption}
                </h3> : null}
                {/*styles.indexOf('c-table--brackets') !== -1 ? <Bracket className="c-table__bracket" /> : null*/}
                {styles.indexOf('c-table--brackets') !== -1 ? <div className="c-table__bracket2" /> : null}
                <table className="c-table__data" aria-labelledby={this._id}>
                    <tbody>
                        {this.buildRows(omit(data, [caption, 'id']))}
                    </tbody>
                </table>
                <footer className="c-table__footer">
                    {_meta.map(({type, link, label}) => (
                        <AnchorIco className="o-anchor--cursor" link={link} key={link} ico={type} label={label || type} title={this.metaTitle(type, data[caption])} />
                    ))}
                </footer>
            </article>
        );
    }
}

Table.propTypes = {
    caption: React.PropTypes.string,
    data: React.PropTypes.object,
    styles: React.PropTypes.arrayOf(React.PropTypes.string)
};

Table.defaultProps = {
    styles: ['brackets']
};

export default Table;
