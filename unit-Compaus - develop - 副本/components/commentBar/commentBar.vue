<template>
	<view class="contaier">
		<view class="comment-item">
			<view class="comment-item-left">
				<image :src="commentorAvatar" mode=""></image>
			</view>
			<view class="comment-item-right">
				<view class="comment-area">
					<view class="userName">
						<text class="">{{commentorName}}</text>
					</view>
					<view class="commentContent">
						<text class="">{{commentContent}}</text>
					</view>

				</view>

				<view class="like">
					<like-icon></like-icon>
					<text class="likeNum">{{likeNum}}</text>
				</view>

			</view>
			
				
			
		</view>
		<view class="comment-item-bottom"></view>
	</view>
</template>

<script>
	import likeIcon from '@/components/common/commonIcon/likeIcon.vue'
	export default {
		data() {
			return {

			};
		},
		props: {
			commentorAvatar: {
				type: String,
				required: true
			},
			commentorName: {
				type: String,
				required: true
			},
			commentContent: {
				type: String,
				required: true
			},
			likeNum: {
				type: Number,
				required: true
			}
		},
		components:{
			likeIcon
		}
	}
</script>

<style lang="scss" scoped>
	.comment-item {
		display: flex;
		justify-content: space-between;
		align-items: center;

		.comment-item-left {
			image {
				width: 60upx;
				height: 60upx;
				border-radius: 50%;
				margin: 10upx;

			}
		}

		.comment-item-right {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 85%;

			.userName {
				color: darkgray;
				font-size: 24upx;
			}

			.commentContent {
				font-weight: 400;
			}

			.like {
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				margin-right: 20upx;
				.likeNum{
					color: darkgray;
				}

			}
		}

		&-bottom {
			border-bottom: 2upx solid #EEEEEE;
			height: 20upx;
			display: block;
		}
	}
</style>
