import React, {Component} from 'react';
import { connect } from 'react-redux';

import {
    NAV_PATH_HOME,
    NAV_PATH_JOBS,
    NAV_PATH_EDUCATION,
    NAV_PATH_SKILLS,
    NAV_PATH_PORTFOLIO
} from '../../base/constants';

import { bindAll } from '../../base/utils';
import Router from '../../router';


import Section from '../../components/Section';
import TableList from '../../components/TableList';
import Table from '../../components/Table';

import {connected as Wrapper} from '../../components/Wrapper';

import Page from '../../components/Page';
import DataList from '../../components/DataList';
import Pattern from '../../components/Pattern';
import SkillList from '../../components/SkillList';
import SocialList from '../../components/SocialList';


import works from '../../database/portfolio.works.json';
import talks from '../../database/portfolio.talks.json';
import education from '../../database/education.json';
import jobs from '../../database/jobs.json';
import techSkills from '../../database/skills.tech.json';
import teamSkills from '../../database/skills.team.json';

import { connected as Nav } from '../Nav';
import { connected as PageList } from '../PageList';
import Cover from '../Cover';
import Intro from '../Intro';

import { navigateToAction } from '../Nav/actions';

import './_app.scss';

const currentJob = jobs[0];
const previousJobs = jobs.slice(1).map((job) => <Table key={job.id} caption="company" data={job} />);

const pageJob = (
    <Page id="job" key="job" name={NAV_PATH_JOBS}>
        <Section title="jobs.current">
            <TableList>
                <Table caption="company" data={currentJob} />
            </TableList>
        </Section>
        <Section title="jobs.previous">
            <TableList>
                {previousJobs}
            </TableList>
        </Section>
    </Page>
);



const pageSkills = (
    <Page id="skills" key="skills" name={NAV_PATH_SKILLS}>
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
    <Page id="education" key="education" name={NAV_PATH_EDUCATION}>
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
    <Page id="awards" key="awards" name={NAV_PATH_PORTFOLIO}>
        <Section
            title="portfolio.works"
            subtitle="Latest agency projects"
        >
            <TableList>
                {works.map((work) => <Table key={work.id} caption="project" data={work} />)}
            </TableList>
        </Section>
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

const pageContacts = (
    <Page id="contacts" key="contacts">
        <Section
            title="Want to know more?"
            prefix=""
        >
            <SocialList />
        </Section>
    </Page>
);

const Pages = [
    pageJob,
    pageEducation,
    pageSkills,
    pagePortfolioWorks,
    pageContacts
];

class App extends Component {

    constructor(props) {
        super(props);

        bindAll(this, 'onPageChange');
    }

    componentDidMount() {

        const { router } = this.props;

        router.listen(this.props.navigateTo);

        if (router.current === '') {
            setTimeout(() => {
                router.go(NAV_PATH_HOME);
                this.setWheelListener();
            }, 7500);
        } else {
            this.setWheelListener();
        }

    }

    onPageChange(hash, silent = false) {
        this.props.router.go(hash, {silent});
        this.props.navigateTo(hash);
    }

    setWheelListener() {
        const { router } = this.props;

        window.addEventListener('wheel', (e) => {
            const { activeNav, activeGroup, pagelistScroll, breakpoint } = this.props;
            if (activeNav || (breakpoint !== 'desktop' && breakpoint !== 'wide')) {
                return;
            }
            if (e.deltaY > 0 && activeGroup === 'cover') {
                e.preventDefault();
                router.go(NAV_PATH_JOBS);
            } else if (e.deltaY < 0 && activeGroup === 'pagelist' && pagelistScroll <= 0) {
                e.preventDefault();
                router.go(NAV_PATH_HOME);
            }
        });
    }

    render() {

        const { activeGroup, router } = this.props;

        return (
            <div>

                <Nav className={activeGroup !== 'intro' ? 'is-visible' : ''} onPageChange={this.onPageChange} />

                <Wrapper onPageChange={this.onPageChange}>

                    <Intro active={activeGroup === 'intro'} />
                    <Cover active={activeGroup !== 'intro'} visible={activeGroup === 'cover'} />
                    <PageList active={activeGroup === 'pagelist'} onPageChange={this.onPageChange} router={router}>
                        {Pages}
                    </PageList>
                    { activeGroup !== 'intro' && <Pattern /> }

                </Wrapper>

            </div>
        );
    }

}

App.propTypes = {
    pagelistScroll: React.PropTypes.number,
    activeGroup: React.PropTypes.string,
    breakpoint: React.PropTypes.string,
    navigateTo: React.PropTypes.func,
    activeNav: React.PropTypes.bool,
    router: React.PropTypes.instanceOf(Router)
};

const mapStateToProps = ({pagelistScroll, activeGroup, activeNav, breakpoint}) => ({
    pagelistScroll,
    activeGroup,
    activeNav,
    breakpoint
});

const mapDispatchToProps = (dispatch) => ({
    navigateTo(hash) {
        dispatch(navigateToAction(hash));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
