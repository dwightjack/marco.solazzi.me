<template>
    <Page :id="id" @enter="updateRoute">
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
import Page from '@/components/Page';
import PageSection from '@/components/Section';
import TableList from '@/objects/TableList';
import SummaryTable from '@/objects/Table';
import { TYPES } from '@/store/ui.actions';

export default {

    components: {
        Page,
        PageSection,
        TableList,
        SummaryTable
    },

    data() {
        return {
            id: NAV_PATH_PORTFOLIO
        };
    },

    computed: mapState('data', ['works', 'talks']),

    methods: {
        updateRoute({ id }) {
            this.$store.dispatch(`ui/${TYPES.ROUTE_UPDATED}`, id);
        }
    }
};
</script>

