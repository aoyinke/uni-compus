<template>
	<view class="contaier">
		<uni-nav-bar left-icon="back" title="活动详情" @clickLeft="clickLeft"></uni-nav-bar>
		<user-top-bar :groupName="activityDetail.groupName" :activityStartTime="activityDetail.activityStartTime" :groupLogo="activityDetail.groupLogo"></user-top-bar>
		<template v-if="activityDetail.img.length > 1">
			<swiper :indicator-dots="true" class="swiper-box">
				<swiper-item v-for="(img,index) in activityDetail.img" :key="index">
					<view class="swiper-item">
						<image :src="img" mode=""></image>
					</image>
					</view>
				</swiper-item>
			</swiper>
		</template>
		<template v-if="activityDetail.img.length == 1">
			<view class="imgShow">
				<image :src="activityDetail.img[0]" mode="widthFix"></image>
			</view>
		</template>
		<template v-if="activityDetail.description">
			<view class="textarea">
				<text>{{activityDetail.description}}</text>
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
		
		<view class="commentBottom">
			<view class="commentView" @click="gocomment">
				<text>发布评论...</text>
			</view>
			<ygc-comment ref="ygcComment" :placeholder="'发布评论'" @pubComment="pubComment" :maskState="maskState" @cancelComment="cancelComment"></ygc-comment>
		</view>
		
	</view>
</template>

<script>
	import userTopBar from '@/components/activity/userTopBar.vue'
	import commentItem from '@/components/commentBar/commentBar.vue'
	import mutation from '@/components/activity/mutation.vue'
	import ygcComment from '@/components/ygc-comment/ygc-comment.vue';
	export default {
		data() {
			return {
				maskState:0,
				activityId: "",
				activityDetail: {},
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
		// computed:{
		// 	gocomment:function(){
		// 		return this.maskState = 1
		// 	}
		// },
		components: {
			userTopBar,
			commentItem,
			mutation,
			ygcComment
		},
		onLoad(option) {
			const item = JSON.parse(decodeURIComponent(option.item));
			this.activityDetail = item
			console.log(this.activityDetail)
		},
		methods: {
			clickLeft() {
				uni.navigateBack({
					animationDuration: 300,
					animationType: 'pop-out'
				})
			},
			pubComment(item){
				console.log(item)
				this.maskState = 0
			},
			gocomment(){
				this.maskState = 1

			},
			cancelComment(){
				this.maskState = 0
			}
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

	.mutation {
		.hotNum {
			color: darkgray;
			font-size: 26upx;
			margin-left: 10upx;
			margin-right: 30upx;
		}

		.commentNum {
			color: darkgray;
			font-size: 26upx;
		}
	}
	
	.commentBottom{
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 100upx;
		display: flex;
		justify-content: center;
		align-content: center;
		border: 1px solid #EEEEEE;
		.commentView{
			margin: 20upx 0;
			width: 80%;
			background-color:lightgray;
			border-radius: 20upx;
			text-align: center;
			
		}
		
	}
</style>
