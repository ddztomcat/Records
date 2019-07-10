<template>
    <div class="chapter01">
        <h1>virtual-list简单实现</h1>
        <img src="../assets/bg.jpg" style="width: 300px" alt="">
    </div>
</template>

<script>
export default {
    props: {},
    data() {
        return {
            list: new Array(1000)
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
.item {
    height: 30px;
    border: 1px solid #cccccc;
}
.chapter01 {
    box-sizing: border-box;
    height: 100vh;
    h1 {
        margin-top: 200px;
        font-size: 60px;
    }
}
</style>
