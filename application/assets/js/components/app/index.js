import React, {Component} from 'react';

import Page from '../../containers/page';
import PageList from '../pagelist';
import Section from '../section';
import TableList from '../table-list';
import Table from '../table';

import glyph from '../../../images/job-gliph.svg';

export default class App extends Component {

    render() {

        return (
            <PageList>
                <Page id="job" glyph={glyph}>
                    <Section title="jobs.current">
                        <Table />
                    </Section>
                    <Section title="jobs.previous">
                        <TableList>
                            <Table />
                            <Table />
                            <Table />
                            <Table />
                        </TableList>
                    </Section>
                </Page>
            </PageList>
        );
    }

}

// App.propTypes = {
//     children: React.PropTypes.node
// };