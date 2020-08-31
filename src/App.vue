<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
export default {}
</script>

<style lang="less">
// 字体图标
@import url('http://at.alicdn.com/t/font_1426139_h6vn3jbl5q.css');

// 清除默认样式
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

a {
	color: inherit;
}

a:hover {
	text-decoration: none;
}

ul,
li,
ol {
	list-style: none;
}
</style>
