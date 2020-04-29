<template>
	<view class="personalDetail">
		<uni-nav-bar left-icon="back" title="详情页" @clickLeft="clickLeft"></uni-nav-bar>
		<person-show-with-bg :userAvatar="userInfo.avatar" :userBg="userInfo.userBg" :userName="userInfo.userName"></person-show-with-bg>
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
				<tap-bar :tap-bars="content" :tap-index="tapIndex" @taptab="tabtap"></tap-bar>
				<view class="uni-tab-bar">
					<swiper :current="tapIndex" @change="tabChange" class="swiper-box" :style="{height:scrollHeight + 'px'}">
						<swiper-item>
							<view class="swiper-item">
								<view class="accountInfo">
									<view class="accountInfo-account">
										<text>账号信息</text>
									</view>
									<view class="accountInfo-account-num">
										<text>仓鼠Id: {{userInfo.userId}}</text>
									</view>
									<view class="accountInfo-bottom"></view>
									<view class="accountInfo-account">
										<text>个人信息</text>
									</view>
									<view class="accountInfo-account-num">
										<text>职业 {{userInfo.job}}</text>
									</view>
									<view class="accountInfo-bottom"></view>


								</view>
							</view>
						</swiper-item>

						<swiper-item>
							<scroll-view scroll-y="true" class="list">
								<activity :activityInfo="activityInfo" ref="activityRef"></activity>
							</scroll-view>
						</swiper-item>

						<swiper-item>
							<view class="swiper-item"></view>
						</swiper-item>
					</swiper>

				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import tapBar from '@/components/tapBar.vue'
	import personShowWithBg from '@/components/common/personShowWithBg.vue'


	export default {
		data() {
			return {
				scrollHeight: 0,
				activityInfo: [{
						groupLogo: "../../static/test/waterfull/1.jpg",
						groupName: "比赛大佬组",
						activityStartTime: "17小时前",
						activityPropagate: {
							type: "img",
							src: ['../../static/test/waterfull/1.jpg', '../../static/test/waterfull/2.jpg',
								'../../static/test/waterfull/3.jpg'
							]
						},
						hotNum: 80,
						commentNum: 6,
						commentDetail: [{
								commentor: "天堂屠夫",
								commentContent: "nb....."
							},
							{
								commentor: "天堂屠夫",
								commentContent: "tnb....."
							},
							{
								commentor: "天堂屠夫",
								commentContent: "cznb....."
							}
						]
					},
					{
						groupLogo: "../../static/test/waterfull/1.jpg",
						groupName: "比赛大佬组",
						activityStartTime: "17小时前",
						activityPropagate: {
							type: "img",
							src: ['../../static/test/waterfull/1.jpg', '../../static/test/waterfull/2.jpg',
								'../../static/test/waterfull/3.jpg'
							]
						},
						hotNum: 80,
						commentNum: 6,
						commentDetail: [{
								commentor: "天堂屠夫",
								commentContent: "nb....."
							},
							{
								commentor: "天堂屠夫",
								commentContent: "tnb....."
							},
							{
								commentor: "天堂屠夫",
								commentContent: "cznb....."
							}
						]
					}
				],
				tapIndex: 0,
				userInfo: {
					avatar: '../../static/test/waterfull/1.jpg',
					good: "11k",
					like: "11",
					follower: "12",
					userBg: '../../static/test/waterfull/2.jpg',
					userName: "天堂屠夫",
					userId: "1351058003",
					job: "学生汪"
				},
				content: [{
						name: "主页"
					},
					{
						name: "社团"
					}, {
						name: "动态"
					},
					{
						name: "文章"
					}
				]
			};
		},
		components: {
			tapBar,
			personShowWithBg
		},

		methods: {
			clickLeft() {
				uni.navigateBack({
					animationDuration: 300,
					animationType: 'pop-out'
				})
			},
			tabtap(index) {
				this.tapIndex = index
			},
			tabChange(e) {
				this.tapIndex = e.detail.current
			},
		},
		async onLoad() {
			let res = await this.request('me/', {
				uid: 1
			})

			uni.getSystemInfo({
				success: (res) => {
					let height = res.windowHeight
					this.scrollHeight = height
				}
			})


		}
	}
</script>

<style lang="scss" scoped>
	* {
		background-color: #EEEEEE;
	}

	// .list {
	// 	height: calc(100vh - 364px);
	// }

	.main {
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
				align-items: center;

				.showBar-item-first {
					font-weight: bold;
				}

				.showBar-item-last {
					color: darkgray;
					font-weight: 200;
				}
			}


		}

		.userDetail {
			margin-top: 40upx;


			swiper {
				height: 100%;
			}

			.swiper-item {
				.accountInfo {
					margin: 20upx 10upx;

					.accountInfo-account-num {
						text {
							color: darkgray;
						}
					}

					.accountInfo-bottom {
						border-bottom: 2upx solid #EEEEEE;
					}
				}
			}
		}
	}


	.left {
		padding-left: 80upx;


	}

	.right {
		padding-right: 80upx;
	}
</style>
