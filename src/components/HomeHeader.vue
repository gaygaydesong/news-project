<template>
	<div class="headerWrapper">
		<span class="iconfont iconnew"></span>
		<div class="searchWrapper">
			<span class="iconfont iconsearch"></span>
			搜索新闻
		</div>
		<span class="iconfont iconwode" @click="$router.push('/personal')"></span>
	</div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.headerWrapper {
	background: red;
	color: #fff;
	display: flex;
	align-items: center;
	padding: 0 12/360 * 100vw;
	.iconnew {
		font-size: 54/360 * 100vw;
	}
	.searchWrapper {
		flex: 1;
		text-align: center;
		background: rgba(255, 255, 255, 0.5);
		line-height: 36/360 * 100vw;
		margin: 0 20/360 * 100vw;
		border-radius: 18/360 * 100vw;
		font-size: 16/360 * 100vw;
	}
	.iconwode {
		font-size: 32/360 * 100vw;
		opacity: 0.7;
	}
}
</style>
