<template>
	<view class="container">
		<view class="uni-tab-bar">
			<scroll-view scroll-x class="uni-swiper-tab">
				<block v-for="(tab,index) in tapBars" :key="index">
					<view class="swiper-tab-list" :class="{'active':tapIndex==index}" @tap="tabItem(index)">
						{{tab.name}}
						<view class="swiper-tab-inline"></view>
		
		
					</view>
				</block>
			</scroll-view>
		</view>
		
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				

			}
		},
		components: {

		},
		methods: {
			tabItem(index) {
				this.$emit('taptab',index)
			}
		},
		props: {
			tapBars: Array,
			tapIndex:Number
		}
	}
</script>

<style lang="scss" scoped>
	.uni-swiper-tab {
		border-bottom: 1upx solid #EEEEEE;
	}

	.swiper-tab-list {
		color: #969696;
		font-weight: bold;

	}

	.uni-tab-bar {
		.active {
			color: #343434;

			.swiper-tab-inline {
				border-bottom: 6upx solid #FEDE33;
				width: 70upx;
				margin: auto;
				border-top: 6upx solid #FEDE33;
				border-radius: 20upx;
			}
		}
	}
</style>
