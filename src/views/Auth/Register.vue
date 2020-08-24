<template>
	<div class="page">
		<div>
			<span class="iconfont iconicon-test"></span>
		</div>
		<div class="logo">
			<span class="iconfont iconnew"></span>
		</div>
		<AuthInput
			type="text"
			placeholder="用户名/手机号码"
			:rule="/^1[3456789]\d{9}$/"
			err_message="请输入正确手机号"
			@valChange="setUsername"
		/>
		<AuthInput
			type="text"
			placeholder="昵称"
			:rule="/^1[3456789]\d{9}$/"
			err_message="请输入合法昵称"
			@valChange="setUsernick"
		/>
		<AuthInput
			type="password"
			placeholder="请输入密码"
			:rule="/^[\u0021-\u007E]{4,16}$/"
			err_message="请输入合法密码"
			@valChange="setpswd"
		/>
		<AuthBtn btnText="注册" @handleClick="zhuce" />
	</div>
</template>

<script>
import AuthInput from '@/components/AuthInput'
import AuthBtn from '@/components/AuthBtn'
export default {
	data() {
		return {
			username: '',
			password: '',
			nick: ''
		}
	},
	// 注册组件
	components: {
		AuthInput,
		AuthBtn
	},
	methods: {
		setUsername(name) {
			this.username = name
		},
		setUsernick(nicheng) {
			this.nick = nicheng
		},
		setpswd(pswd) {
			this.password = pswd
		},

		zhuce() {
			console.log(this.username)
			console.log(this.nick)
			console.log(this.password)
		}
	}
}
</script>

<style lang="less" scoped>
.page {
	padding: 20/360 * 100vw;
}
.iconicon-test {
	font-size: 26/360 * 100vw;
}
.logo {
	text-align: center;
}
.iconnew {
	font-size: 126/360 * 100vw;
	color: red;
}
</style>
