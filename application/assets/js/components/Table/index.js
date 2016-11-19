import React, { PureComponent } from 'react';
import omit from 'lodash/omit';
import classnames from 'classnames';

import { AnchorIco } from '../Anchor';
import Caption from './Caption';
import Row from './Row';

import './_table.scss';

let id = 0;

class Table extends PureComponent {

    constructor(props) {
        super(props);
        id += 1;
        this._id = `table-${id}`;
    }

    buildRows(rows) { //eslint-disable-line class-methods-use-this

        return Object.keys(rows).filter((key) => key.indexOf('_') !== 0).map((key) => (
            <Row key={key} heading={key} value={rows[key]} />
        ));
    }

    metaTitle(type, title = '') { //eslint-disable-line class-methods-use-this

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
        const {_meta = [], _link} = data;
        const styles = this.props.styles.map((style) => `c-table--${style}`).join(' ');
        const rows = this.buildRows(omit(data, [caption, 'id']));

        return (
            <article className={classnames('c-table', styles)}>

                {caption ? <h3 className="c-table__caption" id={this._id}>
                    {`${caption}: `}<Caption label={data[caption]} link={_link} />
                </h3> : null}

                {styles.indexOf('c-table--brackets') !== -1 ? <div className="c-table__bracket" /> : null}

                <table className="c-table__data" aria-labelledby={this._id}>
                    <tbody>
                        {rows}
                    </tbody>
                </table>

                <footer className="c-table__footer">
                    {_meta.map(({type, link, label}) => (
                        <AnchorIco
                            className="o-anchor--cursor"
                            link={link}
                            key={link}
                            ico={type}
                            label={label || type}
                            title={this.metaTitle(type, data[caption])}
                        />
                    ))}
                </footer>

            </article>
        );
    }
}

Table.propTypes = {
    caption: React.PropTypes.string,
    data: React.PropTypes.object, //eslint-disable-line react/forbid-prop-types
    styles: React.PropTypes.arrayOf(React.PropTypes.string)
};

Table.defaultProps = {
    styles: ['brackets']
};

export default Table;
