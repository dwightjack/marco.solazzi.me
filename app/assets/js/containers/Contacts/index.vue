<template>
  <Page id="contacts">
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
import Page from '@/objects/Page';
import PageSection from '@/components/Section';
import SocialList from '@/objects/SocialList';

export default {

    computed: mapState(['socials']),

    components: {
        Page,
        PageSection,
        SocialList
    }
};
</script>
