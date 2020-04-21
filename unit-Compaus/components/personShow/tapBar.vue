<template>
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
</template>

<script>
	export default {
		data(){
			return{
				userDetail:[]
			}
		},
		async mounted() {
			let userDetail = await this.request('users/1/')
			this.userDetail = userDetail[1].data.data
			console.log(this.userDetail)
			
		}
		
	}
	
</script>

<style scoped lang="scss">
	
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
</style>
