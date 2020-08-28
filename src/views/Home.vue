<template>
	<div>
		<HomeHeader />
		<van-tabs v-model="activeCateIndex">
			<van-tab :title="category.name" v-for="category in cateList" :key="category.id">
				<van-list
					v-model="category.loading"
					:finished="category.finished"
					finished-text="这就是我的逃跑路线哒jojo"
					:immediate-check="false"
					@load="onLoad"
				>
					<PostItme v-for="post in category.list" :key="post.id" :postData="post"></PostItme>
				</van-list>
			</van-tab>
		</van-tabs>
	</div>
</template>

<script>
import HomeHeader from '@/components/HomeHeader'
import PostItme from '@/components/PostItme'
export default {
	data() {
		return {
			activeCateIndex: 0,
			cateList: []
		}
	},
	components: {
		HomeHeader,
		PostItme
	},
	created() {
		// 页面进入后, 自动获取栏目数据
		this.$axios({
			url: '/category'
		}).then(res => {
			// 数据获取完毕, 放到 data 中进行渲染
			this.cateList = res.data.data.map(category => {
				return {
					...category,
					list: [],
					pageIndex: 1,
					pageSize: 6,
					loading: false,
					finished: false
				}
			})
			this.loadPost()
		})
	},
	methods: {
		loadPost() {
			this.$axios({
				url: 'post/',
				params: {
					category: this.cateList[this.activeCateIndex].id,
					pageIndex: this.cateList[this.activeCateIndex].pageIndex,
					pageSize: this.cateList[this.activeCateIndex].pageSize
				}
			}).then(res => {
				// 数据获取完毕, 放到 data 中进行渲染

				// this.cateList[this.activeCateIndex].list = res.data.data
				this.cateList[this.activeCateIndex].list = [...this.cateList[this.activeCateIndex].list, ...res.data.data]

				this.cateList[this.activeCateIndex].loading = false

				// 还要进行最后一页的校验, 如果获取的数据长度, 比设定的要求小
				// 证明已经翻到最后一页, 将当前分类 finished 设为 true
				if (res.data.data.length < this.cateList[this.activeCateIndex].pageSize) {
					this.cateList[this.activeCateIndex].finished = true
				}
			})
		},
		onLoad() {
			// 我要加载下一页
			// 1. 将当前激活分类的页码加一
			this.cateList[this.activeCateIndex].pageIndex += 1

			// 2. 发送请求
			this.loadPost()
		}
	},
	watch: {
		activeCateIndex() {
			if (this.cateList[this.activeCateIndex].list.length == 0) {
				this.loadPost()
			}
		}
	}
}
</script>

<style lang="less" scoped>
/deep/ .van-tab__text {
	color: #000;
}
</style>
