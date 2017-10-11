<template>
    <Page :id="id" @enter="updateRoute">
        <PageSection title="jobs.current">
            <TableList>
                <SummaryTable caption="company" :data="current" :styles="['brackets']" />
            </TableList>
        </PageSection>
        <PageSection title="jobs.previous">
            <TableList>
                <SummaryTable v-for="job in prev" :key="job.id" caption="company" :data="job" :styles="['brackets']" />
            </TableList>
        </PageSection>
    </Page>
</template>

<script>
import { mapState } from 'vuex';
import { NAV_PATH_JOBS } from '@/shared/constants';
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
            id: NAV_PATH_JOBS
        };
    },

    computed: mapState({
        current: (state) => state.data.jobs[0],
        prev: (state) => state.data.jobs.slice(1)
    }),

    methods: {
        updateRoute({ id }) {
            this.$store.dispatch(`ui/${TYPES.ROUTE_UPDATED}`, id);
        }
    }
};
</script>

