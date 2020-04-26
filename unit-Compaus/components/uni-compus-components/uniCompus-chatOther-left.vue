<template>
	<view>
		<view class="chatOtherLeft">
			<view class="otherAvatar">
				<image :src="otherAvatar" mode=""></image>
			</view>
			<view class="otherMsg textMsg">
				<text class="">{{otherMsg}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props:{
			otherAvatar:{
				type:String,
				required:true
			},
			otherMsg:{
				type:String,
				required:true
			}
		}
	}
</script>

<style lang="scss" scoped>
	@mixin uniCompusAvatarMargin {
		
		margin: 0 15upx;
		image{
			width: 80upx;
			height: 80upx;
			border-radius: 50%;
		}
	}
	.chatOtherLeft{
		margin-top: 15upx;
		display: flex;
		
	}
	.otherAvatar{
		@include uniCompusAvatarMargin;
	}
	.otherMsg{
		width: 60%;
		text-align: center;
	}
</style>
