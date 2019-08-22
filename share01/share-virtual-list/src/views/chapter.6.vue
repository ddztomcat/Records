<template>
    <div class="chapter01">
        <h1>show me code</h1>
        <live-preview
            code="<template>
    <virtual-list></virtual-list>
</template>

<script>
    import virtualList from '../components/demo'
export default {
    props: {},
    data() {
        return {};
    },
    computed: {},
    created() {},
    mounted() {},
    watch: {},
    methods: {},
    components: {
        virtualList
    }
};
</script>"
        ></live-preview>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    props: {},
    data() {
        return {
            code: ""
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
