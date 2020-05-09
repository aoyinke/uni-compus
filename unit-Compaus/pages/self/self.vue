<template>
	<view class="container">
		<uni-nav-bar title="我"></uni-nav-bar>

		<view class="unLogin" v-if="!user.userInfo.hasLogin">
			<view class="unLogin-item">
				<image src="../../static/logo.jpg" mode=""></image>
				<text>你是一只还没有登录的松鼠</text>
			</view>
			<view style="width: 100%;">
				<uni-compus-button content="立即登录" background="#fbc531" @click.native="login" width="100"></uni-compus-button>
			</view>
			
		</view>
		<template v-if="user.userInfo.hasLogin">
			<view class="header" @click="toDetail">
				<view class="header-left">
					<kp-avatar
					  :image="user.userInfo.avatar"
					  size="large"
					  mode=""
					  @tap="handleOpenCommunity(row)"
					/>
				</view>
				<view class="header-center">
					<view class="header-center-userName">
						<text>{{user.userInfo.userName}}</text>
					</view>
					<view class="header-center-id">
						<text>ID: {{user.userInfo.id}}</text>
					</view>
					<view class="header-center-published">
						<text>发表过的文章 {{user.userInfo.publishedNum}}</text>
					</view>
				</view>
				<view class="header-right"><text class="eosfont">&#xe7df;</text></view>
			</view>

			<view class="main">
				<view class="userActivityNum">
					<view class="userActivityNum-detail" @click="goConcernDetail">
						<text class="userActivityNum-detail-first">{{ userActivityInfo.userActivityNum.num1 }}</text>
						<text class="userActivityNum-detail-right">我的关注</text>
					</view>
					<view class="userActivityNum-detail">
						<text class="userActivityNum-detail-first">{{ userActivityInfo.userActivityNum.num2 }}</text>
						<text class="userActivityNum-detail-right">我的粉丝</text>
					</view>
					<view class="userActivityNum-detail">
						<text class="userActivityNum-detail-first">{{ userActivityInfo.userActivityNum.num3 }}</text>
						<text class="userActivityNum-detail-right">我的推荐</text>
					</view>
				</view>
				<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
					<swiper-item v-for="(item, idx) in advertisements" :key="idx">
						<view class="swiper-item"><image :src="item" mode=""></image></view>
					</swiper-item>
				</swiper>
				<view class="navBar">
					<view class="userSetup" @click="navtoChangePerson">
						<view class="navBar-left">
							<image src="../../static/self/setting.png" mode="" class="navIcon"></image>
							<text>修改个人信息</text>
						</view>
						<view class="navBar-detail"><text class="eosfont">&#xe7df;</text></view>
					</view>
					<go-detail detailUrl="/pages/mySave/mySave" :item="item[0]">
						<view class="userHis">
							<view class="navBar-left">
								<image src="../../static/self/eye.png" mode="" class="navIcon"></image>
								<text>我的收藏</text>
							</view>
							<view class="navBar-detail"><text class="eosfont">&#xe7df;</text></view>
						</view>
					</go-detail>
					<goDetail detailUrl="/pages/feedBack/feedBack">
						<view class="userConcern">
							<view class="navBar-left">
								<image src="../../static/self/like.png" mode="" class="navIcon"></image>
								<text>我的提问</text>
							</view>
							<view class="navBar-detail"><text class="eosfont">&#xe7df;</text></view>
						</view>
					</goDetail>
					<view class="userGroup">
						<view class="navBar-left">
							<image src="../../static/self/partner.png" mode="" class="navIcon"></image>
							<text>我的消息</text>
						</view>
						<view class="navBar-detail"><text class="eosfont">&#xe7df;</text></view>
					</view>
				</view>
			</view>
		</template>
	</view>
</template>

<script>

import KpAvatar from '@/components/kp-avatar/index.vue';
import goDetail from '@/components/uni-compus-components/uniCompus-goDetail.vue';
import { mapState } from 'vuex';
export default {
	computed: {
		...mapState(['user'])
	},
	data() {
		return {
			item: [{ type: 0 }],
			
			userInfoFromWx: {},
			userActivityInfo: {
				username: '天堂屠夫',
				total_visits: 0,
				userActivityNum: {
					num1: 0,
					num2: 0,
					num3: 0,
					num4: 0
				},
				avatar: '../../static/test/waterfull/1.jpg'
			},
			advertisements: ['../../static/test/waterfull/1.jpg', '../../static/test/waterfull/2.jpg', '../../static/test/waterfull/3.jpg']
		};
	},
	components: {
		
		goDetail,
		KpAvatar
	},
	methods: {
		login() {
			let obj = this.user;
			console.log(obj)
			obj.userInfo.hasLogin = true;

			this.user = obj;
		},
		goConcernDetail() {
			let item = { type: 3 };
			uni.navigateTo({
				url: `/pages/mySave/mySave?item=${encodeURIComponent(JSON.stringify(item))}`
			});
		},
		navtoChangePerson() {
			uni.navigateTo({
				url: '../changePerson/changePerson'
			})
		},
		toDetail() {
			
			uni.navigateTo({
				url:"/pages/personalDetail/personalDetail"
			})
		}
	},
	async onLoad() {
		console.log(this.user)
		let res = await this.request('me/', {
			uid: 1
		});
	}
};
</script>

<style lang="scss" scoped>
@mixin unLoginLayOut {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}
.unLogin {
	@include unLoginLayOut;
	height: 100vh;
	&-item {
		@include unLoginLayOut;
		image {
			width: 300rpx;
			height: 300rpx;
			border-radius: 50%;
		}
	}
}
.header {
	display: flex;
	align-items: center;
	margin-bottom: 60rpx;
	&-left{
		width: 25%;
		display: flex;
		justify-content: center;
	}
	&-center{
		flex:1;
		&-name{
			font: {
				weight:600;
				size:24rpx
			};
		}
		&-id{
			color: #dcdde1;
		}
		&-published{
			color: #dcdde1;
		}
	}
	&-right{}
}

.main {
	.userActivityNum {
		display: flex;
		justify-content: space-evenly;
		align-items: center;

		.userActivityNum-detail {
			display: flex;
			align-items: center;
			flex-direction: column;
			justify-content: center;

			.userActivityNum-detail-right {
				color: darkgray;
			}
		}
	}

	.navBar {
		margin: 10upx;
		border: 1upx solid #eeeeee;
		box-shadow: 3upx 3upx 5upx 5upx #eeeeee;
	}
}

.navIcon {
	height: 45upx;
	width: 45upx;
	margin-bottom: -10upx;
}

.navBar-detail {
	image {
		height: 30upx;
		width: 30upx;
		color: lightgray;
		margin-right: 20upx;
	}
}

.userSetup,
.userHis,
.userConcern,
.userGroup {
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-wrap: unwrap;
	line-height: 50upx;
	margin: 50upx 0;

	.navBar-left {
		text {
			font-size: 30upx;
			margin-left: 10upx;
			font-weight: 500;
		}
	}
}

swiper {
	margin: 20upx 10upx;
	height: 150upx;
	border-radius: 50upx;

	.swiper-item {
		image {
			width: 100%;
		}
	}
}

.avatar {
	width: 120rpx;
	height: 120rpx;
	overflow: hidden;
	border-radius: 50%;
}
</style>
