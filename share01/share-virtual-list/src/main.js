import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import App from './App.vue'
import VueLivePreview from "vue-live-preview";
import AppComponent from './components/virtualList'
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";

// CodeMirror options
Vue.use(VueLivePreview, {
  require: {
    '../components/virtualList': AppComponent
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
