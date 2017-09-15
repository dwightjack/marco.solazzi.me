<script>
export default {

    name: 'List',

    render(h) {

        const { root, item } = this.$style;

        const children = this.$slots.default.map((child) => {
            if (!child.tag) { return child; }

            if (child.tag === 'li') {
                const classes = child.data.class;
                child.data.class = Array.isArray(classes) ? [...classes, item] : [classes, item]; //eslint-disable-line quote-props, no-param-reassign
                return child;
            }

            return h('li', { 'class': item }, [child]); //eslint-disable-line quote-props
        });

        return h('ul', { 'class': root }, children); //eslint-disable-line quote-props
    }
};
</script>

<style lang="scss" module src="./list.scss" />
