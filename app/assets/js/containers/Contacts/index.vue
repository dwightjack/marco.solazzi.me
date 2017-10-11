<template>
  <Page id="contacts" :observe="false">
        <PageSection
            title="Want to know more?"
            prefix=""
        >
            <SocialList :items="socials" />
        </PageSection>
    </Page>
</template>

<script>
import { mapState } from 'vuex';
import Page from '@/components/Page';
import PageSection from '@/components/Section';
import SocialList from '@/objects/SocialList';

export default {

    components: {
        Page,
        PageSection,
        SocialList
    },

    computed: mapState('data', ['socials'])

};
</script>
