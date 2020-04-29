<template>
	<view class="contaier">
		
		<swiper
		  circular
		  class="gallery"
		  interval="6000"
		  :current="home.galleryIndex"
		  @change="handleSwiperChange"
		  @transition="handleSwiperTarget"
		  @animationfinish="handleSwiperFinish"
		>
		  <swiper-item v-for="(item,index) in home.gallery" :key="index">
		    <image :src="item" lazy-load mode="aspectFill">
		  </swiper-item>
		</swiper>
		<!-- 自定义滑动指示点 -->
		<view class="dots">
		  <view class="dots-count">
		    <text>{{ home.galleryIndex+1 }}</text>
		    \{{ home.gallery.length }}
		  </view>
		  <kp-swiper
		    v-model="home.gallery"
		    :dotsIndex="home.galleryIndex"
		    :dotsDirection="home.galleryDirection"
		    @update="val=>home.galleryIndex=val"
		  />
		</view>
		
	</view>
</template>

<script>
	import kSwiper from '@/components/kp-swiper/index.vue'
	import config from '@/config/index.js'
	export default {
		data() {
			return {
				home: {
				  gallery: [
				    "/orj1080/967d9727ly3gc0whyclfoj20sg0sge0a.jpg",
				    "/orj1080/967d9727ly3gc0whyfofkj20sg0sg4av.jpg",
				    "/orj1080/967d9727ly3gc0whykstlj20sg0sgb29.jpg",
				    "/orj1080/967d9727ly3gc0whywdupj20sg0sgb0l.jpg",
				    "/orj1080/967d9727ly3gc0whysphij20sg0sgkcg.jpg",
				    "/orj1080/967d9727ly3gc0whyiy96j20sg0sg1jj.jpg",
				    "/orj1080/967d9727ly3gc0whz3i51j20sg0sgu0x.jpg",
				    "/orj1080/967d9727ly3gc0whz6qvlj20sg0sghdt.jpg",
				    "/orj1080/967d9727ly3gc0whz6yf1j20sg0sgkic.jpg"
				  ].map(row => config.baseConfig.img_example + row),
				  galleryIndex: 0, //相册初始化位置
				  galleryDirection: "" //滑动方向
				},
			};
		},
		components:{
			kSwiper
		},
		onLoad() {
			
		},
		methods:{
			handleSwiperChange(e) {
			  // https://developers.weixin.qq.com/miniprogram/dev/component/swiper.html
			  // source为touch时由用户触摸引起
			  if (e.detail.source === "touch") {
			    this.home.galleryIndex = e.target.current;
			  }
			},
			handleSwiperTarget(e) {
			  this.home.galleryDirection =
			    (e.detail.dx > 0 && "left") || (e.detail.dx < 0 && "right");
			},
			handleSwiperFinish(e) {
			  if (!e.detail.source) {
			    this.home.galleryDirection = "";
			  }
			},
		}
	}
</script>

<style lang="scss" scoped>

</style>
