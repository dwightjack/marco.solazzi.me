<template>
    <Page :id="id" @enter="updateRoute">
        <PageSection title="education" subtitle="Learning never ends">
            <TableList>
                <SummaryTable v-for="item in items" :key="item.id" caption="title" :data="item" :styles="['brackets']" />
            </TableList>
        </PageSection>
    </Page>
</template>

<script>
import { mapState } from 'vuex';
import { NAV_PATH_EDUCATION } from '@/shared/constants';
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
            id: NAV_PATH_EDUCATION
        };
    },

    computed: mapState({
        items: (state) => state.data.education
    }),

    methods: {
        updateRoute({ id }) {
            this.$store.dispatch(`ui/${TYPES.ROUTE_UPDATED}`, id);
        }
    }
};
</script>

