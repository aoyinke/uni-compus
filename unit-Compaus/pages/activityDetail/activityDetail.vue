<template>
	<view class="contaier">
		<uni-nav-bar left-icon="back" title="活动详情" @clickLeft="clickLeft"></uni-nav-bar>
		<user-top-bar :groupName="activityDetail.groupName" :activityStartTime="activityDetail.activityStartTime" :groupLogo="activityDetail.groupLogo"></user-top-bar>
		<template v-if="activityDetail.imgs.length > 1">
			<swiper :indicator-dots="true"  class="swiper-box">
				<swiper-item v-for="(img,index) in activityDetail.imgs" :key="index">
					<view class="swiper-item">
						<image :src="img" mode=""></image>
					</view>
				</swiper-item>
			</swiper>
		</template>
		<template v-if="activityDetail.imgs.length == 1">
			<view class="imgShow">
				<image :src="activityDetail.imgs[0]" mode="widthFix"></image>
			</view>
		</template>
		<template v-if="activityDetail.text">
			<view class="textarea">
				<text>{{activityDetail.text}}</text>
			</view>
		</template>
		
	</view>
</template>

<script>
	import userTopBar from '@/components/userTopBar.vue'
	export default {
		data() {
			return {
				activityDetail: {
					groupName: '轻松一校',
					activityStartTime: "17小时前",
					groupLogo: '../static/test/avatar.png',
					text:'岁月无情',
					imgs:['../../static/test/waterfull/1.jpg','../../static/test/waterfull/2.jpg','../../static/test/waterfull/3.jpg']
				}
			};
		},
		components: {
			userTopBar
		},
		onLoad(option) {
			
		},
		methods: {
			clickLeft() {
				uni.navigateBack({
					animationDuration: 300,
					animationType: 'pop-out'
				})
			},
		},
	}
</script>

<style lang="scss" scoped>
	.swiper-item{
		image{
			width: 100%;
		}
	}
	.textarea{
		margin-top: 20upx;
	
	}
</style>
