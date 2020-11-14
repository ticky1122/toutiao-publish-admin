import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './styles/index.less'
import { ElementTiptapPlugin } from 'element-tiptap';
import 'element-tiptap/lib/index.css';

Vue.use(ElementUI);
Vue.use(ElementTiptapPlugin,{lang:"zh",spellcheck:true});
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
