import React, {Component} from 'react';

import Page from '../../containers/Page';
import PageList from '../PageList';
import Section from '../Section';
import TableList from '../TableList';
import Table from '../Table';

import jobs from '../../database/jobs.json';

import glyph from '../../../images/job-gliph.svg';

export default class App extends Component {

    render() {

        const currentJob = jobs.shift();

        return (
            <PageList>
                <Page id="job" glyph={glyph}>
                    <Section title="jobs.current">
                        <TableList>
                            <Table caption="company" data={currentJob} />
                        </TableList>
                    </Section>
                    <Section title="jobs.previous">
                        <TableList>
                            {jobs.map((job) => (
                                <Table caption="company" key={job.id} data={job} />
                            ))}
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