<template>
	<div class="navWrapper">
		<span class="iconfont iconjiantou2" @click="go"></span>
		<div class="title">{{ title }}</div>
	</div>
</template>

<script>
export default {
	props: ['title'],
	methods: {
		go(e) {
			this.$emit('goClick', e)
		}
	}
}
</script>

<style lang="less" scoped>
.navWrapper {
	display: flex;
	align-items: center;
	padding: 16/360 * 100vw;
	.title {
		flex: 1;
		text-align: center;
	}
}
</style>
