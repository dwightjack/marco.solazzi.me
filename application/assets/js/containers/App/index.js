import React, {Component} from 'react';

import PageList from '../../components/PageList';
import Section from '../../components/Section';
import TableList from '../../components/TableList';
import Table from '../../components/Table';

import DevTools from '../DevTools';
import Page from '../Page';
import Nav from '../Nav';
import Glyph from '../../components/Glyph';
import Meter from '../../components/Meter';

import jobs from '../../database/jobs.json';
import techSkills from '../../database/skills.tech.json';

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

const SkillList = ({skills}) => {
    const skillItems = skills.map((skill) => (
        <li key={skill.id}>
            <Meter label={skill.label} value={skill.level} />
        </li>
    ));
    return (<ul>{skillItems}</ul>);
};

const PageSkills = (
    <Page id="skills">
        <Section title="skills.tech">
            <ul>
                {Object.keys(techSkills).map((field) => (
                    <li key={field}>
                        <span>{field}</span>
                        <SkillList label={field} skills={techSkills[field]} />
                    </li>
                ))}
            </ul>
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
                <PageList>
                    <PageJob j={this.jobs} />
                    {PageSkills}
                </PageList>
                <Glyph glyph={glyph} />
                <DevTools />
            </div>
        );
    }

}

// App.propTypes = {
//     children: React.PropTypes.node
// };
