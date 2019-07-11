<template>
    <div class="chapter01">
        <ol>
            <li>可滚动区域</li>
            <li>视口区域</li>
        </ol>
        <p>适应场景：主要解决长列表，由于数据较多，首次渲染时间较长的问题</p>
        <img src="../assets/img.jpeg" style="width: 600px" alt="">
        <ul>
            <li>监听父级滚动事件，获取scrollTop</li>
            <li>计算出视口的第一项start和最后一项end</li>
            <li>设置偏移量，使数据刚好显示在视口</li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {},
    data() {
        return {
        };
    },
    computed: {},
    created() {},
    mounted() {},
    watch: {},
    methods: {},
    components: {}
};
</script>

<style scoped lang="scss">
.chapter01 {
    box-sizing: border-box;
    height: 100vh;
    padding: 50px 100px;
    ol {
        text-align: left;
        font-size: 20px;
        font-weight: bold;
    }
    ul {
        text-align: left;
    }
    h1 {
        margin-top: 200px;
        font-size: 60px;
    }
}
</style>
