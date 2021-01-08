import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Node from '../views/Node.vue';
import NodeCreate from '../views/node/Create.vue';
import Search from '../views/Search.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/node',
    name: 'Node',
    component: Node,
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
  },
  {
    path: '/node/create',
    name: 'CreateNode',
    component: NodeCreate,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
