<template>
	<div>
		<!-- 普通文章 -->
		<div class="normalPost" v-if="postData.type == 1">
			<div class="herder">
				<span class="iconfont iconjiantou2" @click="$router.push('/')"></span>
				<div class="logo">
					<span class="iconfont iconnew"></span>
				</div>
				<div
					class="btnFollow"
					:class="{
						hasFollow: postData.has_follow,
						notFollow: !postData.has_follow
					}"
					@click="handleFollow"
				>
					{{ postData.has_follow ? '已关注' : '关注' }}
				</div>
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
				<div
					class="btnFollow"
					:class="{
						hasFollow: postData.has_follow,
						notFollow: !postData.has_follow
					}"
					@click="handleFollow"
				>
					{{ postData.has_follow ? '已关注' : '关注' }}
				</div>
			</div>
			<div class="title">{{ postData.title }}</div>
		</div>

		<!-- 底部btn -->
		<div class="btns">
			<div class="btn lick" :class="{ hasLike: postData.has_like }" @click="handleLike">
				<span class="iconfont icondianzan"></span>
				{{ postData.like_length }}
			</div>
			<div class="btn weixin">
				<span class="iconfont iconweixin"></span>
				微信
			</div>
		</div>
		<div class="comments">
			<h2>精彩跟帖</h2>
			<div class="list" v-if="commentList.length > 0">
				<CommentMain v-for="comment in commentList" :key="comment.id" :commentData="comment"></CommentMain>
				<div class="btnMoreComment" @click="$router.push('/morecomment?id=' + $router.query.id)">
					更多跟帖
				</div>
			</div>
			<div v-else class="empty">评论抢沙发</div>
		</div>
		<!-- 调用底部评论 -->
		<CommentInputDom></CommentInputDom>
	</div>
</template>

<script>
import CommentMain from '@/components/Comment/Main'
import CommentInputDom from '@/components/Comment/InputDom'
export default {
	data() {
		return {
			postData: {},
			commentList: []
		}
	},
	components: {
		CommentMain,
		CommentInputDom
	},
	created() {
		this.$axios({
			url: '/post/' + this.$route.query.id
		})
			.then(res => {
				//成功回调

				this.postData = res.data.data
			})
			.catch(err => {
				//错误处理
				console.log(err)
			})

		this.$axios({
			url: '/post_comment/' + this.$route.query.id
		})
			.then(res => {
				//成功回调
				const { data } = res.data
				if (data.length > 3) {
					data.length = 3
				}
				this.commentList = data
			})
			.catch(err => {
				//错误处理
				console.log(err)
			})
	},
	methods: {
		handleFollow() {
			// 1. 如果已关注, 发出取消请求
			if (this.postData.has_follow) {
				this.$axios({
					// url 的 id 是文章 id 但是现在关注针对的是用户
					url: '/user_unfollow/' + this.postData.user.id
				}).then(res => {
					if (res.data.message == '取消关注成功') {
						this.postData.has_follow = false
					}
				})
			} else {
				this.$axios({
					url: '/user_follows/' + this.postData.user.id
				}).then(res => {
					if (res.data.message == '关注成功') {
						this.postData.has_follow = true
					}
				})
			}
			// 2. 如果未关注,发出关注请求
		},
		handleLike() {
			this.$axios({
				// 点赞是关于文章的, 直接获取 url 上带的数据即可
				url: '/post_like/' + this.$route.query.id
			}).then(res => {
				// 发送完, 虽然是同一个接口, 但是响应不一样
				// 我们就可以根据响应, 来修改当前信息
				if (res.data.message == '点赞成功') {
					// 1. 修改是否已经点赞
					this.postData.has_like = true
					// 2. 修改点赞数量
					this.postData.like_length += 1
				} else if (res.data.message == '取消成功') {
					this.postData.has_like = false
					this.postData.like_length -= 1
				}
			})
		}
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
	margin: 30/360 * 100vw 0;

	.btn {
		border: 1px solid #888;
		line-height: 30/360 * 100vw;
		padding: 0 16/360 * 100vw;
		border-radius: 15/360 * 100vw;
		&.hasLike {
			border-color: red;
			color: red;
		}
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

.comments {
	border-top: 4px solid #e4e4e4;
	h2 {
		text-align: center;
		padding: 24/360 * 100vw 0;
		font-size: 20/360 * 100vw;
	}
	.empty {
		font-size: 16/360 * 100vw;
		color: #888;
		line-height: 100/360 * 100vw;
		text-align: center;
	}
	.btnMoreComment {
		margin: 80/360 * 100vw auto;
		font-size: 14/360 * 100vw;
		line-height: 26/360 * 100vw;
		padding: 0 14/360 * 100vw;
		border: 1px solid #888;
		border-radius: 14/360 * 100vw;
		width: 120/360 * 100vw;
		text-align: center;
	}
}
</style>
