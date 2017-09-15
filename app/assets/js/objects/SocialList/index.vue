<template>
    <List :class="$style.root">
        <li
            v-for="item in items"
            :key="item.type"
            :class="{'u-only-print': (item.type == 'link'), 'u-only-screen': (item.type == 'pdf')}"
        >
            <Ico :name="item.type" /> <a :href="item.url" target="_blank" rel="noopener noreferrer">{{ item.label }}</a>
        </li>
    </List>
</template>

<script>
import VueTypes from 'vue-types';
import List from '@/objects/List';
import Ico from '@/objects/Ico';

export default {
    props: {
        items: VueTypes.arrayOf(VueTypes.shape({
            type: VueTypes.string,
            url: VueTypes.string,
            label: VueTypes.string
        }))
    },
    components: {
        List,
        Ico
    }
};
</script>


<style lang="scss" module src="./social-list.scss" />