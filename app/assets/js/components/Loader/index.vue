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

export default {

    props: {
        active: VueTypes.bool.def(false),
        assetLoaded: VueTypes.bool.def(false)
    },

    data() {
        return {
            entering: false,
            dots: ''
        };
    },

    watch: {

        assetLoaded(v) {
            if (v === true) {
                this.maxRounds = Math.max(this.maxRounds, Math.ceil(this.rounds / 3));
            }
        }
    },

    created() {
        this.rounds = 0;
        this.maxRounds = 2;
    },

    mounted() {
        this.$nextTick(() => {
            this.entering = true;

            setTimeout(() => {
                this.addDot();
                this.$emit('loader-start');
                this.interval = setInterval(this.runLoader, 625);
            }, 1700);

        });
    },

    methods: {
        addDot() {
            if (this.dots.length === 3) {
                this.dots = '';
                this.rounds += 1;
                return;
            }

            this.dots += '.';
        },

        runLoader() {
            if (this.rounds >= this.maxRounds) {

                if (this.assetLoaded === false) {
                    this.maxRounds += 1;
                    this.addDot();
                    return;
                }

                this.stopLoader();
                this.$emit('loader-end');
            } else {
                this.addDot();
            }

        },

        stopLoader() {
            if (this.interval) {
                clearInterval(this.interval);
            }
        }
    }

};
</script>

<style lang="scss" module src="./loader.scss" />
