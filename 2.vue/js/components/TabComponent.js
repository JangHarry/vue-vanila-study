export default {
    template: '#tabs',
    props: ['tabs', 'selectedTab'],
    data() {
        return {
            selected : this.tabted
        }
    },

    methods: {
        onClickTab(tab) {
            this.$emit('@change', tab)
        }
    }
}