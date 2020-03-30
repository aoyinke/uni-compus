<template>
	<view class="groupTopBar">
		<view class="groupTopBar-left" @click="toUserDetail">
			<view class="groupLogo">
				<image :src="groupLogo" mode="scaleToFill"></image>
			</view>
			<view class="groupName">
				<text class="groupName-first">{{groupName}}</text>
				<text class="groupName-last">{{activityStartTime}}</text>
			</view>
		</view>
		<view class="groupTopBar-right">
			<view class="notiDetail">
				<button type="primary" size="mini" :disabled="isdisabled" @click="followerUser" v-if="!isdisabled">关注</button>
				<text class="eosfont" @tap="toDetail(activityId)">&#xe7e0;</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isdisabled:false
			};
		},
		props: {
			groupLogo: {
				type: String,
				default: '../../static/logo.jpg'
			},
			groupName:{
				type:String,
				required:true
			},
			activityStartTime:{
				type:String,
				required:true
			},
			imgs:{
				type:Array
			},
			text:{
				type:String
			},
			activityId:{
				type:String,
				required:true
			},
			userId:{
				type:Number,
			}
		},
		methods:{
			toDetail(activityId){
				this.$emit('toActivityDetail',activityId)
			},
			toUserDetail(){
				uni.navigateTo({
					url:"/pages/personShow/personShow",
					animationDuration:500,
					animationType:'auto'
				})
			},
			followerUser(){
				this.isdisabled = true
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
