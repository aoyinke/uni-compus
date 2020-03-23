<template>
	<view class="publishActivity">
		<uni-nav-bar left-icon="back"   title="发布动态" @clickLeft="clickLeft">
			 
		</uni-nav-bar>
		<view class="main">
			<view class="uni-textarea">
				<textarea value="" placeholder="和志同道合的人一起分享动态吧" style="height: 400upx;"/>
			</view>
			<view class="chooseGroup">
				<text class="eosfont">&#xe65e;</text>
				<text>选择该贴代表的团队吧</text>
				<text class="eosfont">&#xe7df;</text>
			</view>
		</view>
		<view class="footer">
			<view class="video footer-bar">
				<image src="../../static/publish/video.png" mode=""></image>
				<text>视频</text>
			</view>
			<view class="imgs footer-bar">
				<image src="../../static/publish/picture.png" mode=""></image>
				<text>图片</text>
			</view>
			<view class="expressions footer-bar">
				<image src="../../static/publish/happy.png" mode=""></image>
				<text>表情</text>
			</view>
			
		</view>
		<button type="primary">发表</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isSubmit:true
			};
		},
		methods:{
			clickLeft(){
				uni.navigateBack({
					animationDuration:300,
					animationType:'pop-out'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.nav-right{
		button{
			background-color: yellow;
		}
	}
	.footer{
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		
		
		.footer-bar{
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			image{
				width: 60upx;
				height: 60upx;
			}
		}
	}
</style>
