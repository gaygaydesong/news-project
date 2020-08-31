<template>
	<div>
		<Main v-for="(comment, index) in commentList" :key="index" :commentData="comment"></Main>
	</div>
</template>

<script>
import Main from '../components/Comment/Main'
export default {
	data() {
		return {
			commentList: []
		}
	},
	components: {
		Main
	},
	created() {
		this.$axios({
			url: '/post_comment/1'
		})
			.then(res => {
				//成功回调
				console.log(res.data.data)
				this.commentList = res.data.data
			})
			.catch(err => {
				//错误处理
				console.log(err)
			})
	}
}
</script>

<style lang="scss" scoped></style>
