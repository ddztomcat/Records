<template>
    <div :style="`height: ${totalHeight}px; overflow-y: scroll`" @scroll="handleScroll($event)">
        <div :style="`padding-top: ${offsetTop}px; padding-bottom: ${offsetBottom}px`">
            <div class="item" v-for="(item) in list.slice(start, start + keep)" :key="item.id">{{item.value}}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {},
    data() {
        return {
            heightItem: 30,
            keep: 5,
            start: 0,
            offsetTop: 0,
            list: (function() {
                let k = new Array(1000).fill(0);
                k = k.map((item, ind) => ({id: ind, value: ind}))
                return k
            })(),
        };
    },
    computed: {
        totalHeight() {
            return this.keep * this.heightItem;
        },
        allTotalHeight() {
            return this.list.length * this.heightItem;
        },
        // offsetTop() {
        //     return 0;
        // },
        offsetBottom() {
            return this.allTotalHeight - this.offsetTop - this.totalHeight;
        }

    },
    created() {},
    mounted() {},
    watch: {},
    methods: {
        handleScroll(event) {
            let ot = event.target.scrollTop;
            this.start = Math.floor(ot / this.heightItem);
            this.offsetTop = this.start * this.heightItem;
            console.log(ot, this.start);
        }
    },
    components: {}
};
</script>

<style scoped lang="scss">
.item {
    height: 30px;
}
</style>
