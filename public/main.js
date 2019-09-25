import Vue from 'vue';
import VueRouter from 'vue-router';

import App from './App.vue';

import Main from './views/Main.vue';
import Set from './views/Set.vue';

Vue.use(VueRouter);

const routes = [
	{ name: 'main', path: '/', component: Main },
	{ name: 'set', path: '/set/:ticker', component: Set },
];

const router = new VueRouter({
	mode: 'history',
	routes
});

const app = new Vue({
	router,
	render: h => h(App),
	el: '#app'
});
