<template>
	<view>
		<uni-nav-bar left-icon="back" title="小组的社区" @clickLeft="clickLeft"></uni-nav-bar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			clickLeft() {
				uni.navigateBack({
					animationDuration: 300,
					animationType: 'pop-out'
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
