<template>
	<div>
		<HeaderNav title="我的收藏"></HeaderNav>
		<PostItme v-for="post in list" :key="post.id" :postData="post"></PostItme>
	</div>
</template>

<script>
import HeaderNav from '@/components/HeaderNav'
import PostItme from '@/components/PostItme'
export default {
	data() {
		return {
			list: []
		}
	},
	components: {
		HeaderNav,
		PostItme
	},
	created() {
		this.$axios({
			url: '/user_star'
		})
			.then(res => {
				//成功回调
				console.log(res)
				this.list = res.data.data
			})
			.catch(err => {
				//错误处理
				console.log(err)
			})
	}
}
</script>

<style lang="less" scoped></style>
