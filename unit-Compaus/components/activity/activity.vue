<template>
	<view>
		<block v-for="(item,idx) in activityInfo" :key="idx">
			
			<view class="groupNotification">
				<user-top-bar :groupInfo="item.groupInfo" :activityStartTime="item.deadline"
				 ></user-top-bar>
				
					<view class="mainBar">

						<template v-if="item.title">							
							<view class="activity-title" @click="goActivityDetail(item.id,item.type)">
								<text>{{item.title}}</text>
							</view>
						</template>
						<template v-if="item.videoSrc">
							<view class="video">
								<video :src="item.videoSrc" :page-gesture="true" controls></video>
							</view>
						</template>
						<template v-else="item.imgs.length">
							<swiper :indicator-dots="true" class="swiper">
								<swiper-item v-for="(img,id) in item.imgs" :key="id" >
									<view class="swiper-item">
										<image :src="img" mode=""></image>
									</view>
								</swiper-item>
							</swiper>
						</template>
						
						
						<template v-if="item.description">
							<view class="description text-line-4" @click="goActivityDetail(item.id)">
								<text>{{item.description}}</text>
							</view>
						</template>
						
					</view>
				
				<view class="footer">
					<mutation></mutation>
					<view class="commentDetail">
						<view class="activityInfo">
							<text class="activityInfo-left">{{item.like_nums}}热度</text>
							<text class="activityInfo-right">{{item.comments.length}}评论</text>
						</view>
						<block v-for="(comment,index) in item.comments" :key="index">
							<view class="commentDetail-P">
								<text class="commentDetail-P-left">{{comment.nickName}}: </text>
								<text class="commentDetail-P-right">{{comment.content}}</text>
							</view>
						</block>
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	import userTopBar from '@/components/activity/userTopBar.vue'
	import mutation from '@/components/activity/mutation.vue'
	import goDetail from '@/components/uni-compus-components/uniCompus-goDetail.vue'
	import {baseConfig} from '@/config/index.js'
	export default {
		watch:{
			activityInfo:{
				deep: true,
				handler(newValue, oldValue) {
					console.log("newValue",newValue)  
				　　for (let i = 0; i < newValue.length; i++) {  
				　　　　if (oldValue[i] != newValue[i]) {  
				　　　　　　this.activityInfo = newValue
						
				　　　　}  
				　　}  
				}　　　　
			}
		},

		data() {
			return {
				
			}
		},
		props: {
			activityInfo: {
				type:Array,
				default:[]
			},
			contentIndex:{
				type:Number,
				default:0
			}
		},
		mounted() {
			console.log("onload",this.activityInfo)

		},
		updated(){
			// console.log("updated",this.activityInfo)
		},
		components: {
			userTopBar,
			mutation,
			goDetail
		},
		methods: {
			goActivityDetail(id){
				let type = 100
				switch(this.contentIndex){
					case 0:
						type = 100
						break
					case 1:
						type = 200
						break
					case 2:
						type = 400
						break
				}
				uni.navigateTo({
					url:`/pages/activityDetail/activityDetail?activityId=${id}&type=${type}`
				})
			}
		},

	}
</script>

<style lang="scss" scoped>
	.video{
		
		video{
			width: 100%;
		}
	}
	.mainBar{
		min-height: 300rpx;
	}
	.activity-title{
		margin: 20upx;
		text-align: center;
		font: {
			weight:bold;
			size: 1.5em;
			
		};
	}
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
						background-color: #191970;
					}

					image {
						width: 60upx;
						height: 60upx;
					}
				}
			}

		}

		.swiper-item {
			image {
				width: 100%;
			}
		}

		.footer {
			border-top: 0.5upx solid #EEEEEE;

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

			.commentDetail {
				margin-top: 30upx;
				margin-left: 20rpx;
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

	.description {
		margin: 0 20upx;
		font-weight: 500;
	}
	
</style>
