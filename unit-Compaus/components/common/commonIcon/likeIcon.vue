<template>
	<view class="likeIcon">
		<template v-if="!isStore">
			<text class="eosfont like" @click="store">&#xe66c;</text>
		</template>
		<template v-else>
			<image src="../../../static/common/like.png" mode="" class="isStore" @click="cancelStore"></image>
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


	}

	.isStore {
		width: 60upx;
		height: 60upx;
		transform: rotate(30deg);
		transition: transform 1s linear;
	}
</style>
