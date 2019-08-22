import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import App from './App.vue'
import VueLivePreview from "vue-live-preview";
import AppComponent from './components/virtualList'
import Demo from './components/demo'
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import { VirtualList, VirtualListItem } from 'virtual-list-ddz'
Vue.use(VirtualList).use(VirtualListItem)
// CodeMirror options
Vue.use(VueLivePreview, {
  require: {
    '../components/virtualList': AppComponent,
    '../components/demo': Demo,
    'VirtualList': VirtualList,
    'VirtualListItem': VirtualListItem
  },
    theme: "material",
    tabSize: 2,
    lineNumbers: true
});
Vue.use(VueRouter)
Vue.config.productionTip = false

const router = new VueRouter({
  routes
})


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
