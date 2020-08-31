<template>
	<div class="commentWrapper">
		<div class="top">
			<img
				v-if="commentData.user.head_img"
				:src="$axios.defaults.baseURL + commentData.user.head_img"
				alt=""
				class="avatar"
			/>
			<img v-else src="@/assets/touxiang.png" alt="" class="avatar" />
			<div class="info">
				<div class="name">{{ commentData.user.nickname }}</div>
				<div class="date">{{ commentData.create_date.split('T')[0] }}</div>
			</div>
			<div class="replyBtn">回复</div>
		</div>
		<Parent v-if="commentData.parent" :parentData="commentData.parent"></Parent>

		<div class="mainContent">
			{{ commentData.content }}
		</div>
	</div>
</template>

<script>
import Parent from '@/components/Comment/Parent'
export default {
	components: {
		Parent
	},
	props: ['commentData'],
	created() {}
}
</script>

<style lang="less" scoped>
.commentWrapper {
	padding: 10/360 * 100vw;
	border-bottom: 1px solid #bbb;
	.top {
		display: flex;
		margin-bottom: 10/360 * 100vw;
		.avatar {
			width: 36/360 * 100vw;
			height: 36/360 * 100vw;
			object-fit: cover;
			border-radius: 50%;
		}
		.info {
			flex: 1;
			padding-left: 10/360 * 100vw;
			.name {
				font-size: 16/360 * 100vw;
				color: #333;
			}
			.date {
				margin-top: 2px;
				font-size: 14/360 * 100vw;
				color: #888;
			}
		}
		.replyBtn {
			font-size: 14/360 * 100vw;
			color: #888;
		}
	}
	.mainContent {
		font-size: 16/360 * 100vw;
		color: #333;
		margin-top: 10/360 * 100vw;
	}
}
</style>
