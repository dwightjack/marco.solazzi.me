<template>
    <Page id="job" key="job" :name="pageName">
        <Section title="jobs.current">
            <TableList>
                <Table caption="company" :data="current" />
            </TableList>
        </Section>
        <Section title="jobs.previous">
            <TableList>
                <Table v-if="job in prev" :key="job.id" caption="company" :data="job" />
            </TableList>
        </Section>
    </Page>
</template>

<script>
import jobs from '@/database/jobs.json';
import { NAV_PATH_JOBS } from '@/shared/constants';
import Page from '@/objects/Page';
import Section from '@/components/Section';

export default {
    data() {
        return {
            pageName: NAV_PATH_JOBS,
            current: jobs[0],
            prev: jobs.slice(1)
        };
    },
    components: {
        Page,
        Section
    }
};
</script>

