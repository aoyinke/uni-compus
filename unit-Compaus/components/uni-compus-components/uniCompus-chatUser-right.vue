<template>
	<view  >
		<view class="chatUserRight">
			<view class="userMsg textMsg">
				<text class="">{{userMsg}}</text>
			</view>
			<view class="userAvatar">
				<image :src="userAvatar" mode=""></image>
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
			userAvatar:{
				type:String,
				required:true
			},
			userMsg:{
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
	.chatUserRight{
		margin-top: 15upx;
		display: flex;
		justify-content: flex-end;
		
	}
	.userAvatar{
		@include uniCompusAvatarMargin;
	}
	.textMsg{
		width: 60%;
	}
</style>
