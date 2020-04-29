<template>
	<view class="contaier">
		<uni-nav-bar left-icon="back" title="用户详情" @clickLeft="clickLeft"></uni-nav-bar>
		<tapBar></tapBar>
		<Navigation></Navigation>
		<view class="uni-tab-bar">
			<swiper class="swiper-box" :current="isActive" :style="{height:swiperHeight + 'px'}" @change="changSwiper">
				<scroll-view scroll-y class="list">
					<swiper-item>
						<view class="swiper-item">
							<ShowItem></ShowItem>
							<ShowItem></ShowItem>
						</view>
					</swiper-item>
				</scroll-view>
			</swiper>
		</view>
	</view>
</template>

<script>
	import tapBar from '@/components/personShow/tapBar.vue'
	import Navigation from '@/components/personShow/navigator.vue'
	import ShowItem from '@/components/personShow/show.vue'
	
	export default {
		data() {
			return {
				swiperHeight:0,
				userDetail: {
					avatarUrl: "../../static/test/avatar.png",
					coverUrl: "../../static/test/avatar.png",
					name: "gengyc"
				}
			};
		},
		components:{
			tapBar,
			Navigation,
			ShowItem
		},
		methods: {
			clickLeft() {
				uni.navigateBack({
					animationDuration: 300,
					animationType: 'pop-out'
				})
			}
			
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					let height = res.windowHeight - uni.upx2px(303)
					this.swiperHeight = height
				}
			})
		
		}
	}
</script>

<style lang="scss" scoped>
	

	
</style>
