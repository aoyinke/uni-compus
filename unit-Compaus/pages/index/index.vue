<template>
	<view class="container">
		<uni-nav-bar>
			<view slot="left" class="nav-bar-left" @tap="topublish">
				<image :src="leftIcon" mode=""></image>
			</view>

			<slot>
				<view class="default">
					<uni-search-bar placeholder="输入关键词" @confirm="search"></uni-search-bar>

				</view>
			</slot>
		</uni-nav-bar>
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
	import activity from "@/components/activity/activity.vue"
	import tapBar from "@/components/tapBar.vue"
	export default {
		data() {
			return {
				leftIcon: "../../static/index/pencil.png",
				swiperHeight: 0,
				tapIndex: 0,
				newsList: [{
						content: [{
								groupLogo: "../../static/test/avatar.png",
								groupName: "比赛大佬组",
								activityStartTime: "17小时前",
								activityPropagate: {
									type: "img",
									src: ['../../static/test/1.jpg', '../../static/test/timg.jpg', '../../static/test/3.png']
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
								groupLogo: "../../static/test/avatar.png",
								groupName: "比赛大佬组",
								activityStartTime: "17小时前",
								activityPropagate: {
									type: "img",
									src: ['../../static/test/1.jpg', '../../static/test/timg.jpg', '../../static/test/3.png']
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
								groupLogo: "../../static/test/avatar.png",
								groupName: "比赛大佬组",
								activityStartTime: "17小时前",
								activityPropagate: {
									type: "img",
									src: ['../../static/test/1.jpg', '../../static/test/timg.jpg', '../../static/test/3.png']
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
							groupLogo: "../../static/test/avatar.png",
							groupName: "比赛大佬组",
							activityStartTime: "17小时前",
							activityPropagate: {
								type: "img",
								src: ['../../static/test/1.jpg', '../../static/test/timg.jpg', '../../static/test/3.png']
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
			topublish(){
				let isLogin = this.checkLogin('../index/index','2')
				if(!isLogin){
					uni.navigateTo({
						url:"../publishActivity/publishActivity",
						animationType:"slide-in-left",
						
					})
				}
				
			}
		},
		components: {
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
	.nav-bar-left {
		margin-left: 40upx;
		image {
			width: 70upx;
			height: 70upx;
			margin: auto;
		}
	}
	.default{
		width: 100%;
	}
</style>
