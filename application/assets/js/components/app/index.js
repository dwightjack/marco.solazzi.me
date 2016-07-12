import React, {Component} from 'react';

import Page from '../../containers/page';
import PageList from '../pagelist';
import Section from '../section';
import TableList from '../table-list';
import Table from '../table';

import jobs from '../../database/jobs.json';

import glyph from '../../../images/job-gliph.svg';

export default class App extends Component {

    render() {

        const currentJob = jobs.shift();

        return (
            <PageList>
                <Page id="job" glyph={glyph}>
                    <Section title="jobs.current">
                        <Table caption="company" data={currentJob} />
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