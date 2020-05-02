<template>
	<view>
		<uni-nav-bar left-icon="back" title="我的工作" @clickLeft="clickLeft"></uni-nav-bar>
		<time-line ref="timeline" location="left" title="my works"></time-line>
	</view>
</template>

<script>
	import timeLine from '@/components/xuan-timeLine/xuan-timeLine.vue'
	import card from '@/components/list-card/list-card.vue'
	
	export default {
		data() {
			return {
				time: 0,
				isclick: true,
				cardinfo: {
					"authImg": '图片地址',
					"authName": "张三",
					"createTime": "2020-02-01",
					"content": " 内容",
					"goodNum": "100",
					"likeNum": "200",
					"commentNum": "500",
					"leave": 8,
					"tag": "每日随笔"
				}
			};
		},
		components: {
			card,
			timeLine
		},
		onPageScroll() {
			this.$refs.timeline.getScroll();
		},
		methods: {
			clickLeft() {
				uni.navigateBack({
					animationDuration: 300,
					animationType: 'pop-out'
				})
			},
			timer() {
				if (this.time > 0) {
					this.isclick = false;
					this.time--;
					setTimeout(this.timer, 1)
				} else {
					this.isclick = true;
					this.time = 10
				}
			}
		},
		onPageScroll() {
			if (this.isclick) {
				this.timer();
				this.$refs.timeline.getScroll();
			}
		},
	}
</script>

<style lang="scss" scoped>

</style>
