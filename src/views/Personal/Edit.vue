<template>
	<div class="edit_set">
		<HeaderNav title="编辑资料" @goClick="$router.push('/personal')" />
		<div class="imgs">
			<!-- 自定义上传样式 -->
			<van-uploader :after-read="afterRead">
				<img v-if="userInfo.head_img" :src="$axios.defaults.baseURL + userInfo.head_img" alt="" class="avatar" />
				<img v-else src="../../assets/touxiang.png" alt="" class="avatar" />
			</van-uploader>
		</div>
		<PersonalBar leftText="昵称" :rightText="userInfo.nickname" @handleClick="isShowNickname = true" />
		<PersonalBar leftText="密码" rightText="*****" @handleClick="isShowPassword = true" />
		<PersonalBar leftText="性别" :rightText="userInfo.gender == 1 ? '小哥哥' : '小姐姐'" @handleClick="isShow = true" />
		<van-dialog v-model="isShowNickname" title="编辑昵称" show-cancel-button @confirm="setNickname">
			<van-field v-model="newNickname" placeholder="请输入要修改的昵称" />
		</van-dialog>
		<van-dialog v-model="isShowPassword" title="编辑昵称" show-cancel-button @confirm="setPassword">
			<van-field v-model="newPassword" placeholder="请输入要修改的密码" />
		</van-dialog>
		<van-action-sheet v-model="isShow" :actions="genderList" cancel-text="取消" @select="setGender" />
	</div>
</template>

<script>
import HeaderNav from '@/components/HeaderNav'
import PersonalBar from '@/components/PersonalBar'
export default {
	created() {
		// 页面一加载获取数据并渲染
		this.loadPage()
	},
	data() {
		return {
			userInfo: {},
			isShowNickname: false,
			isShowPassword: false,
			newNickname: '',
			newPassword: '',
			genderList: [
				{
					name: '小哥哥',
					gender: 1
				},
				{
					name: '小姐姐',
					gender: 0
				}
			],
			isShow: false
		}
	},
	components: {
		HeaderNav,
		PersonalBar
	},
	methods: {
		loadPage() {
			this.$axios({
				url: '/user/' + localStorage.getItem('userId')
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
		setNickname() {
			this.daze({ nickname: this.newNickname })
		},
		setPassword() {
			this.daze({ password: this.newPassword })
		},
		setGender(itme) {
			console.log(itme.gender)
			this.daze({ gender: itme.gender })
			this.isShow = false
		},
		daze(newData) {
			this.$axios({
				url: '/user_update/' + localStorage.getItem('userId'),
				method: 'post',
				data: newData
			})
				.then(res => {
					//成功回调
					console.log(res)
					// 修改成功再获取一次数据渲染达到刷新的效果
					this.loadPage()
				})
				.catch(err => {
					//错误处理
					console.log(err)
				})
		},
		// 图片上传
		afterRead(fileobj) {
			// 此时可以自行将文件上传至服务器
			console.log(fileobj)
			const fd = new FormData()
			fd.append('file', fileobj.file)
			this.$axios({
				url: '/upload',
				method: 'post',
				data: fd
			})
				.then(res => {
					//成功回调
					this.daze({ head_img: res.data.data.url })
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
.edit_set {
	padding: 20/360 * 100vw;
	.imgs {
		height: 138/360 * 100vw;
		display: flex;
		align-items: center;
		justify-content: center;
		.avatar {
			width: 70/360 * 100vw;
			height: 70/360 * 100vw;
			object-fit: cover;
			border-radius: 50%;
		}
	}
}
</style>
