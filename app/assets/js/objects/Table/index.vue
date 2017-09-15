<template>
    <article :class="[$style.root, tableStyles]">

        <h3 v-if="caption" :class="$style.caption" :id="`table-${id}`">{{ caption }}:
            <a v-if="data._link" :href="data._link" target="_blank" rel="noopener noreferrer">{{ captionLabel }}</a>
            <span v-if="!data._link">{{ captionLabel }}</span>
        </h3>

        <div v-if="hasBrackets" :class="$style.bracket" />

        <table :class="$style.data" :aria-labelledby="`table-${id}`">
            <tbody>
                <tr v-for="(value, heading) in rows" :data-row="heading" :key="heading">
                    <th scope="row">{{ heading }}</th>
                    <td v-if="isDate(heading)">
                        <FormattedTime :value="value" />
                    </td>
                    <td v-else v-html="value"></td>
                </tr>
            </tbody>
        </table>

        <footer :class="$style.footer">
            <Anchor v-for="meta in data._meta"
                    :style="cursor"
                    :link="meta.link"
                    :key="meta.link"
                    :ico="meta.type"
                    :label="meta.label || meta.type"
                    :title="metaTitle(meta.type, data[caption])"
                />
        </footer>

    </article>
</template>

<script>
import VueTypes from 'vue-types';
import omit from 'lodash/omit';
import has from 'lodash/has';

import FormattedTime from '@/objects/Time';
import Anchor from '@/objects/Anchor';

let id = 0;

export default {

    data() {
        id += 1;
        return {
            id
        };
    },

    props: {
        styles: VueTypes.arrayOf(VueTypes.string).def(['brackets']),
        caption: VueTypes.string,
        data: VueTypes.object
    },

    components: {
        FormattedTime,
        Anchor
    },

    computed: {
        tableStyles() {
            return this.styles.map((s) => this.$style[`root--${s}`] || '').join(' ');
        },

        captionLabel() {
            return this.caption && has(this.data, this.caption) ? this.data[this.caption] : '';
        },

        hasBrackets() {
            return this.styles.indexOf('brackets') !== -1;
        },

        rows() {
            const obj = omit(this.data, [this.caption, 'id']);
            return Object.keys(obj).reduce((o, key) => {
                if (key.indexOf('_') !== 0) {
                    o[key] = obj[key]; //eslint-disable-line no-param-reassign
                }
                return o;
            }, {});
        }
    },

    methods: {
        metaTitle(type, title = '') {

            switch (type) {
            case 'video':
                return `Watch video for: ${title}`;

            case 'slides':
                return `Slides for: ${title}`;

            default:
                return '';
            }
        },

        isDate(heading) {
            return heading === 'to' || heading === 'from' || heading === 'date';
        }
    }
};
</script>

<style lang="scss" module src="./table.scss" />