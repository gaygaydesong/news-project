<template>
	<div class="btn" @click="handleClick">{{ btnText }}</div>
</template>

<script>
export default {
	props: ['btnText'],
	methods: {
		handleClick() {
			this.$emit('handleClick')
		}
	}
}
</script>

<style lang="less" scoped>
.btn {
	width: 100%;
	background-color: #cc3300;
	color: #fff;
	font-size: 18/360 * 100vw;
	line-height: 48/360 * 100vw;
	border-radius: 24/360 * 100vw;
	text-align: center;
	margin-top: 40/360 * 100vw;
}
</style>
