<template>
	<view class="container">
		<uni-nav-bar>
			<view slot="left" class="nav-bar-left" @tap="topublish"><image :src="leftIcon" mode=""></image></view>
		</uni-nav-bar>
		<view class="main">
			<tapBar :tap-bars="tarBars" :tap-index="tapIndex" @taptab="tabtap"></tapBar>

			<view class="uni-tab-bar">
				<swiper class="swiper-box" :style="{ height: swiperHeight + 'px' }" :current="tapIndex" @change="tabChange">
					<swiper-item v-for="(val,key, index) in communityList" :key="index">
						<scroll-view scroll-y class="list" @scroll="hideFavButton" @click="test(communityList[key])"><activity :activityInfo="communityList[key]"></activity></scroll-view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<view>
			<uni-fab
				v-if="showPopButton"
				:pattern="pattern"
				:popMenu="ispopMenu"
				:content="content"
				horizontal="right"
				vertical="bottom"
				direction="horizontal"
				@trigger="trigger"
				@fabClick="showMenu"
			></uni-fab>
		</view>
	</view>
</template>

<script>
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
import activity from '@/components/activity/activity.vue';
import tapBar from '@/components/tapBar.vue';
import uniFab from '@/components/uni-fab/uni-fab.vue';
import photoWall from '@/config/wallpapers.js';

import {mapState} from 'vuex'
let timer;
export default {
	computed:{
		...mapState([
			"activity"
		]),
		communityList(){
			switch(this.contentIndex){
				case 0:
					return this.activity.activityInfo
				case 1:
					return this.activity.groupDynamic
				case 2:
					return this.activity.knowledge
			}
		},
	},
	data() {
		return {
			contentIndex:0,
			content: [
				{
					iconPath: '../../static/index/MyActivity.png',
					selectedIconPath: '../../static/index/MyActivity.png',
					text: '活动',
					active: true
				},
				{
					iconPath: '../../static/index/answer.png',
					selectedIconPath: '../../static/index/answer.png',
					text: '动态',
					active: false
				},
				// {
				// 	iconPath: "../../static/index/answer.png",
				// 	selectedIconPath: "../../static/index/answer.png",
				// 	text: "问答",
				// 	active: false
				// },
				{
					iconPath: '../../static/index/knowledge.png',
					selectedIconPath: '../../static/index/knowledge.png',
					text: '知识',
					active: false
				}
			],
			pattern: {
				buttonColor: '#1e90ff'
			},
			showPopButton: true,
			ispopMenu: false,
			leftIcon: '../../static/index/pencil.png',
			swiperHeight: 0,
			tapIndex: 0,
			tarBars: [
				{
					name: '关注',
					id: 'guanzhu'
				},
				{
					name: '舞蹈',
					id: 'wudao'
				},
				{
					name: '电竞',
					id: 'dianjing'
				},
				{
					name: '书法',
					id: 'shufa'
				},
				{
					name: '电影',
					id: 'dianying'
				},
				{
					name: '编程',
					id: 'biancheng'
				}
			]
		};
	},
	onShareAppMessage(res) {
		let that = this;
		if (res.from === 'button') {
			// 来自页面内分享按钮
			console.log(res.target);
		}
		return {
			title: '轻松一校小程序',
			path: '/pages/index/index'
		};
	},
	methods: {
		test(key){
			console.log(key)
		},
		async hideFavButton() {
			let that = this;
			clearTimeout(timer); // 每次滚动前 清除一次
			that.showPopButton = false;
			timer = await setTimeout(function() {
				that.showPopButton = true;
			}, 500);
		},
		showMenu() {
			this.ispopMenu = true;
		},
		trigger(e) {
			this.content.forEach((item, index) => {
				return (item.active = false);
			});
			let index = e.index
			this.contentIndex = index
			this.content[index].active = true;
			this.ispopMenu = false;

		},
		tabChange(e) {
			this.tapIndex = e.detail.current;
		},
		tabtap(index) {
			this.tapIndex = index;
		},
		topublish() {
			let isLogin = this.checkLogin('../index/index', '2');
			if (!isLogin) {
			} else {
				uni.navigateTo({
					url: '../publishActivity/publishActivity',
					animationType: 'slide-in-left'
				});
			}
		}
	},
	components: {
		activity,
		tapBar,
		uniFab
	},
	onLoad() {
		uni.getSystemInfo({
			success: res => {
				let height = res.windowHeight - uni.upx2px(161.4);
				this.swiperHeight = height;
			}
		});
		
		// for (let i = 0; i < 4; i++) {
		// 	this.newsList.push(this.newsList[0]);
		// }
	}
};
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
