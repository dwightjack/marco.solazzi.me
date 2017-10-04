<template>
    <transition
        appear
        name="loader-animation"
    >
        <header :class="$style.root" v-show="active">
            <div :class="['h1', $style.body, { [$style.isEntering] : entering }]">
                <span :class="$style.line">Geeks.query(</span>
                <span :class="$style.linePre">&apos;/usr/<mark class="u-type--mark">marco+solazzi</mark>&apos;,</span>
                <span :class="$style.linePre">&apos;job=<mark class="u-type--mark">frontend</mark>&apos;</span>
                <span :class="$style.line">).then((me) =&rsaquo;<span :class="$style.dots" />{{dots}}</span>
            </div>
        </header>
    </transition>
</template>

<script>
import VueTypes from 'vue-types';
import anime from 'animejs';

export default {

    props: {
        active: VueTypes.bool.def(false)
    },

    data() {
        return {
            entering: false,
            dots: ''
        };
    },

    watch: {
        entering(v) {
            if (v === true) {

                setTimeout(() => {
                    this.dots = '.';
                    let rounds = 0;
                    const maxRounds = 2;

                    const interval = setInterval(() => {
                        if (rounds >= maxRounds) {
                            clearInterval(interval);
                            this.$emit('loader-end');
                        } else {
                            if (this.dots.length === 3) {
                                this.dots = '';
                                rounds += 1;
                                return;
                            }
                            this.dots += '.';
                        }

                    }, 625);
                }, 1700);

            }
        }
    },

    mounted() {
        this.$nextTick(() => {
            this.entering = true;
        });
    }

};
</script>

<style lang="scss" module src="./loader.scss" />
