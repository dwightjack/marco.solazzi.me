<template>
    <ul :class="$style.root">
        <li v-for="item in items" :class="$style.item" :key="item.label">
            <span :class="$style.label">
                <Ico v-if="item.ico" :name="item.ico" :class="$style.ico" />{{ item.label }}
            </span>
            <div :class="$style.body">
                <slot :data="item.data" />
            </div>
        </li>
    </ul>
</template>

<script>

import VueTypes from 'vue-types';
import Ico from '@/objects/Ico';

export default {

    props: {
        items: VueTypes.arrayOf(VueTypes.shape({
            label: VueTypes.string,
            ico: VueTypes.string,
            data: VueTypes.arrayOf(VueTypes.object)
        }))
    },

    components: {
        Ico
    }

};
</script>

<style lang="scss" module src="./data-set.scss" />