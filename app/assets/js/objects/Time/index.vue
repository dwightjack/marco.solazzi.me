<template>
    <time :class="$style.root" :datetime="datetime.toISOString()">
        <span>{{ text }}</span>
    </time>
</template>

<script>

import VueTypes from 'vue-types';

export const DATE_PARSE_REGEXP = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/;
export const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

export default {

    props: {
        value: VueTypes.string
    },

    computed: {

        datetime() {
            return new Date(DATE_PARSE_REGEXP.test(this.value) ? this.value : null);
        },

        month() {
            return MONTHS[this.datetime.getMonth()];
        },

        text() {
            return DATE_PARSE_REGEXP.test(this.value) ? `${this.month} ${this.datetime.getFullYear()}` : '-';
        }
    }

};
</script>

<style lang="scss" module>
@import "mixins";

.root {
    position: relative;
    display: inline-block;
    overflow: hidden;
    vertical-align: inherit;
}
</style>
