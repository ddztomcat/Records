<template>
    <div class="chapter01">
        <h1>show me code</h1>
        <live-preview :code="code"></live-preview>
    </div>
</template>

<script>
import code from "./const";
export default {
    props: {},
    data() {
        return {
            list: new Array(1000),
            code: code
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
<style>
.CodeMirror{
  height:500px
}
</style>

<style scoped lang="scss">
.chapter01 {
    box-sizing: border-box;
    height: 100vh;
    h1 {
        font-size: 40px;
    }
}
</style>
