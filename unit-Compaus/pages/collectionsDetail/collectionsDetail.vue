<template>
	<view>
		<uni-nav-bar left-icon="back" title="活动合集" @clickLeft="clickLeft"></uni-nav-bar>
		<view class="container">
			<swiper  class="swiper-box">
				<swiper-item v-for="(item,index) in groupActivityCollections" :key="index">
					<view class="activity">
						<view class="activity-title">
							<view class="activity-title-left"> </view>
							<view class="activity-title-right"><text>{{item.title}}</text></view>
						</view>
						<view class="activity-photos">
							<gallery-swiper imageHeight="400" height="700" :indicatorDotsConfig="item.indicatorDotsConfig" :images="item.photos" :imageBackground="true" space="15"></gallery-swiper>
						</view>
					</view>
					
				</swiper-item>
				
			</swiper>
		</view>
		
	</view>
</template>

<script>
	import gallerySwiper from '@/components/QS-gallery-swiper/QS-gallery-swiper'
	export default {
		data() {
			return {
				groupActivityCollections:[
					
					{	
						
						title:"轻松一校上线",
						indicatorDotsConfig:{left:"20rpx",bottom:"20rpx"},
						photos:[
						"https://lz.sinaimg.cn/orj1080/967d9727ly3gc0whyfofkj20sg0sg4av.jpg",
						"https://images.mepai.me/app/works/38224/2019-12-25/w_5e02b44081594/05e02b440816c9.jpg",
						"https://images.mepai.me/app/works/38224/2019-12-22/w_5dfecd711bb5a/05dfecd711bc6b.jpg!1200w.jpg",
						"https://images.mepai.me/app/works/38224/2019-12-20/w_5dfc9e15050c3/05dfc9e150521e.jpg!1200w.jpg",
						"https://images.mepai.me/app/works/38224/2019-12-18/w_5df9775238e16/05df9775238fe0.jpg!1200w.jpg",
						"https://images.mepai.me/app/works/38224/2019-12-15/w_5df5906a6bd94/05df5906a6befb.jpg!1200w.jpg",
						"https://images.mepai.me/app/works/38224/2019-12-13/w_5df2e36df1c1c/05df2e36df1dc2.jpg!1200w.jpg",
						"https://images.mepai.me/app/works/38224/2019-12-11/w_5df03f532c12d/05df03f532c285.jpg!1200w.jpg",
						"https://images.mepai.me/app/works/38224/2019-12-08/w_5dec4ca4a2700/05dec4ca4a2878.jpg!1200w.jpg",
						"https://images.mepai.me/app/works/38224/2019-12-06/w_5de9a4a416f64/05de9a4a4170a0.jpg!1200w.jpg",
						"https://images.mepai.me/app/works/38224/2019-12-03/w_5de5ad262f86a/05de5ad262fa17.jpg!1200w.jpg",
					]}
				]
			};
		},
		components:{
			gallerySwiper
		},
		methods:{
			
			clickLeft() {
				uni.navigateBack({
					animationDuration: 300,
					animationType: 'pop-out'
				})
			},
		},
		created() {
			
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
				width: 20rpx;
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
			right: 10%;
			height: 80%;
			width: 80%;
		}
		
	}
	
</style>
