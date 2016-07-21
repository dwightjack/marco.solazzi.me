import React, {Component} from 'react';

import PageList from '../../components/PageList';
import Section from '../../components/Section';
import TableList from '../../components/TableList';
import Table from '../../components/Table';

import DevTools from '../DevTools';
import Page from '../Page';
import Nav from '../Nav';

import jobs from '../../database/jobs.json';

import glyph from '../../../images/job-gliph.svg';

export default class App extends Component {

    render() {

        const currentJob = jobs.shift();

        return (
            <div>
                <Nav />
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
                <DevTools />
            </div>
        );
    }

}

// App.propTypes = {
//     children: React.PropTypes.node
// };