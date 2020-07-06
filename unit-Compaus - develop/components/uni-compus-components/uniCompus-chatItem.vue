<template>

	<uni-swipe-action>
		<uni-swipe-action-item :options="options" @click="onClick" @change="change">
			<view class="chatItem">
				<view class="chatItem-left">
					<view class="useAvatar">
						<image :src="userAvatar" mode=""></image>
						<chatTag v-if="messageNum">{{messageNum}}</chatTag>
					</view>
					<view class="userInfo">
						<view class="userName">
							<text>{{userName}}</text>
						</view>
						<view class="latestInfo">
							<text>{{latestInfo}}</text>
						</view>
					</view>
				</view>
				<view class="chatItem-right">
					<view class="sendTime">
						<text>{{sendTime}}</text>
					</view>
				</view>
			</view>
		</uni-swipe-action-item>
	</uni-swipe-action>

</template>

<script>
	import chatTag from '@/components/uni-compus-components/uniCompus-chatTag.vue'
	import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
	import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue'
	export default {
		data() {
			return {
				options: [{
					text: '置顶',
					style: {
						backgroundColor: '#007aff'
					}
				}, {
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}]
			};
		},
		components: {
			chatTag,
			uniSwipeAction,
			uniSwipeActionItem
		},
		props: {
			sendTime: {
				type: String,
				required: true
			},
			userName: {
				type: String,
				required: true
			},
			latestInfo: {
				type: String,
				default: "暂无消息"
			},
			userAvatar: {
				type: String,
				required: true
			},
			messageNum: {
				type: String,
				default: "0"
			}
		},
		methods: {
			onClick(e) {
				console.log('当前点击的是第' + e.index + '个按钮，点击内容是' + e.content.text)
			},
			change(open) {
				console.log('当前开启状态：' + open)
			}
		},
		mounted() {
			console.log(this.messageNum)
		}
	}
</script>

<style lang="scss" scoped>
	@mixin container-flex-center {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	@mixin container-flex-space-between {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	@mixin normal-chat {
		color: #a4b0be;

		font: {
			size: 20upx;
			family: Arial;
		}
	}

	

	.chatItem {
		@include container-flex-space-between;
		margin: 20upx;
		border-bottom: 1px solid #f1f2f6;
		width: 100%;

		&-left {
			@include container-flex-center;

			.useAvatar {
				image {
					width: 100upx;
					height: 100upx;
					border-radius: 50%;
				}

				position: relative;
			}

			.userInfo {
				margin-left: 30upx;

				.userName {
					font-size: 1em;
					font-weight: 800;
				}

				.latestInfo {
					@include normal-chat;
				}
			}
		}

		&-right {
			.sendTime {
				@include normal-chat;
			}

			margin-right: 40upx;
		}
	}
</style>
