<template>
	<view class="tapBar">
		<view class="tapBar-bg">
			<image :src="userAvatar" mode="scaleToFill"></image>
		</view>
		<view class="userAvatar">
			<image :src="userBg" mode="scaleToFill"></image>
			<text>{{userName}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		props: {
			userBg: {
				type: String

			},
			userAvatar: {
				type: String

			},
			userName: {
				type: String

			}
		}
	}
</script>

<style lang="scss" scoped>
	.tapBar {
		
		height: 38vh;
		position: relative;
		.tapBar-bg image {
			width: 100%;

		}

		.userAvatar {
			z-index: 100;
			position: absolute;
			top: 30%;
			right: 38%;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;

			image {
				height: 150upx;
				width: 150upx;
				border-radius: 50%;
			}

			text {
				color: #fff;
				font-weight: bold;
				text-shadow: 10upx 10upx 3upx dimgray;
			}





		}
	}
</style>
