<template>
	<view class="">
		<view class="mutation">
			<view class="mutation-left">
				<view class="like tag">
					<like-icon :activityId="activityId"></like-icon>
				</view>
		
				<view class="good tag">
					<good-icon @addGood="addGood" @cancelGood="cancelGood"></good-icon>
				</view>
			</view>
			<view class="mutation-right">
				<view class="share tag">
					<share-icon></share-icon>
				</view>
			</view>
		</view>
		<view class="commentDetail">
			<view class="activityInfo">
				<text class="activityInfo-left">{{changeFavNums}}热度</text>
				<text class="activityInfo-right">{{comments.length}}评论</text>
			</view>
			<block v-for="(comment,index) in comments" :key="index">
				<view class="commentDetail-P">
					<text class="commentDetail-P-left">{{comment.nickName}}: </text>
					<text class="commentDetail-P-right">{{comment.content}}</text>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	import likeIcon from '@/components/common/commonIcon/likeIcon.vue'
	import chatIcon from '@/components/common/commonIcon/chatIcon.vue'
	import goodIcon from '@/components/common/commonIcon/goodIcon.vue'
	import shareIcon from'@/components/common/commonIcon/shareIcon.vue'
	export default {
		data() {
			return {
				activityId: 1
			};
		},
		computed:{
			changeFavNums:{
				get(){
					return this.fav_nums
				},
				set(newVal){
					this.fav_nums = newVal
				}
			}
		},
		components: {
			likeIcon,
			chatIcon,
			goodIcon,
			shareIcon
		},
		props: {
			comments:{
				type:Array
			},
			fav_nums:{
				type:Number
			}
			
		},
		methods:{
			addGood(){
				this.changeFavNums =this.changeFavNums +1
				console.log(this.changeFavNums)
			},
			cancelGood(){
				this.changeFavNums = this.changeFavNums - 1
				console.log(this.changeFavNums)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mutation {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 10upx;

		.mutation-left {
			display: flex;
			justify-content: space-evenly;
			align-items: center;
			width: 30%;

		}

		.mutation-right {
			.share {
				margin-right: 30upx;
			}
		}

	}
	.commentDetail {
		margin-top: 30upx;
		margin-left: 20rpx;
		.activityInfo {
			.activityInfo-left {
				color: darkgray;
				margin-left: 10upx;
			}
	
			.activityInfo-right {
				color: darkgray;
				margin-left: 15upx;
			}
		}
	
		.commentDetail-P {
			.commentDetail-P-left {
				font-weight: 800;
				margin-left: 10upx;
			}
	
			.commentDetail-P-right {
			}
		}
	}
</style>
