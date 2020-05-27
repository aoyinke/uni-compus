<template>
	<view class="contaier">
		<uni-nav-bar left-icon="back" title="活动详情" @clickLeft="clickLeft"></uni-nav-bar>
		<view class="countDown">
			<uni-countdown color="#FFFFFF" background-color="#00B26A" border-color="#00B26A" :day="1" :hour="2" :minute="30" :second="0"></uni-countdown>
			<view class="joinActivity">
				<uni-compus-button content="报名参加" background="#3498db" width="100"></uni-compus-button>
			</view>
		</view>
		<user-top-bar :groupInfo="activityDetail.groupInfo" :activityStartTime="activityDetail.activityStartTime" ></user-top-bar>
		<template v-if="activityDetail.imgs.length > 1">
			<swiper :indicator-dots="true" class="swiper-box">
				<swiper-item v-for="(img,index) in activityDetail.imgs" :key="index">
					<view class="swiper-item">
						<image :src="img" mode=""></image>
					</image>
					</view>
				</swiper-item>
			</swiper>
		</template>
		<template v-if="activityDetail.imgs.length == 1">
			<view class="imgShow">
				<image :src="activityDetail.imgs[0]"></image>
			</view>
		</template>
		<template v-if="activityDetail.description">
			<view class="textarea">
				<text>{{activityDetail.description}}</text>
			</view>
		</template>
		<view class="mutation">
			<mutation></mutation>
			<text class="hotNum">{{activityDetail.fav_nums}}热度</text>
			<text class="commentNum">{{activityDetail.comments.length}}评论</text>
		</view>


		<view class="commentArea">
			<text>热门评论</text>

			<block v-for="(commentor,commentId) in activityDetail.comments" :key="commentId">
				<comment-item :commentorAvatar="commentor.avatar" :commentorName="commentor.nickName" :commentContent="commentor.content"
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
	import uniCountdown from '@/components/uni-countdown/uni-countdown.vue'
	export default {
		data() {
			return {
				maskState:0,
				activityId: "",
				activityDetail: {},
				comments:[]
				
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
			ygcComment,
			uniCountdown
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
	.joinActivity{
		width: 35%;
		margin-left: 50rpx;
	}
	.countDown{
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 20rpx;
	}
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
