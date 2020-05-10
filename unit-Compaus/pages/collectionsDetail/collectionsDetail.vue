<template>
	<view>
		<uni-nav-bar left-icon="back" title="活动合集" @clickLeft="clickLeft"></uni-nav-bar>
		<view class="container">
			<view class="activity-title">
				<view class="activity-title-left"> </view>
				<view class="activity-title-right"><text>{{groupName}}</text></view>
			</view>
			<swiper  class="swiper-box">
				<swiper-item>
					<special-banner @swiperChange="swiperChange" :banner-list="bannerList" :swiper-config="swiperConfig"></special-banner>
					<gallery-swiper imageHeight="400" height="700"
					
					:images="bannerList[currentIndex].images" 
					:imageBackground="true" 
					space="15">
					</gallery-swiper>
				</swiper-item>
			</swiper>
		</view>
		
	</view>
</template>

<script>
	import gallerySwiper from '@/components/QS-gallery-swiper/QS-gallery-swiper'
	import specialBanner from '@/components/EtherealWheat-banner/specialBanner'
	export default {
		data() {
			return {
				currentIndex:0,
				groupName:"轻松一校",
				bannerList: [{
				            picture: 'http://image.mishi.cn/r/yry_h5_test/detail/3_1535359279285.png',
				            title: '七夕将至：时光足够久，韧性也能炖出味',
				            description: '一万年太久，就现在，给你爱',
							images:[
								"https://lz.sinaimg.cn/orj1080/967d9727ly3gc0whyfofkj20sg0sg4av.jpg",
								"https://images.mepai.me/app/works/38224/2019-12-25/w_5e02b44081594/05e02b440816c9.jpg",
								"https://images.mepai.me/app/works/38224/2019-12-22/w_5dfecd711bb5a/05dfecd711bc6b.jpg!1200w.jpg",
								"https://images.mepai.me/app/works/38224/2019-12-20/w_5dfc9e15050c3/05dfc9e150521e.jpg!1200w.jpg",
								"https://images.mepai.me/app/works/38224/2019-12-18/w_5df9775238e16/05df9775238fe0.jpg!1200w.jpg",
								"https://images.mepai.me/app/works/38224/2019-12-15/w_5df5906a6bd94/05df5906a6befb.jpg!1200w.jpg",
								"https://images.mepai.me/app/works/38224/2019-12-13/w_5df2e36df1c1c/05df2e36df1dc2.jpg!1200w.jpg",
								"https://images.mepai.me/app/works/38224/2019-12-11/w_5df03f532c12d/05df03f532c285.jpg!1200w.jpg",
							],
				            path: ''
				        }, {
				            picture: 'http://image.mishi.cn/r/yry_h5_test/detail/2_1535359240426.png',
				            title: '新菜上架：无边海洋，找到顺眼的那尾鱼',
				            description: '花中樱，鱼乃鲷花中樱，鱼乃鲷',
							images:[
			
								"https://images.mepai.me/app/works/38224/2019-12-22/w_5dfecd711bb5a/05dfecd711bc6b.jpg!1200w.jpg",
								"https://images.mepai.me/app/works/38224/2019-12-20/w_5dfc9e15050c3/05dfc9e150521e.jpg!1200w.jpg",
								
							],
				            path: ''
				        }, {
				            picture: 'http://image.mishi.cn/r/yry_h5_test/detail/1_1535359204228.png',
				            title: '在湘西的烟火气里，发现苗族少女的神明',
				            description: '取材自湘西苗族传统的烟熏文化',
							images:[
								
								"https://images.mepai.me/app/works/38224/2019-12-18/w_5df9775238e16/05df9775238fe0.jpg!1200w.jpg",
								"https://images.mepai.me/app/works/38224/2019-12-15/w_5df5906a6bd94/05df5906a6befb.jpg!1200w.jpg",
								"https://images.mepai.me/app/works/38224/2019-12-13/w_5df2e36df1c1c/05df2e36df1dc2.jpg!1200w.jpg",
								"https://images.mepai.me/app/works/38224/2019-12-11/w_5df03f532c12d/05df03f532c285.jpg!1200w.jpg",
							],
				            path: ''
				        }, {
				            picture: 'http://image.mishi.cn/r/yry_h5_test/detail/4_1535359327213.png',
				            title: '福利降临，陪伴独自行走的丰盛旅程',
				            description: '在自己的小世界里，日日好日，夜夜好清宵',
							images:[
			
								"https://images.mepai.me/app/works/38224/2019-12-13/w_5df2e36df1c1c/05df2e36df1dc2.jpg!1200w.jpg",
								"https://images.mepai.me/app/works/38224/2019-12-11/w_5df03f532c12d/05df03f532c285.jpg!1200w.jpg",
							],
				            path: ''
				        }],
				        swiperConfig: {
				            indicatorDots: true,
				            indicatorColor: 'rgba(255, 255, 255, .4)',
				            indicatorActiveColor: 'rgba(255, 255, 255, 1)',
				            autoplay: false,
				            interval: 3000,
				            duration: 300,
				            circular: true,
				            previousMargin: '58rpx',
				            nextMargin: '58rpx'
				        }
				
			};
		},
		components:{
			gallerySwiper,
			specialBanner
		},
		methods:{
			swiperChange(index){
				this.currentIndex = index
			},
			clickLeft() {
				uni.navigateBack({
					animationDuration: 300,
					animationType: 'pop-out'
				})
			},
		},
		created() {
			
		},
		onLoad(option) {
			console.log(option.index)
		}
	}
</script>

<style lang="scss" scoped>
	.activity{
		&-title{
			display: flex;
			height: 40rpx;
			align-items: center;
			justify-content: center;
			margin-bottom: 10upx;
			&-left{
				background: #3498db;
				width: 10rpx;
				background-clip:content-box;
				height: 100%;
			}
			&-right{
				font: {
					size: 36rpx;
					weight:500;
				};
			}
			
		}
	}
	.container{
		height: 100vh;
		position: relative;
		.swiper-box{
			position: absolute;
			top: 4%;
			
			height: 80%;
			width: 100%;
			
		}
		
	}
	
</style>
