<template recyclable>
	<view class="container">
		<uni-nav-bar title="我">

		</uni-nav-bar>

		<view class="header" @click="toDetail">
			<view class="user_avatar">
				<image :src="userActivityInfo.avatar" mode=""></image>
			</view>
			<view class="user_info">
				<view class="user_name">
					<template v-if="userInfo.userName">
						<text>{{userActivityInfo.username}}</text>
					</template>
					<template v-else>
						<text>未登陆~</text>
					</template>

				</view>
				<view class="user_visits">
					<text>总访客 {{userActivityInfo.total_visits}}</text>
				</view>
			</view>
			<view class="user_detail">
				<text class="eosfont">&#xe7df;</text>
			</view>
		</view>

		<view class="main">
			<view class="userActivityNum">
				<view class="userActivityNum-detail">
					<text class="userActivityNum-detail-first">{{userActivityInfo.userActivityNum.num1}}</text>
					<text class="userActivityNum-detail-right">关注</text>
				</view>
				<view class="userActivityNum-detail">
					<text class="userActivityNum-detail-first">{{userActivityInfo.userActivityNum.num2}}</text>
					<text class="userActivityNum-detail-right">关注</text>
				</view>
				<view class="userActivityNum-detail">
					<text class="userActivityNum-detail-first">{{userActivityInfo.userActivityNum.num3}}</text>
					<text class="userActivityNum-detail-right">关注</text>
				</view>
				<view class="userActivityNum-detail">
					<text class="userActivityNum-detail-first">{{userActivityInfo.userActivityNum.num4}}</text>
					<text class="userActivityNum-detail-right">关注</text>
				</view>
			</view>
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item v-for="(item,idx) in advertisements" :key="idx">
					<view class="swiper-item">
						<image :src="item" mode=""></image>
					</view>
				</swiper-item>
			</swiper>
			<view class="navBar">
				<view class="userSetup" @click="navtoChangePerson">
					<view class="navBar-left">
						<image src="../../static/self/setting.png" mode="" class="navIcon"></image>
						<text>修改个人信息</text>
					</view>
					<view class="navBar-detail">
						<text class="eosfont">&#xe7df;</text>
					</view>
				</view>
				<view class="userHis">
					<view class="navBar-left">
						<image src="../../static/self/eye.png" mode="" class="navIcon"></image>
						<text>浏览历史</text>
					</view>
					<view class="navBar-detail">
						<text class="eosfont">&#xe7df;</text>
					</view>
				</view>
				<view class="userConcern">
					<view class="navBar-left">
						<image src="../../static/self/like.png" mode="" class="navIcon"></image>
						<text>我的关注</text>
					</view>
					<view class="navBar-detail">
						<text class="eosfont">&#xe7df;</text>
					</view>
				</view>
				<view class="userGroup">
					<view class="navBar-left">
						<image src="../../static/self/partner.png" mode="" class="navIcon"></image>
						<text>我的社团</text>
					</view>
					<view class="navBar-detail">
						<text class="eosfont">&#xe7df;</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userActivityInfo: {
					username: "天堂屠夫",
					total_visits: 0.,
					userActivityNum: {
						num1: 0,
						num2: 0,
						num3: 0,
						num4: 0
					},
					avatar: "../../static/test/1.jpg"
				},
				advertisements: [
					'../../static/test/1.jpg', '../../static/test/timg.jpg', '../../static/test/3.png'
				]

			}
		},
		methods: {
			open() {
				this.$refs.popup.open()
			},
			navtoChangePerson() {
				let isLogin = this.checkLogin('../self/self', '2')
				console.log(isLogin)
				if (!isLogin) {
					uni.showModal({
						content: '是否要保存为草稿?',
						cancelText: '不保存',
						confirmText: '保存',
						success: res => {
							if (res.confirm) {
								console.log('保存');
							} else {
								console.log('不保存');
							}
							this.isget = true;
							uni.navigateBack({
								delta: 1
							});
						},

					})
					this.open()
				} else {
					uni.navigateTo({
						url: "../changePerson/changePerson",
						"animationType": "fade-in",
						"animationDuration": 300
					})
				}

			},
			toDetail() {
				let isLogin = this.checkLogin('../self/self', '2')
				if (!isLogin) {
					uni.setStorageSync('storage_key', 'hello');
					uni.navigateTo({
						url: '../personalDetail/personalDetail',
						"animationType": "fade-in",
						"animationDuration": 300

					})
				}

			}
		},
		async onLoad() {
			let res = await this.request('me/', {
				uid: 1
			})
		}
	}
</script>

<style lang="scss" scoped>
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 30upx;

		.user_avatar image {
			height: 120upx;
			width: 120upx;
			border-radius: 50%;
		}

		.user_info {
			.user_name text {
				font-weight: bold;
				width: 150upx;
			}

			.user_visits text {
				color: lightgray;
				font-size: 20upx;
			}

			padding-inline-end: 400upx;
		}

		.user_detail {
			image {
				height: 30upx;
				width: 30upx;
			}
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
			border: 1upx solid #EEEEEE;
			box-shadow: 3upx 3upx 5upx 5upx #EEEEEE;
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
</style>
