import React, {Component} from 'react';

import PageList from '../../components/PageList';
import Section from '../../components/Section';
import TableList from '../../components/TableList';
import Table from '../../components/Table';

import DevTools from '../DevTools';
import Page from '../Page';
import Nav from '../Nav';
import Wrapper from '../../components/Wrapper';
import Cover from '../../components/Cover';
//import Glyph from '../../components/Glyph';
import DataList from '../../components/DataList';
import Pattern from '../../components/Pattern';
import SkillList from '../../components/SkillList';

import works from '../../database/portfolio.works.json';
import talks from '../../database/portfolio.talks.json';
import education from '../../database/education.json';
import jobs from '../../database/jobs.json';
import techSkills from '../../database/skills.tech.json';
import teamSkills from '../../database/skills.team.json';

import glyph from '../../../images/job-gliph.svg';


import './_app.scss';

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
        <Section
            title="skills.tech"
            subtitle="Technological stack"
        >
            <DataList items={techSkills}>
                <SkillList />
            </DataList>
        </Section>
        <Section
            title="skills.team"
            subtitle="Teamwork skills and tools"
        >
            <DataList items={teamSkills}>
                <SkillList />
            </DataList>
        </Section>
    </Page>
);

const pageEducation = (
    <Page id="education">
        <Section
            title="education"
            subtitle="Learning never ends"
        >
            <TableList>
                {education.map((school) => <Table key={school.id} caption="title" data={school} />)}
            </TableList>
        </Section>
    </Page>
);

const pagePortfolioWorks = (
    <Page id="awards">
        <Section
            title="portfolio.works"
            subtitle="Latest agency projects"
        >
            <TableList>
                {works.map((work) => <Table key={work.id} caption="project" data={work} />)}
            </TableList>
        </Section>
    </Page>
);

const pagePortfolioTalks = (
    <Page id="talks">
        <Section
            title="portfolio.talks"
            subtitle="Sharing the knowledge"
        >
            <TableList>
                {talks.map((talk) => <Table key={talk.id} caption="title" data={talk} />)}
            </TableList>
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
                <Wrapper>
                    <Cover />
                </Wrapper>
                <DevTools />
            </div>
        );
    }

}

// App.propTypes = {
//     children: React.PropTypes.node
// };
