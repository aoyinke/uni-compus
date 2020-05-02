<template>
	<view class="contaier">
		<uni-nav-bar>

			<view class="filter" slot="left" @click="openFilter">
				<text class="eosfont">&#xe614;</text>
				<text>筛选</text>
			</view>

		</uni-nav-bar>
		<view style="">
			<lv-select
				@handleSearch="handleSearch"
				@change="change"
				placeholder="快来寻找志同道合的小伙伴吧~"
				:infoList="infoList"
				:showValue="showValue"
				v-model="searchValue"
				:loading="loading"
				type="primary"
				:uniShadow="true"
			></lv-select>
		</view>
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

		<uni-drawer ref="uniDrawer" mode="right" width="320">
			<view style="padding:30rpx;" class="filter-container">
				<view class="filter-content" v-for="(filter,index) in filters" :key="index">
					<filterBar :title="filter.title" :choices="filter.choices"></filterBar>
				</view>
				<view class="filter-container-bottom">
					<uniCompusButton content="重置" background="#eb4d4b" width="48"></uniCompusButton>
					<uniCompusButton content="确认" background="#f0932b" width="48"></uniCompusButton>
				</view>
			</view>
		</uni-drawer>
	</view>
</template>

<script>
	import lvSelect from '@/components/lv-select/lv-select.vue';
	import waterFall from '@/components/waterfall.vue'
	import tapBar from '@/components/tapBar.vue'
	import uniDrawer from "@/components/uni-drawer/uni-drawer.vue"
	import filterBar from '@/components/uni-compus-components/uniCompus-filter.vue'
	import uniCompusButton from '@/components/uni-compus-components/unicompus-button.vue'
	import photoWall from '@/config/wallpapers.js'
	export default {
		data() {
			return {
				loading: false,
				showValue: 'name', // 需要显示的数据，必须与infoList中的name对应
				searchValue: '',
				infoList: [],
				infoLists: [
					{
						name: '吕星辰1'
					},
					{
						name: '吕星辰2'
					},
					{
						name: '吕星辰3'
					},
					{
						name: '吕星辰4'
					}
				],
				filters: [{
					title: "兴趣爱好",

					choices: ['舞蹈', '电竞', '书法', '书法']
				}, {
					title: "兴趣爱好",

					choices: ['舞蹈', '电竞', '书法', '书法']
				}, {
					title: "兴趣爱好",

					choices: ['舞蹈', '电竞', '书法', '书法']
				}],
				swiperHeight: 0,
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
					},{
						src: "../static/test/waterfull/3.jpg",
						groupName: "轻松一校",
						introduction: "来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊",
						loveNum: 0
					},{
						src: "../static/test/waterfull/3.jpg",
						groupName: "轻松一校",
						introduction: "来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊",
						loveNum: 0
					},{
						src: "../static/test/waterfull/3.jpg",
						groupName: "轻松一校",
						introduction: "来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊",
						loveNum: 0
					}]
					
				]

			};
		},
		components: {
			waterFall,
			tapBar,
			uniDrawer,
			filterBar,
			uniCompusButton,
			lvSelect
		},
		methods: {
			handleSearch() {
				this.loading = true;
				setTimeout(() => {
					this.loading = false;
					this.infoList = this.infoLists;
				}, 2000);
			},
			change(val){
			        console.log(val)
			},
			tabChange(e) {
				this.tapIndex = e.detail.current
			},
			tabtap(index) {
				this.tapIndex = index
			},
			openFilter() {
				this.$refs.uniDrawer.open()
			},
			search() {

			},
			input() {

			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					let height = res.windowHeight - uni.upx2px(110)
					this.swiperHeight = height
				}
			})
			this.peopleList[0].forEach((item,index)=> item.src=photoWall[index+1])
		},
		onReachBottom() {
			console.log("asdasd")
		}
	}
</script>

<style lang="scss" scoped>
	.filter {
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		width: 100%;

	}

	.filter-container {
		position: relative;
		height: 100vh;

		.filter-container-bottom {
			width: 100%;
			position: absolute;
			bottom: 10%;
			margin: 10upx;
			right: -5%;

		}
	}
</style>
