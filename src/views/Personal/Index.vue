<template>
	<div>
		<!-- 这里是个人中心上半部分 -->
		<div class="profile">
			<img v-if="userInfo.head_img" :src="$axios.defaults.baseURL + userInfo.head_img" alt="" class="avatar" />
			<img v-else src="../../assets/touxiang.png" alt="" class="avatar" />
			<div class="info">
				<div class="name">
					<span
						class="iconfont"
						:class="{
							iconxingbienan: userInfo.gender == 1,
							iconxingbienv: userInfo.gender == 0
						}"
					></span>
					{{ userInfo.nickname }}
				</div>
				<div v-if="userInfo.create_date" class="date">{{ userInfo.create_date.split('T')[0] }}</div>
			</div>
			<span class="iconfont iconjiantou1"></span>
		</div>
		<!-- 这里是封装条形组件部分 -->
		<PersonalBar leftText="我的关注" rightText="关注的用户" @handleClick="$router.push('/follows')" />
		<PersonalBar leftText="我的跟帖" rightText="跟帖/回复" />
		<PersonalBar leftText="我的收藏" rightText="文章/视频" @handleClick="$router.push('/star')" />
		<PersonalBar leftText="设置" @handleClick="$router.push('/edit')" />
		<AuthBtn btnText="退出登录" @handleClick="logL" />
	</div>
</template>

<script>
import PersonalBar from '@/components/PersonalBar'
import AuthBtn from '@/components/AuthBtn'

export default {
	data() {
		return {
			userInfo: {}
		}
	},
	components: {
		PersonalBar,
		AuthBtn
	},
	created() {
		this.$axios({
			url: '/user/' + localStorage.getItem('userId'),
			headers: {
				// Authorization: localStorage.getItem('token')
				// 标准写法 在 token 前加一个 'Bearer ' 标识
				Authorization: 'Bearer ' + localStorage.getItem('token')
			},
			method: 'get'
		})
			.then(res => {
				//成功回调
				this.userInfo = res.data.data
			})
			.catch(err => {
				//错误处理
				console.log(err)
			})
	},
	methods: {
		logL() {
			this.$dialog
				.confirm({
					title: '提示',
					message: '您确定要退出登录吗？'
				})
				.then(() => {
					// 点击清理全部本地数据
					localStorage.clear()
					// 跳转到登录页，不用push是因为浏览器的返回上一级可能会回到退出登录前的页面
					this.$router.replace('/login')
				})
		}
	}
}
</script>

<style lang="less" scoped>
.profile {
	padding: 24/360 * 100vw;
	display: flex;
	align-items: center;
	border-bottom: 4/360 * 100vw solid #e4e4e4;
	.avatar {
		width: 70/360 * 100vw;
		height: 70/360 * 100vw;
		// cover 在保持长宽比的情况下, 尽可能覆盖全部位置
		object-fit: cover;
		// contain 在保持长宽比的情况下, 尽可能显示图片
		// object-fit: contain;
		border-radius: 50%;
	}
	.info {
		flex: 1;
		padding-left: 16/360 * 100vw;
		.name {
			font-size: 16/360 * 100vw;
		}
		.date {
			font-size: 14/360 * 100vw;
			color: #888;
			margin-top: 6/360 * 100vw;
		}
		.iconxingbienan {
			color: #6cf;
		}
		.iconxingbienv {
			color: pink;
		}
	}
}
</style>
