<template>
	<view class="contaier">
		<uni-nav-bar left-icon="back" title="活动详情" @clickLeft="clickLeft"></uni-nav-bar>
		<user-top-bar :groupName="activityDetail.groupName" :activityStartTime="activityDetail.activityStartTime" :groupLogo="activityDetail.groupLogo"></user-top-bar>
		<template v-if="activityDetail.imgs.length > 1">
			<swiper :indicator-dots="true" class="swiper-box">
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
		<view class="mutation">
			<mutation></mutation>
			<text class="hotNum">{{activityDetail.hotNum}}热度</text>
			<text class="commentNum">{{activityDetail.commentNum}}评论</text>
		</view>
		
		
		<view class="commentArea">
			<text>热门评论</text>

			<block v-for="(commentor,commentId) in commentors" :key="commentId">
				<comment-item :commentorAvatar="commentor.commentorAvatar" :commentorName="commentor.commentorName" :commentContent="commentor.commentContent"
				 :likeNum="commentor.likeNum"></comment-item>
			</block>
		</view>
	</view>
</template>

<script>
	import userTopBar from '@/components/activity/userTopBar.vue'
	import commentItem from '@/components/commentBar/commentBar.vue'
	import mutation from '@/components/activity/mutation.vue'
	export default {
		data() {
			return {
				activityId: "",
				activityDetail: {
					groupName: '轻松一校',
					activityStartTime: "17小时前",
					groupLogo: '../../static/test/avatar.png',
					text: '岁月无情',
					imgs: ['../../static/test/waterfull/1.jpg', '../../static/test/waterfull/2.jpg',
						'../../static/test/waterfull/3.jpg'
					],
					hotNum:75,
					commentNum:38
				},
				commentors: [{
						commentorAvatar: "../../static/test/waterfull/1.jpg",
						commentorName: "天堂屠夫",
						commentContent: "世界上最nb的组织",
						likeNum: 3921
					},
					{
						commentorAvatar: "../../static/test/waterfull/1.jpg",
						commentorName: "天堂屠夫",
						commentContent: "世界上最nb的组织",
						likeNum: 3921
					},
					{
						commentorAvatar: "../../static/test/waterfull/1.jpg",
						commentorName: "天堂屠夫",
						commentContent: "世界上最nb的组织",
						likeNum: 3921
					}
				]
			};
		},
		components: {
			userTopBar,
			commentItem,
			mutation
		},
		onLoad(option) {
			this.activityId = option.activityId
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
	.swiper-item {
		image {
			width: 100%;
		}
	}

	.textarea {
		margin-top: 20upx;

	}
	.mutation{
		.hotNum{
			color: darkgray;
			font-size: 26upx;
			margin-left: 10upx;
			margin-right:30upx;
		}
		.commentNum{
			color: darkgray;
			font-size: 26upx;
		}
	}
</style>
