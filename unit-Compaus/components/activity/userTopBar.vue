<template>
	<view class="groupTopBar">
		<view class="groupTopBar-left" @click="toUserDetail">
			<view class="groupLogo">
				<image :src="groupInfo.logo || groupInfo.avatar" mode="scaleToFill"></image>
			</view>
			<view class="groupName">
				<view class="groupName-top">
					<text class="groupName-first">{{groupInfo.groupName}}</text>
					<kp-tag size="small" bg-color="#d1ebfd" weight="500" class="left-tag">
					  <!-- <kp-icon size="24" type="male" color="#3bb2f3"/> -->
					  <text class="eosfont category">&#xe602;</text>
					  
					</kp-tag>
					<kp-tag
					  size="small"
					  color="#f9796a"
					  weight="500"
					  bg-color="#f4dee0"
					  class="left-star"
					>{{groupInfo.college}}</kp-tag>
				</view>
				
				<text class="groupName-last">{{activityStartTime}}</text>
			</view>
		</view>
		<view class="groupTopBar-right">
			<view class="notiDetail">
				<button type="primary" size="mini" :disabled="isdisabled" @click="followerUser" v-if="!isdisabled">关注</button>
				
			</view>
		</view>
	</view>
</template>

<script>
	import KpIcon from "@/components/kp-icon";
	import KpTag from "@/components/kp-tag";
	export default {
		data() {
			return {
				isdisabled:false
			};
		},
		components:{
			KpIcon,
			KpTag
		},
		props: {
			needCategory:{
				type:Boolean,
				default:true
			},
			groupInfo:{
				type:Object,
				default:{}
			},
			activityStartTime:{
				type:String,
				required:true
			}
		},
		methods:{

			toUserDetail(){
				
				uni.navigateTo({
					url:"/pages/groupDetail/groupDetail?groupId=" + this.groupInfo.id
				})
			},
			followerUser(){
				this.isdisabled = true
				uni.showToast({
					title:"已关注该用户"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.groupTopBar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: row;
		flex-wrap: nowrap;
		height: 100upx;
		border: 0.5px solid #EEEEEE;

		.groupTopBar-left {
			display: flex;
			justify-content: center;
			align-items: center;
			margin: 20upx;

			.groupLogo {
				image {
					height: 80upx;
					width: 80upx;
					border-radius: 50%;

				}
			}

			.groupName {
				display: flex;
				justify-content: center;
				margin-left: 10upx;
				flex-direction: column;
				flex-wrap: nowrap;
				&-top{
					display: flex;
					justify-content: center;
					align-items: center;
					kp-tag{
						margin-left: 15upx;
					}
				}
				.groupName-first {
					font-weight: bold;

				}

				.groupName-last {
					color: darkgray;
					font-size: 20upx;
				}
			}
		}

		.groupTopBar-right {
			.notiDetail {
				display: flex;
				margin-right:20upx;
				button {
					color: #fff;
					background-color: #191970;
				}
			}
		}

	}
</style>
