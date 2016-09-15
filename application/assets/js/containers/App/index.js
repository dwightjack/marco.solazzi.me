import React, {Component} from 'react';

import PageList from '../../components/PageList';
import Section from '../../components/Section';
import TableList from '../../components/TableList';
import Table from '../../components/Table';

import DevTools from '../DevTools';
import Page from '../Page';
import Nav from '../Nav';
import Wrapper from '../../components/Wrapper';
import Glyph from '../../components/Glyph';
import DataList from '../../components/DataList';
import SkillList from '../../components/SkillList';

import jobs from '../../database/jobs.json';
import techSkills from '../../database/skills.tech.json';
import teamSkills from '../../database/skills.team.json';

import glyph from '../../../images/job-gliph.svg';

const PageJob = ({j}) => (
    <Page id="job">
        <Section title="jobs.current">
            <TableList>
                <Table caption="company" data={j.current} />
            </TableList>
        </Section>
        <Section title="jobs.previous">
            <TableList>
                {j.previous}
            </TableList>
        </Section>
    </Page>
);



const PageSkills = (
    <Page id="skills">
        <Section title="skills.tech">
            <DataList items={techSkills}>
                <SkillList />
            </DataList>
        </Section>
        <Section title="skills.team">
            <DataList items={teamSkills}>
                <SkillList />
            </DataList>
        </Section>
    </Page>
);

export default class App extends Component {

    constructor(props) {
        super(props);

        this.jobs = {
            current: jobs[0],
            previous: jobs.slice(1).map((job) => <Table key={job.id} caption="company" data={job} />)
        };
    }

    render() {

        return (
            <div>
                <Nav />
                <Wrapper>
                    <PageList>
                        <PageJob j={this.jobs} />
                        {PageSkills}
                    </PageList>
                    <Glyph glyph={glyph} />
                </Wrapper>
                <DevTools />
            </div>
        );
    }

}

// App.propTypes = {
//     children: React.PropTypes.node
// };
