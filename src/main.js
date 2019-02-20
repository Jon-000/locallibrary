import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// use global filter
import { normalizeDate } from './common/filters';
Vue.filter('normalizeDate', normalizeDate);


import App from './App.vue'

Vue.config.productionTip = false


// 0. 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)

// 1. 定义 (路由) 组件。
// 可以从其他文件 import 进来
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }
import Catalog from './views/catalog/index'
import Book from './views/catalog/book/index'
import BookCreate from './views/catalog/book/bookcreate'
import BookDetail from './views/catalog/book/bookdetail'
import BookUpdate from './views/catalog/book/bookupdate'
import Author from './views/catalog/author'
import Genre from './views/catalog/genre'
import Bookinstance from './views/catalog/bookinstance'
import HelloWorld from './components/HelloWorld'
// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
  { path: '/foo', component: Foo },
  // { path: '/bar', component: Bar },
  {
    path: '/catalog', component: Catalog, name: 'catalog',
    children: [
      {path: 'book/create', component: BookCreate, name: "bookcreate"},
      {path: 'book/:id/update', component: BookUpdate},
      {path: 'book/:id', component: BookDetail},
      {
        path: 'book', component: Book, name: "所有图书",
        children: []
      },
      {path: 'author', component: Author, name: '所有作者'},
      {path: 'genre', component: Genre, name: 'genre'},
      {path: 'bookinstance', component: Bookinstance, name: 'bookinstance'},
    ]
  },
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
