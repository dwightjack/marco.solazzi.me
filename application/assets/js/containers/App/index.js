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
import toggleShow from '../../base/toggle-show';

import {
    pagelistScrollUpdateAction,
    appActiveGroupAction,
    navigateToAction
} from './actions';

import Section from '../../components/Section';
import TableList from '../../components/TableList';
import Table from '../../components/Table';

import Wrapper from '../../components/Wrapper';

import Page from '../../components/Page';
import DataList from '../../components/DataList';
import Pattern from '../../components/Pattern';
import SkillList from '../../components/SkillList';

import works from '../../database/portfolio.works.json';
import talks from '../../database/portfolio.talks.json';
import education from '../../database/education.json';
import jobs from '../../database/jobs.json';
import techSkills from '../../database/skills.tech.json';
import teamSkills from '../../database/skills.team.json';

import Nav from '../Nav';
import PageList from '../PageList';
import Cover from '../Cover';
import Intro from '../Intro';

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
    </Page>
);

const pagePortfolioTalks = (
    <Page id="talks" key="talks">
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

const Pages = [
    pageJob,
    pageEducation,
    pageSkills,
    pagePortfolioWorks,
    pagePortfolioTalks
];


const IntroToggler = toggleShow(Intro, {
    onLeave: 'componentLeave',
    displayProp: false
});

const CoverToggler = toggleShow(Cover, {
    toggle: 'visible',
    onEnter: 'componentEnter',
    onLeave: 'componentLeave'
});

class App extends Component {

    constructor(props) {
        super(props);

        bindAll(this, 'onPageListScroll');
    }

    componentDidMount() {

        const { setActiveGroup } = this.props;

        setTimeout(() => {
            setActiveGroup('cover');

            window.addEventListener('wheel', (e) => {
                if (e.deltaY > 0 && this.props.activeGroup === 'cover') {
                    e.preventDefault();
                    window.location.hash = NAV_PATH_JOBS;
                } else if (e.deltaY < 0 && this.props.activeGroup === 'pagelist' && this.props.scrollAmount <= 0) {
                    e.preventDefault();
                    window.location.hash = NAV_PATH_HOME;
                }
            });

        }, 7500);

        window.addEventListener('hashchange', (e) => {
            e.preventDefault();
            this.props.navigateTo(window.location.hash);
        });

    }

    onPageListScroll({offset}) {
        const scrollAmount = offset.y;
        this.props.onPageListScroll(scrollAmount);
    }

    render() {

        const {activeGroup, route} = this.props;

        return (
            <div>
                <Nav className={activeGroup !== 'intro' ? 'is-visible' : ''} />
                <Wrapper>
                    <IntroToggler active={activeGroup === 'intro'} />
                    <CoverToggler active={activeGroup !== 'intro'} visible={activeGroup === 'cover'} />
                    { /*activeGroup === 'pagelist' &&
                        <PageList
                            active={activeGroup === 'pagelist'}
                            onScrollCallback={this.onPageListScroll}
                            route={route}
                        >
                            {Pages}
                        </PageList>}
                    { activeGroup !== 'intro' && <Pattern />*/}

                </Wrapper>

                { /* <DevTools /> */ }
            </div>
        );
    }

}

App.propTypes = {
    onPageListScroll: React.PropTypes.func,
    setActiveGroup: React.PropTypes.func,
    navigateTo: React.PropTypes.func,
    scrollAmount: React.PropTypes.number,
    activeGroup: React.PropTypes.string,
    route: React.PropTypes.string
};

const mapDispatchToProps = (dispatch) => ({
    onPageListScroll(scrollAmount) {
        dispatch(pagelistScrollUpdateAction(scrollAmount));
    },
    setActiveGroup(activeGroup) {
        dispatch(appActiveGroupAction(activeGroup));
    },
    navigateTo(hash) {
        dispatch(navigateToAction(hash));
    }
});

const mapStateToProps = (state) => ({
    scrollAmount: state.pagelistScroll,
    activeGroup: state.activeGroup,
    route: state.route
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
