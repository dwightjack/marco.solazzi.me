<template>
    <Page :id="id" @enter="updateRoute">
        <PageSection
            v-for="id in ids"
            :key="id"
            :title="`skills.${id}`"
            :subtitle="skills[id].label"
        >
            <DataSet :items="skills[id].list">
                <template scope="props">
                    <SkillList :skills="props.data" />
                </template>
            </DataSet>
        </PageSection>
    </Page>
</template>

<script>

import { mapState } from 'vuex';
import { NAV_PATH_SKILLS } from '@/shared/constants';
import Page from '@/components/Page';
import SkillList from '@/objects/SkillList';
import DataSet from '@/objects/DataSet';
import PageSection from '@/components/Section';
import { TYPES } from '@/store/ui.actions';

export default {

    components: {
        Page,
        PageSection,
        SkillList,
        DataSet
    },

    data() {
        return {
            id: NAV_PATH_SKILLS
        };
    },

    computed: mapState({
        ids: (state) => state.data.skills._byId,
        skills: (state) => state.data.skills
    }),

    methods: {
        updateRoute({ id }) {
            this.$store.dispatch(`ui/${TYPES.ROUTE_UPDATED}`, id);
        }
    }
};
</script>

