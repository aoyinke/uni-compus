<template>
	<view>
		<block v-for="(item,idx) in content" :key="idx">
			<view class="groupNotification">
				<view class="groupTopBar">
					<view class="groupTopBar-left">
						<view class="groupLogo">
							<image :src="item.grouplogo" mode="scaleToFill"></image>
						</view>
						<view class="groupName">
							<text class="groupName-first">{{item.groupName}}</text>
							<text class="groupName-last">{{item.activityStartTime}}</text>
						</view>
					</view>
					<view class="groupTopBar-right">
						<view class="notiDetail">
							<button type="primary" size="mini">关注</button>
							<image src="../static/index/more.png" mode="scaleToFill"></image>
						</view>
					</view>
				</view>

				<template v-if="item.activityPropagate.type=='img'">
					<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" class="swiper">
						<swiper-item v-for="(img,id) in item.activityPropagate.src" :key="id">
							<view class="swiper-item">
								<image :src="img" mode=""></image>
							</view>
						</swiper-item>
					</swiper>
				</template>
				<template>
					<view></view>
				</template>

				<view class="footer">
					<view class="mutation">
						<view class="mutation-left">
							<view class="like tag">
								<image src="../static/index/like_1.png" mode=""></image>
							</view>
							<view class="comment tag">
								<image src="../static/index/chat.png" mode=""></image>
							</view>
							<view class="good tag">
								<image src="../static/index/good.png" mode=""></image>
							</view>
						</view>
						<view class="mutation-right">
							<view class="share tag">
								<image src="../static/index/share.png" mode=""></image>
							</view>
						</view>

					</view>
					<view class="commentDetail">
						<view class="activityInfo">
							<text class="activityInfo-left">{{item.hotNum}}热度</text>
							<text class="activityInfo-right">{{item.commentNum}}评论</text>
						</view>
						<block v-for="(comment,index) in item.commentDetail" :key="index">
							<view class="commentDetail-P">
								<text class="commentDetail-P-left">{{comment.commentor}}: </text>
								<text class="commentDetail-P-right">{{comment.commentContent}}</text>
							</view>
						</block>
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		props:{
			content:Array
		},
		mounted() {
			
		}
		
	}
</script>

<style lang="scss" scoped>
	.groupNotification {
		border-bottom: 10upx solid #EEEEEE;
		.groupTopBar {
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex-direction: row;
			flex-wrap: nowrap;
			height: 100upx;
			border: 0.5px solid #EEEEEE;

			.groupTopBar-left {
				display: flex;
				justify-content: center;
				align-items: center;
				margin: 20upx;

				.groupLogo {
					image {
						height: 80upx;
						width: 80upx;
						border-radius: 50%;

					}
				}

				.groupName {
					display: flex;
					justify-content: center;
					margin-left: 10upx;
					flex-direction: column;
					flex-wrap: nowrap;

					.groupName-first {
						font-weight: bold;

					}

					.groupName-last {
						color: darkgray;
						font-size: 20upx;
					}
				}
			}

			.groupTopBar-right {
				.notiDetail {
					button {
						color: #fff;
						background-color:#191970;
					}

					image {
						width: 60upx;
						height: 60upx;
					}
				}
			}

		}
		.swiper-item{
			image{
				width: 100%;
			}
		}
		.footer {
			border-top: 0.5upx solid #EEEEEE;

			.mutation {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top:10upx;
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

			.commentDetail {
				margin-top: 30upx;

				.activityInfo {
					.activityInfo-left {
						color: darkgray;
						margin-left: 10upx;
					}

					.activityInfo-right {
						color: darkgray;
						margin-left: 15upx;
					}
				}

				.commentDetail-P {
					.commentDetail-P-left {
						font-weight: 800;
						margin-left: 10upx;
					}

					.commentDetail-P-right {}
				}
			}
		}
	}
</style>
