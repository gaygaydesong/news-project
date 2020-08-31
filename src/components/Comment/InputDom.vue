<template>
	<div class="inputWrapper">
		<!-- 1. 未激活样式 input -->
		<div class="disable" v-if="!isShowTextarea">
			<input type="text" @focus="showTextarea" :value="content" />
			<div class="commentWrapper">
				<span class="iconfont iconpinglun-"></span>
				<div class="num">1024</div>
			</div>
			<span class="iconfont iconshoucang"></span>
			<span class="iconfont iconfenxiang"></span>
		</div>
		<!-- 2. 已激活样式 textarea -->
		<div class="enable" v-if="isShowTextarea">
			<textarea rows="3" v-model="content" ref="textarea" @blur="hideTextarea"></textarea>
			<div class="domBtn" @click="send">发送</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			isShowTextarea: false,
			content: '',
			parent_id: ''
		}
	},
	methods: {
		showTextarea() {
			this.isShowTextarea = true

			// 当渲染结束后运行的代码
			this.$nextTick(() => {
				this.$refs.textarea.focus()
			})
		},
		hideTextarea() {
			setTimeout(() => {
				this.isShowTextarea = false
				this.parent_id = ''
			}, 50)
		},
		send() {
			if (!this.content) {
				return
			}
			console.log(this.$route.query.id)
			this.$axios({
				url: '/post_comment/' + this.$route.query.id,
				method: 'post',
				data: { content: this.content }
			})
				.then(res => {
					//成功回调
					console.log(res.data)
					this.content = ''
				})
				.catch(err => {
					//错误处理
					console.log(err)
				})
		}
	}
}
</script>

<style lang="less" scoped>
.inputWrapper {
	position: fixed;
	bottom: 0;
	left: 0;
	background: #e4e4e4;
	width: 100%;
	.disable {
		display: flex;
		justify-content: space-between;
		padding: 10/360 * 100vw;
		input {
			width: 180/360 * 100vw;
			height: 30/360 * 100vw;
			line-height: 30/360 * 100vw;
			background-color: #d7d7d7;
			border: none;
			outline: none;
			border-radius: 16/360 * 100vw;
			padding: 0 16/360 * 100vw;
		}
		.iconfont {
			font-size: 24/360 * 100vw;
		}
		.commentWrapper {
			position: relative;
			.num {
				position: absolute;
				top: -4px;
				left: 5px;
				font-size: 12/360 * 100vw;
				color: #fff;
				background-color: red;
				padding: 1px 4px;
				border-radius: 6px;
			}
		}
	}
}
.enable {
	display: flex;
	align-items: flex-end;
	padding: 16/360 * 100vw;
	textarea {
		flex: 1;
		padding: 12/360 * 100vw;
		background-color: #d7d7d7;
		border-radius: 16/360 * 100vw;
		border: none;
		outline: none;
	}
	.domBtn {
		background-color: red;
		color: #fff;
		font-size: 14/360 * 100vw;
		padding: 0 18/360 * 100vw;
		line-height: 26/360 * 100vw;
		border-radius: 13/360 * 100vw;
		margin-left: 10/360 * 100vw;
	}
}
</style>
