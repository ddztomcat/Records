<template>
    <div
        :style="`height: ${heightItem * keep}px; overflow-y: scroll`"
        @scroll="handleScroll($event)"
    >
        <div :style="`padding-top: ${offsetTop}px; padding-bottom: ${offsetBottom}px `">
            <div class="item" v-for="item in viewList" :key="item.id">{{item.value}}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "virtual-list",
    props: {},
    data() {
        return {
            list: (function() {
                let k = new Array(1000).fill(0);
                k = k.map((item, ind) => ({id: ind, value: ind}))
                return k
            })(),
            heightItem: 30,
            keep: 5,
            start: 0,
            offsetTop: 0,
            buffer: 5
        };
    },
    computed: {
        totalHeight() {
            return this.list.length * this.heightItem;
        },
        offsetBottom() {
            return (
                this.totalHeight - this.keep * this.heightItem - this.offsetTop
            );
        },
        viewList() {
            return this.list.slice(this.start, this.start + this.keep);
        }
    },
    created() {
        this.handleScroll = this.getThrottle(this.handleScroll, 200);
    },
    mounted() {},
    methods: {
        handleScroll(event) {
            let ot = event.target.scrollTop;
            this.start = Math.floor(ot / this.heightItem);
            this.offsetTop = this.start * this.heightItem;
            console.log(ot, this.start);
        },
        getThrottle(fn, time) {
            // 节流 默认每20ms 触发一次滚动，但保证最后一个滚动一定会触发
            let t = Date.now();
            let th = null;
            return function() {
                let arg = Array.prototype.slice.call(arguments);
                let p = Date.now();
                if (p - t >= time) {
                    clearTimeout(th);
                    fn.apply(this, arg);
                    t = p;
                } else {
                    clearTimeout(th);
                    th = setTimeout(() => {
                        fn.apply(this, arg);
                        t = Date.now();
                    }, time);
                }
            };
        }
    },
    components: {}
};
</script>

<style scoped lang="scss">
.item {
    height: 30px;
    border: 1px solid #ccc;
    box-sizing: border-box;
}
</style>
