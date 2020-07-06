<template>
	<view class="c_mask">		
	<!-- :style="`width:${swiper_width}rpx;transform:translateX(${pre_x +trans_x}px);${!dont_ani ? 'transition:'+trans_time+'s' : ''}`" -->
		<view 		
		v-bind:style="{
			width: swiper_width + 'rpx',
			transform: 'translateX(' + (pre_x + trans_x) + 'px)',
			transition: !dont_ani ? trans_time + 's' : 'none'
		}"
		@touchstart="touchStart"
		@touchmove="touchMove"
		@touchend="touchEnd"
		@click="swiperClick"
		class="c_swiper">
			<view
			v-for="(item,index) in img_list"
			:key="index"
			class="c_swiper_item">
				<image class="introduce_img" :src="item" mode="aspectFill"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			img_list: {
				type: Array,
				default: () => {
					return [];
				}
			},
			trans_time: {
				type: Number,
				default: .2
			}
		},
		data () {
			return {
				swiper_width: this.img_list.length * 750,
				screen_width: 0,
				// 当前是哪一页
				now_page: 1,
				touch_start: {},
				trans_x: 0,
				pre_x: 0,
				// 是否是最后一张图还要往右边滑
				is_last_page: false,
				// 不播放动画
				dont_ani: false,
				// 是否可以移动
				can_move: true
			}
		},
		mounted () {			
			// 获取屏幕宽度
			uni.getSystemInfo({
				success: res => {
					this.screen_width = res.windowWidth;					
				}
			})
		},
		methods: {
			swiperClick () {				
				this.$emit('swiperClick',this.now_page);
			},
			touchStart (e) {
				if (!this.can_move) {
					return false;
				}
				this.touch_start = e.mp.touches[0];
				this.dont_ani = true;
			},
			touchMove (e) {
				if (!this.can_move) {
					return false;
				}
				let {clientX} = e.mp.touches[0];
				if (this.now_page == 1 && clientX - this.touch_start.clientX > 0) {
					return false;
				} else if (this.now_page == this.img_list.length && clientX - this.touch_start.clientX < 0) {
					this.is_last_page = true;
					return false;
				}
				this.is_last_page = false;
				this.trans_x = parseInt(clientX - this.touch_start.clientX);
			},
			touchEnd (e) {
				if (this.can_move) {
					this.can_move = false;
					setTimeout(() => {
						this.can_move = true;
					}, this.trans_time*1000)					
				}else{
					return false;
				}
				if (this.is_last_page) {
					this.$emit('lastPage');	
					this.trans_x = 0;
					return false;
				}
				
				if (Math.abs(this.trans_x) > this.screen_width / 4) {
					if (this.trans_x > 0) {
						this.pre_x += this.screen_width;
						this.now_page--;
					} else {
						this.pre_x -= this.screen_width;
						this.now_page++;
					}
				}else {
					this.trans_x = 0;
				}
				this.trans_x = 0;
				this.dont_ani = false;
				
			}
		}
	}
</script>

<style lang="less">
.c_mask{
	width: 750rpx;
	overflow: hidden;
}
.c_swiper{	
	width: 100%;
	height: 100vh;
	.c_swiper_item{
		width: 750rpx;
		height: 100%;
		float: left;
	}
}
.introduce_img{
	position: absolute;
	width: 750rpx;
	height: 100%;
}
</style>
