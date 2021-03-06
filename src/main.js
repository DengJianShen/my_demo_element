// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import goods from './components/goods/goods';
import seller from './components/seller/seller';
import ratings from './components/ratings/ratings';

Vue.use(VueRouter);
Vue.use(VueResource);

// 定义在全局中使用,作为中转跨组件数据传递枢纽
const bus = new Vue();
Vue.prototype.$bus = bus;

const routes = [
  { path: '/goods', component: goods },
  { path: '/seller', component: seller },
  { path: '/ratings', component: ratings }
];

const router = new VueRouter({
  routes: routes
});

router.push('/goods');

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
