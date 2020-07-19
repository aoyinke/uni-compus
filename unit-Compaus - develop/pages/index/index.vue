<template>
	<view class="container">
		<uni-nav-bar>
			<view slot="left" class="nav-bar-left" @tap="topublish"><image :src="leftIcon" mode=""></image></view>
		</uni-nav-bar>

		<view class="main">
			<tapBar :tap-bars="tarBars" :tap-index="tapIndex" @taptab="tabtap"></tapBar>

			<view class="uni-tab-bar">
				<swiper class="swiper-box" :style="{ height: swiperHeight + 'px' }" :current="tapIndex" @change="tabChange">
					<swiper-item v-for="(val, index) in tarBars" :key="index">
						<scroll-view scroll-y class="list" @scroll="hideFavButton">
							
								<view v-for="data in communityListChanged"><activity-item :item="data" :contentIndex="contentIndex"></activity-item></view>
						</scroll-view>
					</swiper-item>
					<view class="nextPage" v-show="!nextPage">
						<span style="white-space:pre">   </span><span class="line"></span>
						<span style="white-space:pre">   </span><span class="txt">没有更多了哦~(●'◡'●)</span>
						<span style="white-space:pre">   </span><span class="line"></span>								
					</view>
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
import activityItem from '@/components/activity/activity-item.vue';
import tapBar from '@/components/tapBar.vue';
import uniFab from '@/components/uni-fab/uni-fab.vue';
import photoWall from '@/config/wallpapers.js';


import { mapState } from 'vuex';

let timer;
export default {
	async onReachBottom(res) {	
		this.currentPage+=1;
		if (this.tarBars[this.tapIndex].name == '关注') {
			let type = 100;
			switch (this.contentIndex) {
				case 0:
					type = 100;
					break;
				case 1:
					type = 200;
					break;
				case 2:
					type = 400;
					break;
			}
			let concern = await this.request(`v1/ActivityInfo/userLiked?currentPage=${this.currentPage}&type=${type}`);
			
			if(concern[1].data.length){
				this.communityListChanged = this.communityListChanged.concat(concern[1].data) 
			}
			
		} else {
			this.request(`v1/ActivityInfo/community?currentPage=${this.currentPage}&category=${this.tarBars[this.tapIndex].name}`).then(res=>{
				
				switch (this.contentIndex) {
					case 0:
						this.concatResources(res[1].data.activities)
						break;
					case 1:
						
						this.concatResources(res[1].data.dynamic)
						break;
					case 2:
						this.concatResources(res[1].data.knowledge)
						break;
				}
				
			})
		}
		
		
	},
	
	watch: {
		tapIndex: function(val) {
			if (val) {
				this._getResources(val);
				this.nextPage = true
			}
		},

		contentIndex: function() {
			this._getResources();
			this.nextPage = true
		}
	},
	computed: {
		...mapState(['user']),
		async currentCategory() {
			if (this.tarBars[this.tapIndex].name == '关注') {
				let type = 100;
				switch (this.contentIndex) {
					case 0:
						type = 100;
						break;
					case 1:
						type = 200;
						break;
					case 2:
						type = 400;
						break;
				}
				let concern = await this.request(`v1/ActivityInfo/userLiked?currentPage=${1}&type=${type}`);
				
				this.communityListChanged = concern[1].data;
			} else {
				let category = this.tarBars[this.tapIndex].name;
				return category;
			}
		},
		changeCommunityList() {},
		communityListChanged: {
			get: function() {
				return this.dataList;
			},
			set: function(v) {
				this.dataList = v;
			}
		}
	},
	data() {
		return {
			nextPage:true,
			dataList: [],
			currentPage:1,
			contentIndex: 0,
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
					name: '志愿服务',
					id: 'wudao'
				},
				{
					name: '舞蹈',
					id: 'wudao'
				},
				{
					name: '学生组织',
					id: 'dianjing'
				},
				{
					name: '辩论类',
					id: 'shufa'
				},
				{
					name: '英语类',
					id: 'dianying'
				},
				{
					name: '体育类',
					id: 'biancheng'
				},
				{
					name: '电竞类',
					id: 'biancheng'
				},
				{
					name: '娱乐类',
					id: 'biancheng'
				},
				{
					name: '文化交流',
					id: 'biancheng'
				}
			]
		};
	},
	onShareAppMessage(res) {
		let that = this;
		if (res.from === 'button') {
			// 来自页面内分享按钮
		}
		return {
			title: '轻松一校小程序',
			path: '/pages/index/index'
		}; 
	},
	methods: {
		async _getResources(val) {
			let category = await this.currentCategory;
			let raw_community = await this.request(`v1/ActivityInfo/community?currentPage=1&category=${category}`);
			
			switch (this.contentIndex) {
				case 0:
					this.communityListChanged = raw_community[1].data.activities;
					
					break;
				case 1:
					this.communityListChanged = raw_community[1].data.dynamic;

					break;
				case 2:
					this.communityListChanged = raw_community[1].data.knowledge;

					break;
			}
		},
		concatResources(newData){
			if(newData.length){
				this.communityListChanged = this.communityListChanged.concat(newData);
			}else{
				this.nextPage = false
			}
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
			let index = e.index;

			this.contentIndex = index;
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
			uni.navigateTo({
				url: '/activity/publishActivity/publishActivity',
				animationType: 'slide-in-left'
			});
		}
	},
	components: {
		activityItem,
		tapBar,
		uniFab
	},
	async onLoad() {
		uni.getSystemInfo({
			success: res => {
				let height = res.windowHeight - uni.upx2px(161.4);
				this.swiperHeight = height;
			}
		});
		try {
			let info = await this.request(`v1/ActivityInfo/userLiked?currentPage=${1}&type=${100}`);
			
			this.dataList = info[1].data;
		} catch (err) {
			console.log(err, '未获取到数据');
		}
	}
};
</script>

<style lang="scss" scoped>
.nextPage{
	height: 60px;
	line-height: 60px;
	text-align: center;
	.line {
	    display: inline-block;
	    width: 35%;
	    border-top: 3px solid #82B3D5;
	}
	.txt {
	    color: #555;
	    vertical-align: middle;
	}
}
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
