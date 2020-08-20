<template>
	<div>
		<h1>login页面</h1>
		<div>
			<span iconfont iconicon-test></span>
		</div>
		<div>
			<span iconfont iconnew></span>
		</div>
		<div>
			<input type="text" />
		</div>
		<div>
			<input type="text" />
		</div>
		<div>
			<button class="">{{ btnText }}</button>
		</div>
	</div>
</template>

<script>
import AuthInput from '@/components/AuthInput'
import AuthBtn from '@/components/AuthBtn'

export default {
	data() {
		return {}
	},
	methods: {
		btnText: '登入'
	},
	components: {
		AuthInput,
		AuthBtn
	}
}
</script>

<style lang="less" scoped></style>
