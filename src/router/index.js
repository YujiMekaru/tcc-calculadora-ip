import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			component: Home
		},
		{
			path: '/department',
			component: () => import('../views/Department.vue')
		},
		{
			path: '/ipv4',
			component: () => import('../views/Ipv4Calculator.vue')
		},
		{
			path: '/ipv6',
			component: () => import('../views/Ipv6Calculator.vue')
		},
	],
})

export default router