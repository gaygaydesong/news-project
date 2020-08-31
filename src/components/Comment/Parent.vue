<template>
	<div>
		<Parent :parentData="parentData.parent" v-if="parentData.parent"></Parent>
		<div class="parentWarpper">
			<div class="info">
				<div class="name">
					{{ parentData.user.nickname }}
				</div>
				<div class="date">
					{{ parentData.create_date.split('T')[0] }}
				</div>
				<div class="replyBtn">
					回复
				</div>
			</div>
			<div class="mainContent">
				{{ parentData.content }}
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ['parentData'],
	name: 'Parent'
}
</script>

<style lang="less" scoped>
.parentWarpper {
	border: 1px solid #e4e4e4;
	padding: 10/360 * 100vw;
	.info {
		display: flex;
		align-items: center;
		.name {
			font-size: 14/360 * 100vw;
		}
		.date {
			flex: 1;
			padding-left: 10/360 * 100vw;
			font-size: 12/360 * 100vw;
		}
		.replyBtn {
			font-size: 14/360 * 100vw;
			color: #888;
		}
	}
	.mainContent {
		padding: 10/360 * 100vw 0;
		color: #333;
	}
}
</style>
