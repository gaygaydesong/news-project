<template>
	<div>
		<van-list v-model="loading" :finished="finished" finished-text="这就是我的逃跑路线哒jojo" @load="onLoad">
			<div class="title" v-for="(post, index) in list" :key="index">{{ post }}</div>
		</van-list>
	</div>
</template>

<script>
export default {
	data() {
		return {
			list: [1, 2, 3, 4, 5, 6, 7, 8, 9],
			loading: false,
			finished: false
		}
	},
	methods: {
		onLoad() {
			// 异步更新数据
			// setTimeout 仅做示例，真实场景中一般为 ajax 请求
			setTimeout(() => {
				for (let i = 0; i < 6; i++) {
					this.list.push(this.list.length + 1)
				}

				// 加载状态结束
				this.loading = false

				// 数据全部加载完成
				if (this.list.length >= 40) {
					this.finished = true
				}
			}, 2000)
		}
	}
}
</script>

<style lang="less" scoped>
.title {
	width: 100%;
	height: 300/360 * 100vw;
}
</style>
