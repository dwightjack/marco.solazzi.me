<template>
    <Page id="skills" :name="pageName">
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
import Page from '@/objects/Page';
import SkillList from '@/objects/SkillList';
import DataSet from '@/objects/DataSet';
import PageSection from '@/components/Section';

export default {

    data() {
        return {
            pageName: NAV_PATH_SKILLS
        };
    },

    computed: mapState({
        ids: (state) => state.data.skills._byId,
        skills: (state) => state.data.skills
    }),

    components: {
        Page,
        PageSection,
        SkillList,
        DataSet
    }
};
</script>

