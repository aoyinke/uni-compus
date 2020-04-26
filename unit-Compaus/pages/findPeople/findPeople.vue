<template>
	<view class="contaier">
		<uni-nav-bar title="人脉检索"></uni-nav-bar>
		<tap-bar :tap-bars="tarBars" :tap-index="tapIndex" @taptab="tabtap"></tap-bar>
		<view class="uni-tab-bar">
			<swiper class="swiper-box" :current="tapIndex" @change="tabChange()" :style="{height:swiperHeight + 'px'}">
				<swiper-item v-for="(people,id) in peopleList" :key="id">
					<scroll-view scroll-y class="list">
						<water-fall :peopleList="people"></water-fall>
					</scroll-view>
					
				</swiper-item>
			
			</swiper>
		</view>
		

	</view>
</template>

<script>
	import waterFall from '@/components/waterfall.vue'
	import tapBar from '@/components/tapBar.vue'
	export default {
		data() {
			return {
				swiperHeight:0,
				tapIndex: 0,
				tarBars: [{
						name: "关注",
						id: "guanzhu"
					},
					{
						name: "舞蹈",
						id: "wudao"
					},
					{
						name: "电竞",
						id: "dianjing"
					},
					{
						name: "书法",
						id: "shufa"
					},
					{
						name: "电影",
						id: "dianying"
					},
					{
						name: "编程",
						id: "biancheng"
					}
				],
				peopleList: [
					[{
						src: "../static/test/waterfull/1.jpg",
						introduction: "来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊",
						loveNum: 0,
						tag: ['nb', '无与伦比', '技术宅'],
						groupName: "轻松一校"
					}, {
						src: "../static/test/waterfull/2.jpg",
						groupName: "轻松一校",
						introduction: "来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊",
						loveNum: 0
					}, {
						src: "../static/test/waterfull/3.jpg",
						groupName: "轻松一校",
						introduction: "来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊",
						loveNum: 0
					}, {
						src: "../static/test/waterfull/4.jpg",
						groupName: "轻松一校",
						introduction: "来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊",
						loveNum: 0
					}, {
						src: "../static/test/waterfull/5.jpg",
						groupName: "轻松一校",
						introduction: "来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊",
						loveNum: 0
					}, {
						src: "../static/test/waterfull/6.jpg",
						groupName: "轻松一校",
						introduction: "来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊",
						loveNum: 0
					}, {
						src: "../static/test/waterfull/7.jpg",
						groupName: "轻松一校",
						introduction: "来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊",
						loveNum: 0
					}, {
						src: "../static/test/waterfull/8.jpg",
						groupName: "轻松一校",
						introduction: "来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊",
						loveNum: 0
					}, {
						src: "../static/test/waterfull/9.jpg",
						groupName: "轻松一校",
						introduction: "来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊",
						loveNum: 0
					}, {
						src: "../static/test/waterfull/10.jpg",
						groupName: "轻松一校",
						introduction: "来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊",
						loveNum: 0
					}, {
						src: "../static/test/waterfull/11.jpg",
						groupName: "轻松一校",
						introduction: "来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊",
						loveNum: 0
					}, {
						src: "../static/test/waterfull/12.jpg",
						groupName: "轻松一校",
						introduction: "来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊",
						loveNum: 0
					}]
				]

			};
		},
		components: {
			waterFall,
			tapBar
		},
		methods: {
			tabChange(e) {
				this.tapIndex = e.detail.current
			},
			tabtap(index) {
				this.tapIndex = index
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					let height = res.windowHeight - uni.upx2px(110)
					this.swiperHeight = height
				}
			})
		},
		onReachBottom(){
			console.log("asdasd")
		}
	}
</script>

<style lang="scss" scoped>

</style>
