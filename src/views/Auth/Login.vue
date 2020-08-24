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
			placeholder="请输入用户名或手机号"
			:rule="/^1[03456789]\d{1,9}$/"
			err_message="请输入合法手机号"
			@valChange="settext"
		/>
		<AuthInput
			type="password"
			placeholder="请输入密码"
			:rule="/^[\u0021-\u007E]{3,16}$/"
			err_message="请输入合法密码"
			@valChange="setpswd"
		/>
		<AuthBtn btnText="登录" @handleClick="login" />
	</div>
</template>

<script>
import AuthInput from '@/components/AuthInput'
import AuthBtn from '@/components/AuthBtn'

export default {
	data() {
		return {
			username: '',
			password: ''
		}
	},

	components: {
		AuthInput,
		AuthBtn
	},
	methods: {
		settext(data) {
			this.username = data
		},
		setpswd(newpsw) {
			this.password = newpsw
		},
		login() {
			// 如果错误提示并直接return
			if (!this.username || !this.password) {
				this.$toast.fail('请填写完整信息')
				return
			}
			this.$axios({
				url: 'http://127.0.0.1:3000/login',
				method: 'post',
				data: {
					username: this.username,
					password: this.password
				}
			}).then(res => {
				//成功回调
				if (res.data.message == '登录成功') {
					this.$toast.success('登录成功')
					localStorage.setItem('token', res.data.data.token)
					localStorage.setItem('userId', res.data.data.user.id)
					setTimeout(() => {
						this.$router.push('/personal')
					}, 800)
				} else {
					// 处理错误
					// 由于即使密码错误, 响应状态依然是 200
					// 所以还是要在这个成功逻辑处理数据错误
					this.$toast.fail(res.data.message)
				}
			})
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
