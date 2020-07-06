<template>
	<view class="chatTag">
		<view class="tag">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		
		
	}
</script>

<style lang="scss" scoped>
	.chatTag{
		position: absolute;
		width: 40upx;
		height: 40upx;
		border-radius: 50%;
		box-sizing: border-box;
		background-color: red;
		z-index: 100;
		top: -3%;
		right: -2%;
		.tag{
			color: #fff;
			text-align: center;
			font-size: 22upx;
		}
		
	}
</style>
