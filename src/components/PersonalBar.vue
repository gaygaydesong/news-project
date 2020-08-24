<template>
	<div class="barWrapper" @click="handleClick">
		<div class="label">{{ leftText }}</div>
		<div class="desc">{{ rightText }}</div>
		<span class="iconfont iconjiantou1"></span>
	</div>
</template>

<script>
export default {
	props: ['leftText', 'rightText'],
	methods: {
		handleClick() {
			this.$emit('handleClick')
		}
	}
}
</script>

<style lang="less" scoped>
.barWrapper {
	display: flex;
	padding: 12/360 * 100vw 20/360 * 100vw;
	padding-left: 0;
	margin-left: 20/360 * 100vw;
	border-bottom: 1px solid #e4e4e4;
	.label {
		font-size: 14/360 * 100vw;
		color: #333;
	}
	.desc {
		flex: 1;
		text-align: right;
		font-size: 14/360 * 100vw;
		color: #888;
		padding-right: 6/360 * 100vw;
	}
}
</style>
