<template>
    <div>
        <Jobs />
        <Education />
        <Skills />
        <Portfolio />
        <Contacts />
    </div>
</template>

<script>

import Jobs from '@/containers/Jobs';
import Education from '@/containers/Education';
import Skills from '@/containers/Skills';
import Portfolio from '@/containers/Portfolio';
import Contacts from '@/containers/Contacts';

export default {
    components: {
        Jobs,
        Skills,
        Education,
        Portfolio,
        Contacts
    }
};

</script>

<style lang="scss" module>
</style>