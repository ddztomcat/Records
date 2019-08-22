
const s = `<template>
<virtual-list
      :dynamic="true"
      :min-size="30"
      :total="items.length"
      height="200px"
    >
      <virtual-list-item
        class="item"
        v-for="(item, ind) in items"
        :index="ind"
        :key="item.id"
      >
        {{item.id + ' ' + item.text}}
      </virtual-list-item>
    </virtual-list>
</template>

<script>
import VirtualList from 'VirtualList'
import VirtualListItem from 'VirtualListItem'
function generateText() {
    let s = '是的活佛阿旺回复哦啊我护法还无法八王坟'
    let p = ''
    let kid = ~~(Math.random() * 30)
    for(let i = 0; i < kid; i++) {
      p += s
    }
    return p
}
const hehe = (() => {
    let a = []
    for(let i = 0; i < 100; i++)
    a.push({id: i,text: generateText()})
    return a
  })()
export default {
props: {},
data() {
    return {
        items: hehe,
    };
},
computed: {},
created() {
    //console.log(this.items)
},
mounted() {},
watch: {},
methods: {
    
},
components: {
    VirtualList,
    VirtualListItem
}
};
</script>
<style scoped lang="scss">
.item {
    min-height: 30px;
    /* line-height: 30px; */
    border-bottom: 1px solid burlywood;
  }
</style>
`
export default s