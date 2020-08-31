<template>
	<div>
		<div class="box">
			{{ num }}
			<muda :num="num - 1" v-if="num > 0"></muda>
		</div>
	</div>
</template>

<script>
export default {
	name: 'muda',
	props: ['num']
}
</script>

<style lang="less" scoped>
.box {
	margin: 10px;
	border: 1px solid red;
}
</style>
