<template>
	<view class="show-item config-block-bottom">
		<view class="show-item-left">
			<view class="title">
				<text>{{title}}</text>
			</view>

			<view class="see-times">
				<text class="">{{seeTimes}}浏览</text>
			</view>
		</view>
		<view class="show-item-right">
			<image :src="coverImg" mode=""></image>
			<view class="date">
				<text>{{date}}</text>
			</view>

		</view>
		
	</view>
</template>

<script>
	export default{
		data() {
			return {
				title: "最高光的时刻",
				seeTimes: "25.6万",
				coverImg: "../../static/test/waterfull/1.jpg",
				date: "4-17"
			}
		}
	}
	
</script>

<style scoped lang="scss">
	.show-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 200upx;
		&-left {
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			margin-left: 20upx;

			.title {
				margin-top: 20upx;
				font-weight: bold;
				font-size: 30upx;
			}

			.see-times {
				margin-bottom: 20upx;
				color: gray;
			}
		}

		&-right {
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-evenly;
			image {
				width: 100upx;
				height: 100upx;
				margin: 20upx;
				

			}
			.date{
				text-align: center;
				color: gray;
			}
		}
	}
</style>
