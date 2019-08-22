
const s = `<template>
<div
    :style="\`height: \${heightItem * keep}px; overflow-y: scroll\`"
    @scroll="handleScroll($event)"
>
    <div :style="\`padding-top: \${offsetTop}px; padding-bottom: \${offsetBottom}px \`">
        <div class="item" v-for="(item, ind) in viewList" :key="ind">{{ind}}</div>
    </div>
</div>
</template>

<script>
export default {
name: "virtual-list",
props: {},
data() {
    return {
        list: new Array(1000),
        heightItem: 30,
        keep: 5,
        start: 0,
        offsetTop: 0
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
created() {},
mounted() {},
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
border: 1px solid #ccc;
box-sizing: border-box;
}
</style>
`
export default s