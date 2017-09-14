<template>
    <time :class="$styles.root" :datetime="attr">
        <span>{{ text }}</span>
    </time>
</template>

<script>

export default {

    MONTHS: {
        m01: 'January',
        m02: 'February',
        m03: 'March',
        m04: 'April',
        m05: 'May',
        m06: 'June',
        m07: 'July',
        m08: 'August',
        m09: 'September',
        m10: 'October',
        m11: 'November',
        m12: 'December'
    },

    DATE_PARSE_REGEXP: /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/,

    props: ['value'],

    computed: {
        matches() {
            return typeof this.value === 'string' ? this.value.match(this.$options.DATE_PARSE_REGEXP) : null;
        },
        attr() {
            return this.matches ? this.value : Date.now();
        },
        text() {
            return this.matches ? `${this.$options.MONTHS[`m${this.matches[2]}`]} ${this.matches[1]}` : '-';
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
