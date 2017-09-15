<template>
    <ul :class="$style.root">
        <li
            v-for="(skill, index) in skills"
            :key="skill.id"
            :class="$style.item"
            :style="{transitionDelay: `${index * 150}ms`}"
        >
            <MeterBar v-if="skill.level" :label="skill.label" :value="parseInt(skill.level, 10)" />
            <p v-else>{skill.label}</p>
        </li>
    </ul>
</template>

<script>

import VueTypes from 'vue-types';
import MeterBar from '@/objects/MeterBar';

export default {

    props: {
        skills: VueTypes.arrayOf(VueTypes.shape({
            id: VueTypes.any,
            label: VueTypes.any,
            level: VueTypes.number
        }))
    },

    components: {
        MeterBar
    }
};
</script>

<style lang="scss" module src="./skill-list.scss" />