import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入 axios
import axios from 'axios'
// 第三方库
import Vant from 'vant'
import { Dialog } from 'vant'
// 2. 引入组件 css 文件
import 'vant/lib/index.css'
// 3. 注册 vant ui 组件库的标签
Vue.use(Vant)
Vue.use(Dialog)

router.beforeEach((to, from, next) => {
	// if (to.path == '/personal') {
	// 	// 如果是个人中心，判断token是否存在
	// 	if (localStorage.getItem('token')) {
	// 		// 有token才放行
	// 		next()
	// 	} else {
	// 		// 如果没有token，则返回登录页面
	// 		router.push('/login')
	// 	}
	// }
	// // 在判断个人中心页面的时候，其他的页面也需要放行，所以在if外用next()
	// next()
	// 在路由给需要验证的页面添加meta属性，判断请求头中meta的needAuth是否为true  然后再判断是否带token
	if (to.meta.needAuth) {
		if (localStorage.getItem('token')) {
			// 有token才放行
			next()
		} else {
			// 如果没有token，则返回登录页面
			router.push('/login')
		}
	}
	next()
})

// 给引入的 axios 设置默认的基准路径
if (process.env.NODE_ENV == 'development') {
	axios.defaults.baseURL = 'http://127.0.0.1:3000'
} else {
	axios.defaults.baseURL = 'http://157.122.54.189:9083'
}

// 由于在组件外弹窗单独引入弹窗组件
import { Toast } from 'vant'
// 响应拦截器
axios.interceptors.response.use(res => {
	const reg = /^4\d{2}$/
	if (reg.test(res.data.statusCode)) {
		// 弹窗提示
		Toast.fail(res.data.message || '系统错误')
	}
	// res.data 是 axios 本身带有的数据  所以不用this
	if (res.data.message == '用户信息验证失败') {
		// 我们知道现在用户信息错误
		// 1. 清空原来错误的用户信息
		localStorage.clear()
		// 2. 跳转到登录页
		router.replace('/login')
		return
	}
	return res
})

// 响应拦截器
axios.interceptors.request.use(
	config => {
		// 在发送请求之前做些什么，例如加入token
		// 添加token的条件，必须有token再加上没有Authorization
		if (localStorage.getItem('token') && !config.headers.Authorization) {
			config.headers.Authorization = 'Bearer ' + localStorage.getItem('token')
		}
		return config
	},
	err => {
		// 对相应错误的处理
		return Promise.reject(err)
	}
)

// 将 axios 挂载到 vue原型中
Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
	router,
	render: h => h(App)
}).$mount('#app')
