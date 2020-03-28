<template>
	<view class="likeIcon">
		<template v-if="!isStore">
			<text class="eosfont like" @click="store">&#xe66c;</text>
		</template>
		<template v-else>
			<image src="../../../static/common/like.png" mode="" class="icon-active" @click="cancelStore"></image>
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isStore: false,
				count: 0
			};
		},
		methods: {
			store() {
				this.isStore = true
// 				uni.request({
// 					url:'https://smileapi.lililili.net/v1/likes/1/
// '
// 				})

			},
			cancelStore(){
				this.isStore = false
			}

		},
		props: {
			activityId: {
				type: Number,

			}
		}
	}
</script>

<style lang="scss" scoped>
	.like {
		font-size: 50upx !important;
		transition: width height 1s linear;
	}
	.like:hover{
		width: 60upx;
		height: 60upx;
	}

	.icon-active {

			width: 50upx;
			height: 50upx;
	
		
		
	}
</style>
