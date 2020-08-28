<template>
	<div>
		<!-- 普通文章 -->
		<div class="normalPost" v-if="postData.type == 1">
			<div class="herder">
				<span class="iconfont iconjiantou2"></span>
				<div class="logo">
					<span class="iconfont iconnew"></span>
				</div>
				<div class="btnFollow">关注</div>
			</div>
			<div class="title">{{ postData.title }}</div>
			<div class="info">{{ postData.user.nickname }} {{ postData.create_date.split('T')[0] }}</div>
			<div class="content" v-html="postData.content"></div>
		</div>
		<!-- 视屏文章 -->
		<div class="videoPost" v-if="postData.type == 2">
			<video
				src="https://video.pearvideo.com/mp4/adshort/20200421/cont-1670293-15098199_adpkg-ad_hd.mp4"
				controls
				poster="../assets/touxiang.png"
			></video>
			<div class="info">
				<img src="@/assets/touxiang.png" alt class="avatar" />
				<div class="name">{{ postData.user.nickname }}</div>
				<!-- 对关注按钮, 用对象的形式动态设置 class 类名, 如果未关注则是红色底白字 -->
				<!-- key: value 的形式对应 类名: 是否添加这个类的布尔值 -->
				<div class="btnFollow">
					关注
				</div>
			</div>
			<div class="title">{{ postData.title }}</div>
		</div>

		<!-- 底部btn -->
		<div class="btns">
			<div class="btn lick">
				<span class="iconfont icondianzan"></span>
				{{ postData.like_length }}
			</div>
			<div class="btn weixin">
				<span class="iconfont iconweixin"></span>
				微信
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			postData: {}
		}
	},
	created() {
		console.log(this.$route.query.id)
		this.$axios({
			url: '/post/' + this.$route.query.id
		})
			.then(res => {
				//成功回调
				console.log(res.data.data)
				this.postData = res.data.data
			})
			.catch(err => {
				//错误处理
				console.log(err)
			})
	}
}
</script>

<style lang="less" scoped>
// 普通文章样式
.normalPost {
	padding: 0 15/360 * 100vw;
	.herder {
		display: flex;
		align-items: center;
		.iconnew {
			font-size: 54/360 * 100vw;
			padding-left: 10/360 * 100vw;
		}
		.logo {
			flex: 1;
		}
	}
	.title {
		font-size: 18/360 * 100vw;
		font-weight: bold;
	}
	.info {
		font-size: 14/360 * 100vw;
		color: #888;
		margin: 10/360 * 100vw 0;
	}
	.content {
		/deep/ img {
			max-width: 100%;
		}
	}
}
// 视频样式
.videoPost {
	.info {
		padding: 10/360 * 100vw;
		display: flex;
		.avatar {
			height: 26/360 * 100vw;
			width: 26/360 * 100vw;
			object-fit: cover;
		}
		.name {
			flex: 1;
			padding-left: 10/360 * 100vw;
		}
	}
	.title {
		padding-left: 10/360 * 100vw;
		font-size: 16/360 * 100vw;
	}
	video {
		width: 100%;
	}
}
// 底部按钮样式
.btns {
	display: flex;
	justify-content: space-around;
	margin-top: 30/360 * 100vw;
	.btn {
		border: 1px solid #888;
		line-height: 30/360 * 100vw;
		padding: 0 16/360 * 100vw;
		border-radius: 15/360 * 100vw;
	}
	.iconweixin {
		color: #3f0;
	}
}
.btnFollow {
	font-size: 12/360 * 100vw;
	border: 1px solid #bbb;
	color: #888;
	line-height: 28/360 * 100vw;
	padding: 0 16/360 * 100vw;
	border-radius: 14/360 * 100vw;
	&.notFollow {
		background: red;
		border-color: red;
		color: #fff;
	}
}
</style>
