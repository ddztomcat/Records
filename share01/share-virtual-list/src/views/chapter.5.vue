<template>
    <div class="chapter01">
        <h1>可变高度</h1>
        <ol>
            <li>通过传入精确的数组高度heightArray，每一项代表自己的高度</li>
            <li>通过item的mounted方法调用getBoundingClientRect获取真实dom高度，回调到父级，父级维护一个cacheHeightArray</li>
        </ol>
        <live-preview :code="code"></live-preview>
    </div>
</template>

<script>

import code from "./const.1.js";
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
    height: 350px;
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
