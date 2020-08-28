<template>
	<div>
		<!-- 图片的长度在1-2之间显示一张图 -->
		<div class="one" v-if="postData.type == 1 && postData.cover.length >= 1 && postData.cover.length < 3">
			<div class="left">
				<div class="title">
					{{ postData.title }}
				</div>
				<div class="info">
					{{ postData.user.nickname }}
					{{ postData.comment_length }}跟帖
				</div>
			</div>
			<div class="imgs">
				<img :src="postData.cover[0].url" alt="" />
			</div>
		</div>
		<!-- 图片的长度在3或者大于3显示3张 -->
		<div class="two" v-if="postData.type == 1 && postData.cover.length >= 3">
			<div class="title">
				{{ postData.title }}
			</div>
			<div class="imgs">
				<img :src="postData.cover[0].url" alt="" />
				<img :src="postData.cover[1].url" alt="" />
				<img :src="postData.cover[2].url" alt="" />
			</div>
			<div class="info">
				{{ postData.user.nickname }}
				{{ postData.comment_length }}跟帖
			</div>
		</div>
		<!-- 视频 -->
		<div class="three" v-if="postData.type == 2 && postData.cover.length >= 1">
			<div class="title">
				{{ postData.title }}
			</div>
			<div class="imgs">
				<img :src="postData.cover[0].url" alt="" />
				<span class="iconfont iconshipin"></span>
			</div>
			<div class="info">
				{{ postData.user.nickname }}
				{{ postData.comment_length }}跟帖
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ['postData']
}
</script>

<style lang="less" scoped>
// 第一个单图片
.one {
	display: flex;
	padding: 10/360 * 100vw;
	border-bottom: 1px solid #e4e4e4;
	.left {
		flex: 1;
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		padding-right: 10/360 * 100vw;
		.title {
			font-size: 16/360 * 100vw;
			color: #333;
		}
		.info {
			font-size: 14/360 * 100vw;
			color: #888;
		}
	}
	.imgs > img {
		height: 76/360 * 100vw;
		width: 120/360 * 100vw;
		object-fit: cover;
	}
}
// 多图片
.two {
	padding: 10/360 * 100vw;
	border-bottom: 1px solid #e4e4e4;
	.title {
		font-size: 16/360 * 100vw;
		color: #333;
	}
	.imgs {
		display: flex;
		justify-content: space-between;
		margin: 10/360 * 100vw 0;
		img {
			width: 33%;
			height: 74/360 * 100vw;
			object-fit: cover;
		}
	}
	.info {
		font-size: 14/360 * 100vw;
		color: #888;
	}
}
// 视频
.three {
	padding: 10/360 * 100vw;
	border-bottom: 1px solid #e4e4e4;
	.title {
		font-size: 16/360 * 100vw;
		color: #333;
	}
	.imgs {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 10/360 * 100vw 0;
		img {
			height: 170/360 * 100vw;
			width: 100%;
			object-fit: cover;
		}
		.iconshipin {
			position: absolute;
			font-size: 50/360 * 100vw;
			color: #fff;
			background-color: #ccc;
			border-radius: 50%;
		}
	}
	.info {
		font-size: 14/360 * 100vw;
		color: #888;
	}
}
</style>
