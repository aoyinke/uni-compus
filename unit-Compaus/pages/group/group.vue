<template>
	<view>
		<uni-nav-bar left-icon="back" title="兴趣小组"></uni-nav-bar>
		<uni-search-bar :radius="100" @confirm="search" placeholder="请输入小组名称或小组号" @input="input"></uni-search-bar>
		<view class="groupInfo">
			<view class="groupInfo-prepare">
				<text class="first">{{user.groupInfo.prepare}}</text>
				<text class="second">已经收藏的小组</text>
			</view>
			<view class="groupInfo-already">
				<text class="first">{{user.groupInfo.already}}</text>
				<text class="second">已经加入的小组</text>
			</view>
			<view class="groupInfo-recommend">
				<image src="../../static/group/fengxiangbiao.png" mode=""></image>
				<text class="second">爱好偏向</text>
			</view>

		</view>
		<view class="group-detail-tab">
			<view class="group-detail-ownGroup tab" :class="tapIndex==0 ? 'active' : '' " @tap="tap(0)">
				<text>校内热门小组</text>
			</view>
			<view class="group-detail-country tab" :class="tapIndex==1 ? 'active' : '' " @tap="tap(1)">
				<text>全国热门小组</text>
			</view>
			<view class="group-detail-sponsor tab" :class="tapIndex==2 ? 'active' : '' " @tap="tap(2)">
				<text>热门赞助活动</text>
			</view>
		</view>
		<swiper :current="tapIndex">
			<swiper-item v-for="(items,index) in groupDetail" :key="index">
				<scroll-view scroll-y class="list">
					<block v-for="(item,indx) in items.content" :key="indx">
						<view class="swiper-item">
							<view class="group-logo">
								<image :src="item.groupLogo" mode="wsidthFix"></image>
							</view>
							<view class="group-info">
								<view class="group-username">
									<text>{{item.groupName}}</text>
								</view>
								<view class="group-intro">
									<text>{{item.intro}}</text>
									<view class="group-intro-tag">
										<uni-tag text="强大" type="primary" :circle="true" size="small"></uni-tag>
										<uni-tag text="优秀" type="primary" :circle="true" size="small"></uni-tag>
									</view>

								</view>
								<view class="group-info-bottom"></view>


							</view>
							<view class="group-chat">
								<uni-tag text="和他们聊聊" type="success" :circle="true" size="small"></uni-tag>
							</view>
						</view>
					</block>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	import uniTag from "@/components/uni-tag/uni-tag.vue"

	export default {
		data() {
			return {
				tapIndex: 0,
				user: {
					groupInfo: {
						prepare: 0,
						already: 0
					}
				},
				groupDetail: [{
					content: [{
							groupName: "轻松一校项目组",
							groupLogo: "../../static/test/avatar.png",
							intro: "轻松一校项目组是地球上最强大的组织之一，它负责..."
						},
						{
							groupName: "轻松一校项目组",
							groupLogo: "../../static/test/avatar.png",
							intro: "轻松一校项目组是地球上最强大的组织之一，它负责..."
						},
						{
							groupName: "轻松一校项目组",
							groupLogo: "../../static/test/avatar.png",
							intro: "轻松一校项目组是地球上最强大的组织之一，它负责..."
						},
						{
							groupName: "轻松一校项目组",
							groupLogo: "../../static/test/avatar.png",
							intro: "轻松一校项目组是地球上最强大的组织之一，它负责..."
						},
						{
							groupName: "轻松一校项目组",
							groupLogo: "../../static/test/avatar.png",
							intro: "轻松一校项目组是地球上最强大的组织之一，它负责..."
						}
					]
				},
				{
					content: [{
							groupName: "轻松一校项目组",
							groupLogo: "../../static/test/avatar.png",
							intro: "轻松一校项目组是地球上最强大的组织之一，它负责..."
						},
						{
							groupName: "轻松一校项目组",
							groupLogo: "../../static/test/avatar.png",
							intro: "轻松一校项目组是地球上最强大的组织之一，它负责..."
						},
						{
							groupName: "轻松一校项目组",
							groupLogo: "../../static/test/avatar.png",
							intro: "轻松一校项目组是地球上最强大的组织之一，它负责..."
						}
					]
				}]
			};
		},
		components: {
			uniSearchBar,
			uniTag
		},
		methods: {
			tap(index) {
				this.tapIndex = index
			}
		},
		onLoad() {
			let swiperHeight = uni.getSystemInfo({
				success: res => {
					let height = res.windowHeight - uni.upx2px(100)
					this.swiperHeight = height
				}
			})
		}

	}
</script>

<style lang="scss" scoped>
	page {
		background-color: darkgray;
	}

	.groupInfo {
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		margin: 20upx 0;

		.groupInfo-prepare,
		.groupInfo-already,
		.groupInfo-recommend {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			border-right: 2upx solid #EEEEEE;

			width: 33%;

			.first {
				font-weight: 700;
				font-size: 30upx;
			}

			.second {
				font-size: 20upx;
				color: darkgray;
			}
		}

		.groupInfo-recommend {
			border: none !important;
			margin-left: none !important;

			image {
				width: 50upx;
				height: 50upx;

			}
		}
	}

	.group-detail-tab {
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		flex-direction: row;
		height: 100upx;
		box-shadow: 3upx 3upx 5upx 5upx #EEEEEE;

		.tab {
			font-size: 26upx;
			font-weight: 400;
		}

	}

	.swiper-item {
		height: 100%;
		display: flex;
		justify-content: space-around;
		margin: 30upx 10upx;
		width: 100%;
		flex-wrap: wrap;

		.group-logo {
			height: 100%;
			background-color: #fff;

			image {
				width: 80upx;
				height: 80upx;
				border-radius: 50%;
			}
		}

		.group-info {
			width: 60%;

			.group-username {
				font-weight: bold;
				font-size: 30upx;
			}

			.group-intro {
				.group-intro-tag {
					display: flex;
					flex-direction: row;
				}

				text {
					color: darkgray;
				}
			}

			.group-info-bottom {
				height: 50upx;
				border-bottom: 3upx solid #EEEEEE;
			}
		}

	}

	.active {
		text {
			border-bottom: 5upx solid #5F9EA0;
			color: #4682B4;
			font-weight: bold;
		}

	}
</style>
