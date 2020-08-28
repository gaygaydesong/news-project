import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Test from '@/views/Test.vue'
import PostDetail from '@/views/PostDetail.vue'

import Login from '@/views/Auth/Login.vue'
import Register from '@/views/Auth/Register.vue'

import PersonalIndex from '@/views/Personal/Index.vue'
import PersonalEdit from '@/views/Personal/Edit.vue'
import Follows from '@/views/Personal/Follows.vue'
import Star from '@/views/Personal/Star.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/postdetail',
		name: 'postdetail',
		component: PostDetail
	},
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/login',
		name: 'login',
		component: Login
	},
	{
		path: '/register',
		name: 'register',
		component: Register
	},
	{
		path: '/personal',
		name: 'personal',
		component: PersonalIndex,
		meta: {
			needAuth: true
		}
	},
	{
		path: '/edit',
		name: 'edit',
		component: PersonalEdit,
		meta: {
			needAuth: true
		}
	},
	{
		path: '/follows',
		name: 'follows',
		component: Follows,
		meta: {
			needAuth: true
		}
	},
	{
		path: '/test',
		name: 'test',
		component: Test
	},
	{
		path: '/star',
		name: 'star',
		component: Star,
		meta: {
			needAuth: true
		}
	}
]

const router = new VueRouter({
	routes
})

export default router
