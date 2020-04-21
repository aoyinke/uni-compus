<template>
	<view class="naviGator">
		<view class="naviGator-chatAndFollow">
			<uniCompusButton content="关注" ></uniCompusButton>
			<uniCompusButton content="聊天" background="orange"></uniCompusButton>
		</view>
		<view class="naviGator-navBar">

			<view  v-for="(item,index) in naviBar" :key="index" :class="isActive==index ? 'active' : '' "
			 @click="changeTab(index)">
				<text class="config-unactive-text">{{item}}（）</text>
				<view class="naviGator-navBar-bottom"></view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isActive: 0,
				naviBar: ['文章', '问答', '风采']
			}
		},
		methods: {
			changeTab(index) {
				this.isActive = index
			},
			changSwiper() {
				this.isActive = event.detail.current
			}
		}
	}
</script>

<style scoped lang="scss">
	
	.naviGator {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;

		&-chatAndFollow {
			margin-top: 20upx;
			display: flex;
			align-items: center;
			justify-content: space-evenly;
			width: 60%;

		}

		&-navBar {
			margin-top: 40upx;
			display: flex;
			align-items: center;
			justify-content: space-around;
			width: 100%;

			

			
		}
	}

	.active {
		color: black !important;
		font-size: 35upx;
		font-weight: bold;
		
		.naviGator-navBar-bottom {
			border-bottom: 1upx solid black;
			height: 20upx;
		}
	}
</style>
