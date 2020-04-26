<template>
	<view class="container">
		<uni-nav-bar>

			<view slot="left" class="nav-bar-left" @tap="topublish">
				<image :src="leftIcon" mode=""></image>
			</view>


		</uni-nav-bar>
		<view class="main">
			<topBar></topBar>
			<tapBar :tap-bars="tarBars" :tap-index="tapIndex" @taptab="tabtap"></tapBar>

			<view class="uni-tab-bar">
				<swiper class="swiper-box" :style="{height:swiperHeight + 'px'}" :current="tapIndex" @change="tabChange">
					<swiper-item v-for="(items,index) in newsList" :key="index">
						<scroll-view scroll-y class="list">
							<activity :activityInfo="items.content"></activity>
						</scroll-view>
					</swiper-item>
				</swiper>

			</view>

		</view>

	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import activity from "@/components/activity/activity.vue"
	import tapBar from "@/components/tapBar.vue"
	import topBar from '@/components/index/topBar.vue'

	export default {
		data() {
			return {
				leftIcon: "../../static/index/pencil.png",
				swiperHeight: 0,
				tapIndex: 0,
				newsList: [{
						content: [{
								groupLogo: "../../static/test/waterfull/1.jpg",
								description: "宣城市教体局4月24日通知称，为坚守校园安全防线，2020年“五一”5天假期总体要求是“不出市、不聚集”，全市中小学幼儿园教职员工和学生一律不得离开宣城市范围，不参加人员聚集性活动，减少与外人接触。确有特殊情况需要出市的，必须提前报备，回宣后按规定检测、隔离，隔离期满持复课（复工）证明后方可返校。各校要向家长发出温馨提示，建议家长为了孩子的安全考虑，“五一”假期尽量不出本市，严格做好自我防护。",
								groupName: "比赛大佬组",
								activityStartTime: "17小时前",
								activityPropagate: {
									type: "img",
									src: ['../../static/test/waterfull/1.jpg', '../../static/test/waterfull/2.jpg',
										'../../static/test/waterfull/3.jpg'
									]
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
									}
								]
							},
							{
								groupLogo: "../../static/test/waterfull/1.jpg",
								groupName: "比赛大佬组",
								activityStartTime: "17小时前",
								activityPropagate: {
									type: "img",
									src: ['../../static/test/waterfull/1.jpg', '../../static/test/waterfull/2.jpg',
										'../../static/test/waterfull/3.jpg'
									]
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
									}
								]
							},
							{
								groupLogo: "../../static/test/waterfull/1.jpg",
								groupName: "比赛大佬组",
								activityStartTime: "17小时前",
								activityPropagate: {
									type: "img",
									src: ['../../static/test/waterfull/1.jpg', '../../static/test/waterfull/2.jpg',
										'../../static/test/waterfull/3.jpg'
									]
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
									}
								]
							}
						],
					},
					{
						content: [{
							groupLogo: "../../static/test/waterfull/1.jpg",
							groupName: "比赛大佬组",
							activityStartTime: "17小时前",
							activityPropagate: {
								type: "img",
								src: ['../../static/test/waterfull/1.jpg', '../../static/test/waterfull/2.jpg',
									'../../static/test/waterfull/3.jpg'
								]
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
								}
							]
						}],
					}
				],
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
		onShareAppMessage(res) {
			let that = this;
			if (res.from === 'button') { // 来自页面内分享按钮
				console.log(res.target)
			}
			return {
				title: '轻松一校小程序',
				path: '/pages/index/index'

			}

		},
		methods: {
			tabChange(e) {
				this.tapIndex = e.detail.current
			},
			tabtap(index) {
				this.tapIndex = index
			},
			topublish() {
				let isLogin = this.checkLogin('../index/index', '2')
				if (!isLogin) {

				} else {
					uni.navigateTo({
						url: "../publishActivity/publishActivity",
						animationType: "slide-in-left",

					})
				}

			}
		},
		components: {
			activity,
			tapBar,
			topBar
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					let height = res.windowHeight - uni.upx2px(161.4)
					this.swiperHeight = height
				}
			})

		}
	}
</script>

<style lang="scss" scoped>
	.nav-bar-left {
		margin-left: 80upx;

		image {
			width: 70upx;
			height: 70upx;
			margin: auto;
		}
	}

	.default {
		width: 100%;
	}
</style>
