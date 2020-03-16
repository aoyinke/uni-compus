<template>
	<view class="container">
		<uni-nav-bar left-icon="back" left-text="返回"  title="社区"></uni-nav-bar>
		<view class="main">
			<tapBar :tap-bars="tarBars" :tap-index="tapIndex" @taptab="tabtap"></tapBar>
			<view class="uni-tab-bar">
				<swiper class="swiper-box" :style="{height:swiperHeight + 'px'}" :current="tapIndex" @change="tabChange">
					<swiper-item v-for="(items,index) in newsList" :key="index">
						<scroll-view scroll-y class="list">
								<activity :content="items.content"></activity>
						</scroll-view>
					</swiper-item>
				</swiper>

			</view>

		</view>

	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import activity from "@/components/activity.vue"
	import tapBar from "@/components/tapBar.vue"
	export default {
		data() {
			return {
				swiperHeight: 0,
				tapIndex: 0,
				newsList: [{
					content: [{
						grouplogo: "../static/test/avatar.png",
						groupName: "比赛大佬组",
						activityStartTime: "17小时前",
						activityPropagate: {
							type: "img",
							src: ['../static/test/1.jpg', '../static/test/timg.jpg', '../static/test/3.png']
						},
						hotNum: 80,
						commentNum: 6,
						commentDetail: [{
							commentor: "天堂屠夫",
							commentContent: "nb....."
						},
						{
							commentor: "天堂屠夫",
							commentContent: "tnb....."
						},
						{
							commentor: "天堂屠夫",
							commentContent: "cznb....."
						}]
					},
					{
						grouplogo: "../static/test/avatar.png",
						groupName: "比赛大佬组",
						activityStartTime: "17小时前",
						activityPropagate: {
							type: "img",
							src: ['../static/test/1.jpg', '../static/test/timg.jpg', '../static/test/3.png']
						},
						hotNum: 80,
						commentNum: 6,
						commentDetail: [{
							commentor: "天堂屠夫",
							commentContent: "nb....."
						},
						{
							commentor: "天堂屠夫",
							commentContent: "tnb....."
						},
						{
							commentor: "天堂屠夫",
							commentContent: "cznb....."
						}]
					}],
				},
				{
					content: [{
						grouplogo: "../static/test/avatar.png",
						groupName: "比赛大佬组",
						activityStartTime: "17小时前",
						activityPropagate: {
							type: "img",
							src: ['../static/test/1.jpg', '../static/test/timg.jpg', '../static/test/3.png']
						},
						hotNum: 80,
						commentNum: 6,
						commentDetail: [{
							commentor: "天堂屠夫",
							commentContent: "nb....."
						},
						{
							commentor: "天堂屠夫",
							commentContent: "tnb....."
						},
						{
							commentor: "天堂屠夫",
							commentContent: "cznb....."
						}]
					}],
				}],
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
				]
			}

		},
		methods: {
			tabChange(e) {
				this.tapIndex = e.detail.current
			},
			tabtap(index) {
				this.tapIndex = index
			}
		},
		components: {
			uniNavBar,
			activity,
			tapBar
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					let height = res.windowHeight - uni.upx2px(100)
					this.swiperHeight = height
				}
			})
			
		}
	}
</script>

<style lang="scss" scoped>

</style>
