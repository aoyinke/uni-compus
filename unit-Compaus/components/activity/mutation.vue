<template>
	<view class="mutation">
		<view class="mutation-left">
			<view class="like tag">
				<like-icon :activityId="activityId"></like-icon>
			</view>
			<view class="comment tag">
				<image src="../../static/index/chat.png" mode=""></image>
			</view>
			<view class="good tag">
				<image src="../../static/index/good.png" mode=""></image>
			</view>
		</view>
		<view class="mutation-right">
			<view class="share tag">
				<image src="../../static/index/share.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	import likeIcon from '@/components/common/commonIcon/likeIcon.vue'
	export default {
		data() {
			return {
				activityId:1
			};
		},
		components:{
			likeIcon
		},
		props:{
			
		}
	}
</script>

<style lang="scss" scoped>
	.mutation {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 10upx;

		.mutation-left {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.like {
				margin-left: 10upx !important;
			}
		}

		.mutation-right {
			.share {
				margin-right: 10upx;
			}
		}

		.mutation-left,
		.mutation-right {
			.tag {
				margin-left: 30upx;

				image {
					width: 50upx;
					height: 50upx;
				}

			}

		}
	}
</style>
