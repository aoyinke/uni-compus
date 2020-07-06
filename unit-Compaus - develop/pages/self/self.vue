<template>
	<view class="container">
		<uni-nav-bar title="我"></uni-nav-bar>

		<view class="unLogin" v-if="!user.userInfo.hasLogin">
			<view class="unLogin-item">
				<image src="https://www.unicompus.com:3000/static/logo.jpg" mode=""></image>
				<text>你是一只还没有登录的松鼠</text>
			</view>
			<view style="width: 100%;">
				<uni-compus-button open-type="getUserInfo" content="立即登录" background="#fbc531" @click.native="login" width="100"></uni-compus-button>
			</view>
		</view>
		<template v-if="user.userInfo.hasLogin">
			<view class="header" @click="toDetail">
				<view class="header-left"><kp-avatar :image="userInfo.avatar" size="large" mode="" /></view>
				<view class="header-center">
					<view class="header-center-userName">
						<text>{{ userInfo.nickName }}</text>
					</view>
					<view class="header-center-published">
						<text>发表过的文章 {{ user.userInfo.publishedNum }}</text>
					</view>
				</view>
				<view class="header-right"><text class="eosfont">&#xe7df;</text></view>
			</view>

			<view class="main">
				<view class="userActivityNum">
					<view class="userActivityNum-detail" @click="goConcernDetail">
						<text class="userActivityNum-detail-first">{{ userSavedGroupNums }}</text>
						<text class="userActivityNum-detail-right">我的关注</text>
					</view>
					<view class="userActivityNum-detail">
						<text class="userActivityNum-detail-first">{{ user.userInfo.likeNums }}</text>
						<text class="userActivityNum-detail-right">我的粉丝</text>
					</view>
					<view class="userActivityNum-detail">
						<text class="userActivityNum-detail-first">{{ user.userInfo.likeNums }}</text>
						<text class="userActivityNum-detail-right">我的获赞</text>
					</view>
				</view>
				<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" v-if="advertisements.length">
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
					<view class="userSetup" @click="navtoRegisterGroup">
						<view class="navBar-left">
							<text class="eosfont registerGroup">&#xe612;</text>
							<text>注册社团</text>
						</view>
						<view class="navBar-detail"><text class="eosfont">&#xe7df;</text></view>
					</view>

					<view class="userHis" @click="toUserSavedCommunity">
						<view class="navBar-left">
							<image src="../../static/self/eye.png" mode="" class="navIcon"></image>
							<text>我发布的</text>
						</view>
						<view class="navBar-detail"><text class="eosfont">&#xe7df;</text></view>
					</view>
					<view class="userGroup" @click="toNeedSave">
						<view class="navBar-left">
							<image src="../../static/self/partner.png" mode="" class="navIcon"></image>
							<text>我的需求</text>
						</view>
						<view class="navBar-detail"><text class="eosfont">&#xe7df;</text></view>
					</view>
					 
					<goDetail detailUrl="/user/feedBack/feedBack">
						<view class="userConcern">
							<view class="navBar-left">
								<image src="../../static/self/like.png" mode="" class="navIcon"></image>
								<text>我的提问</text>
							</view>
							<view class="navBar-detail"><text class="eosfont">&#xe7df;</text></view>
						</view>
					</goDetail>
					
				</view>
			</view>
		</template>
	</view>
</template>

<script>
import KpAvatar from '@/components/kp-avatar/index.vue';
import goDetail from '@/components/uni-compus-components/uniCompus-goDetail.vue';
import { mapState, mapMutations } from 'vuex';
import { SAVE } from '@/utils/config.js';
const util = require('util');
export default {
	computed: {
		...mapState(['user', 'host', 'port'])
	},
	data() {
		return {
			item: [{ type: 0 }],
			userInfoFromWx: {},
			userSavedGroupNums:0,
			userInfo:{},
			advertisements: []
		};
	},
	components: {
		goDetail,
		KpAvatar
	},
	methods: {
		...mapMutations({
			storeLogin: 'storeLogin',
			updateUserInfo: 'updateUserInfo'
		}),
		
		toNeedSave(){
			uni.navigateTo({
				url:"/user/mySave/mySave?pageId=" + SAVE.MYNEED
			})
		},
		
		toUserSavedCommunity(){
			uni.navigateTo({
				url:"/user/mySave/mySave?pageId=" + SAVE.SAVEDACTIVITY
			})
		},
		navtoRegisterGroup() {
			uni.navigateTo({
				url: '/user/registerGroup/registerGroup'
			});
		},
		login() {
			uni.showLoading({});

			wx.login({
				success: res => {
					if (res.code) {
						uni.request({
							url: util.format('%s:%s/v1/user/token', this.host, this.port),
							method: 'POST',
							data: {
								type: 100,
								account: res.code
							}
						}).then(res => {
							let item = {
								token: res[1].data.token,
								uid: res[1].data.uid
							};

							this.storeLogin(item);
							uni.showToast({
								title: '登录成功！',
								duration: 2000,
								success: () => {
									uni.hideLoading();
									uni.reLaunch({
										url: '/pages/self/self'
									});
								}
							});
						});
					}
				}
			});
		},
		goConcernDetail() {
			let item = { type: 3 };
			uni.navigateTo({
				url: `/user/mySave/mySave?pageId=${SAVE.CONCERNED}`
			});
		},
		navtoChangePerson() {
			uni.navigateTo({
				url: '/user/changePerson/changePerson'
			});
		},
		toDetail() {
			uni.navigateTo({
				url: '/user/personShow/personShow'
			});
		}
	},
	async onLoad() {
		let userInfo = await this.request('v1/user/getUserInfo');
		let advertisements = await this.request('v1/needWall/getAdvertisements')
		
		this.advertisements = advertisements[1].data
		
		userInfo = userInfo[1].data
		let res = userInfo
		
		Object.keys(userInfo).forEach(key=>{
			if(!userInfo[key]){
				res[key] = this.user.userInfo[key]
			}
		})
		this.userInfo = res
		console.log(this.userInfo)
		if(!userInfo.interestsTag){
			uni.showToast({
				title:"选择感兴趣的吧！",
				duration:2500,
				success:()=>{
					uni.navigateTo({
						url:"/user/interestsTag/interestsTag?uid=" + userInfo.id
					})
				}
				
			})
		}
		let raw_userSavedGroup = await this.request('v1/group/getUserSavedGroup');
		this.userSavedGroupNums = raw_userSavedGroup[1].data.length
		

		console.log(SAVE);
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
.registerGroup {
	color: rgba(34, 166, 179, 1);
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
	&-left {
		width: 25%;
		display: flex;
		justify-content: center;
	}
	&-center {
		flex: 1;
		&-name {
			font: {
				weight: 600;
				size: 24rpx;
			}
		}
		&-id {
			color: #dcdde1;
		}
		&-published {
			color: #dcdde1;
		}
	}
	&-right {
	}
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
