<template>
	<div class="inputWrapper">
		<input
			:type="type"
			:placeholder="placeholder"
			v-model="newVal"
			:class="{
				success: istrue,
				error: !istrue
			}"
			@change="checkValid"
		/>
	</div>
</template>

<script>
export default {
	data() {
		return {
			newVal: '',
			istrue: true
		}
	},
	props: ['type', 'placeholder', 'rule', 'err_message'],
	watch: {
		newVal(newRule) {
			if (this.rule.test(newRule)) {
				this.istrue = true
			} else {
				this.istrue = false
			}
			this.$emit('valChange', newRule)
		}
	},
	methods: {
		checkValid() {
			if (!this.istrue) {
				this.$toast.fail(this.err_message)
			}
		}
	}
}
</script>

<style lang="less" scoped>
.inputWrapper {
	input {
		width: 100%;
		border: none;
		outline: none;
		border-bottom: 1px solid #888;
		font-size: 18/360 * 100vw;
		line-height: 50/360 * 100vw;
		margin-bottom: 10/360 * 100vw;
	}
	.error {
		border-color: red;
	}
}
</style>
