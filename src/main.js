import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/reset.css';

Vue.filter(`toTime`, function(ts) {
  if (!ts) {
    return '--';
  }

  var time = new Date(ts).toTimeString().slice(0, 8);
  var date = new Date(ts).toISOString().slice(0, 10);
  return date + ' ' + time;
});

Vue.config.productionTip = false;

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
