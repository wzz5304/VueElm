import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import goods from './components/goods/goods';
import ratings from './components/ratings/ratings';
import seller from './components/seller/seller';
import './common/stylus/index.styl';
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.config.productionTip = false;
/* eslint-disable no-new */
// 2. 定义路由
const routes = [
  { path: '/goods', component: goods },
  { path: '/ratings', component: ratings },
  { path: '/seller', component: seller }
];
// 3. 创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({
  routes: routes, // （缩写）相当于 routes: routes
  linkActiveClass: 'active'
});
// 4. 创建和挂载根实例。
new Vue({
  router,
  template: '<App/>',
  components: { App }
}).$mount('#app');
// router.push('/goods');// 默认跳转
