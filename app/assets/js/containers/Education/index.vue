<template>
    <Page id="education" :name="pageName">
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
import Page from '@/objects/Page';
import PageSection from '@/components/Section';
import TableList from '@/objects/TableList';
import SummaryTable from '@/objects/Table';

export default {
    data() {
        return {
            pageName: NAV_PATH_EDUCATION
        };
    },

    computed: mapState({
        items: (state) => state.data.education
    }),

    components: {
        Page,
        PageSection,
        TableList,
        SummaryTable
    }
};
</script>

