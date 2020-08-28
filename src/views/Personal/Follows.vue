<template>
	<div>
		<!-- 关注头部部分 -->
		<HeaderNav title="我的关注"></HeaderNav>
		<!-- 内容 -->
		<div class="list">
			<div v-for="itme in list" :key="itme.id" class="itme">
				<img v-if="itme.head_img" :src="$axios.defaults.baseURL + itme.head_img" alt="" class="avatar" />
				<img v-else src="../../assets/touxiang.png" alt="" class="avatar" />
				<div class="info">
					<div class="name">{{ itme.nickname }}</div>
					<div v-if="itme.create_date" class="date">{{ itme.create_date.split('T')[0] }}</div>
				</div>
				<div class="cancelBtn" @click="load(itme.id)">
					取消关注
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import HeaderNav from '@/components/HeaderNav'

export default {
	data() {
		return {
			list: []
		}
	},
	components: {
		HeaderNav
	},
	methods: {
		jiazai() {
			this.$axios({
				url: '/user_follows'
			})
				.then(res => {
					//成功回调
					this.list = res.data.data
					console.log(this.list)
				})
				.catch(err => {
					//错误处理
					console.log(err)
				})
		},
		load(id) {
			console.log('1')
			this.$axios({
				url: '/user_unfollow/' + id
			})
				.then(res => {
					//成功回调
					console.log(res)
					this.$axios({
						url: '/user_follows'
					})
						.then(res => {
							//成功回调
							this.list = res.data.data
							console.log(this.list)
						})
						.catch(err => {
							//错误处理
							console.log(err)
						})
				})
				.catch(err => {
					//错误处理
					console.log(err)
				})
		}
	},
	created() {
		// 页面加载完渲染数据
		this.jiazai()
	}
}
</script>

<style lang="less" scoped>
.list {
	.itme {
		display: flex;
		align-items: center;
		padding: 20/360 * 100vw;
		border-bottom: 1px solid #e4e4e4;
		.info {
			flex: 1;
			padding-left: 10/360 * 100vw;
			.name {
				font-size: 16/360 * 100vw;
			}
			.date {
				font-size: 16/360 * 100vw;
				color: #c4c4c4;
			}
		}
		.avatar {
			height: 40/360 * 100vw;
			width: 40/360 * 100vw;
			object-fit: cover;
			border-radius: 50%;
		}
		.cancelBtn {
			background: #e4e4e4;
			font-size: 14/360 * 100vw;
			line-height: 28/360 * 100vw;
			padding: 0 14/360 * 100vw;
			border-radius: 14/360 * 100vw;
		}
	}
}
</style>
