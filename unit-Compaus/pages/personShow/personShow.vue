<template>
	<view class="contaier">
		<uni-nav-bar left-icon="back" title="用户详情" @clickLeft="clickLeft"></uni-nav-bar>
		<view class="tapBar">
			<view class="tapBar-bg">
				<image :src="userDetail.coverUrl" mode=""></image>
			</view>
			<view class="userAvatar">
				<image :src="userDetail.avatarUrl" mode=""></image>
				<text>{{userDetail.name}}</text>
			</view>
			<view class="showFollower">
				<text>关注 {{userDetail.followingCount}}</text>
				<text>粉丝 {{userDetail.likesCount}}</text>
				<text>推荐 {{userDetail.followersCount}}</text>
			</view>
		</view>
		<view class="naviGator">
			<view class="naviGator-chatAndFollow">
				<button type="primary" size="mini" plain="true" class="button1">关注</button>
				<button type="primary" size="mini" plain="true" class="button2">聊天</button>
			</view>
			<view class="naviGator-navBar">
				<view class="naviGator-navBar-artivles" :class="isActive==0 ? 'active' : ''" @click="changeTab(0)">
					<text class="">文章（）</text>
					<view class="naviGator-navBar-bottom"></view>


				</view>
				<view class="naviGator-navBar-collections" :class="isActive==1 ? 'active': '' " @click="changeTab(1)">
					<text class="">合集（）</text>
					<view class="naviGator-navBar-bottom"></view>
				</view>
			</view>
		</view>
		<swiper class="swiper-box" :current="isActive" @change="changSwiper">
			<scroll-view scroll-y class="list">
				<swiper-item>
					<view class="swiper-item"></view>
				</swiper-item>
			</scroll-view>

		</swiper>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				isActive: 0,
				userDetail: {
					avatarUrl: "../../static/test/avatar.png",
					coverUrl: "../../static/test/avatar.png",
					name: "gengyc"
				}
			};
		},
		comments: {

		},
		async mounted() {
			let userDetail = await this.request('users/1/')
			this.userDetail = userDetail[1].data.data
			console.log(this.userDetail)
		},
		methods: {
			clickLeft() {
				uni.navigateBack({
					animationDuration: 300,
					animationType: 'pop-out'
				})
			},
			changeTab(index) {
				this.isActive = index
			},
			changSwiper() {
				this.isActive = event.detail.current
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tapBar {
		position: relative;
		height: 30vh;

		.tapBar-bg {
			height: 100%;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.showFollower {
			display: flex;
			position: fixed;
			justify-content: space-evenly;
			align-items: center;
			width: 100%;
			top: 38%;

			text {
				color: #fff;
			}
		}

		.userAvatar {
			z-index: 100;
			position: absolute;
			top: 30%;
			right: 38%;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;

			image {
				height: 150upx;
				width: 150upx;
				border-radius: 50%;
			}

			text {
				color: #fff;
				font-weight: bold;
				text-shadow: 10upx 10upx 3upx dimgray;
			}
		}
	}

	.naviGator {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;

		&-chatAndFollow {
			margin-top: 20upx;
			display: flex;
			align-items: center;
			justify-content: space-evenly;
			width: 60%;

		}

		&-navBar {
			margin-top: 40upx;
			display: flex;
			align-items: center;
			justify-content: space-around;
			width: 100%;

			&-artivles {
				color: gainsboro;
				font-size: 30upx;
			}

			&-collections {
				color: gainsboro;
				font-size: 30upx;
			}
		}
	}

	.active {
		color: black;
		font-size: 35upx;
		font-weight: bold;

		.naviGator-navBar-bottom {
			border-bottom: 1upx solid black;
			height: 20upx;
		}
	}
</style>
