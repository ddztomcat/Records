<template>
    <div class="chapter01">
        <h1>优化</h1>
        <ol>
            <li>onscroll 事件节流</li>
            <li>增加buffer缓冲区</li>
        </ol>
        <live-preview :code="code"></live-preview>
    </div>
</template>

<script>

import code from "./const";
export default {
    props: {},
    data() {
        return {
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
.CodeMirror {
    height: 500px;
}
</style>

<style scoped lang="scss">
.chapter01 {
    box-sizing: border-box;
    height: 100vh;
    h1 {
        font-size: 40px;
    }
    ol {
        text-align: left;
        font-size: 20px;
        font-weight: bold;
    }
    ul {
        text-align: left;
    }
}
</style>
