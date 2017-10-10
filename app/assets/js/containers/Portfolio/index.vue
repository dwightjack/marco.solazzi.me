<template>
    <Page :id="pageName">
        <PageSection
            title="portfolio.works"
            subtitle="Latest agency projects"
        >
            <TableList>
                <SummaryTable v-for="work in works" :key="work.id" caption="project" :data="work" :styles="['brackets']" />
            </TableList>
        </PageSection>

        <PageSection
            title="portfolio.talks"
            subtitle="Sharing the knowledge"
        >
            <TableList>
                <SummaryTable v-for="talk in talks" :key="talk.id" caption="title" :data="talk" :styles="['brackets']" />
            </TableList>
        </PageSection>
    </Page>
</template>

<script>
import { mapState } from 'vuex';
import { NAV_PATH_PORTFOLIO } from '@/shared/constants';
import Page from '@/objects/Page';
import PageSection from '@/components/Section';
import TableList from '@/objects/TableList';
import SummaryTable from '@/objects/Table';

export default {
    data() {
        return {
            pageName: NAV_PATH_PORTFOLIO
        };
    },

    computed: mapState('data', ['works', 'talks']),

    components: {
        Page,
        PageSection,
        TableList,
        SummaryTable
    }
};
</script>

