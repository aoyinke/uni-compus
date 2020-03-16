<template>
	<view class="personalDetail">
		<view class="tapBar">
			<view class="tapBar-bg">
				<image :src="userInfo.userBg" mode="scaleToFill"></image>
			</view>
			<view class="userAvatar">
				<image :src="userInfo.avatar" mode="scaleToFill"></image>
				<text>{{userInfo.userName}}</text>
			</view>
		</view>
		<view class="main">
			<view class="showBar">
				<view class="showBar-item left">
					<text class="showBar-item-first">{{userInfo.good}}</text>
					<text class="showBar-item-last">获赞</text>
				</view>
				<view class="showBar-item middle">
					<text class="showBar-item-first">{{userInfo.like}}</text>
					<text class="showBar-item-last">关注</text>
				</view>
				<view class="showBar-item right">
					<text class="showBar-item-first">{{userInfo.follower}}</text>
					<text class="showBar-item-last">粉丝</text>
				</view>
			</view>

			<view class="userDetail">
				<tap-bar :tap-bars="content"></tap-bar>
			</view>
		</view>
	</view>
</template>

<script>
	import tapBar from '@/components/tapBar.vue'
	export default {
		data() {
			return {
				userInfo: {
					avatar: '../../static/test/timg.jpg',
					good: "11k",
					like: "11",
					follower: "12",
					userBg: '../../static/test/1.jpg',
					userName: "天堂屠夫"
				},
				content: [{
						name: "主页"
					},
					{
						name: "社团"
					}, {
						name: "动态"
					}
				]
			};
		},
		components: {
			tapBar
		}
	}
</script>

<style lang="scss" scoped>
	*{
		background-color: #EEEEEE;
	}
	.tapBar {

		.tapBar-bg image {
			width: 100%;

		}

		.userAvatar {
			z-index: 100;
			position: absolute;
			top: 10%;
			right: 34%;
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
	.main{
		border-radius: 10upx;
		box-shadow: 3upx 3upx 5upx 5upx #EEEEEE;
		.showBar {
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 20upx solid #EEEEEE;
			.showBar-item {
				display: flex;
				flex-direction: column;
				justify-content: center;
				.showBar-item-first{
					font-weight: bold;
				}
				.showBar-item-last{
					color: darkgray;
					font-weight: 200;
				}
			}
			
				
		}
		.userDetail{
			margin-top: 40upx;
		}
	}
	
	
	.left{
		padding-left: 80upx;
		
		
	}
	.right{
		padding-right: 80upx;
	}
	
</style>
