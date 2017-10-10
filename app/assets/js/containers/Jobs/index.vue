<template>
    <Page :id="pageName">
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
import Page from '@/objects/Page';
import PageSection from '@/components/Section';
import TableList from '@/objects/TableList';
import SummaryTable from '@/objects/Table';

export default {
    data() {
        return {
            pageName: NAV_PATH_JOBS
        };
    },

    computed: mapState({
        current: (state) => state.data.jobs[0],
        prev: (state) => state.data.jobs.slice(1)
    }),

    components: {
        Page,
        PageSection,
        TableList,
        SummaryTable
    }
};
</script>

