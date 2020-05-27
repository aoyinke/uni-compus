<template>
	<view class="container">
		<uni-nav-bar>
			<view slot="left" class="nav-bar-left" @tap="topublish"><image :src="leftIcon" mode=""></image></view>
		</uni-nav-bar>
		
		<view class="main">
			<tapBar :tap-bars="tarBars" :tap-index="tapIndex" @taptab="tabtap"></tapBar>

			<view class="uni-tab-bar">
				<swiper class="swiper-box" :style="{ height: swiperHeight + 'px' }" :current="tapIndex" @change="tabChange">
					<swiper-item v-for="(val,index) in tarBars" :key="index">
						<scroll-view scroll-y class="list" @scroll="hideFavButton" >
							<mescroll-uni ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption" >
									<activity :activityInfo="communityList" v-if="communityList[0].category == currentCategory"></activity>
							</mescroll-uni>					
							</scroll-view>
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

import activity from '@/components/activity/activity.vue';
import tapBar from '@/components/tapBar.vue';
import uniFab from '@/components/uni-fab/uni-fab.vue';
import photoWall from '@/config/wallpapers.js';

import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
import {mapState} from 'vuex'

let timer;
export default {
	mixins: [MescrollMixin], // 使用mixin
	watch:{
		tapIndex:async function(val){

			this._getResources()
		},
		activityType:async function(val){
			this._getResources()
		}
	},
	computed:{
		...mapState([
			'user'
		]),
		async communityList(){
			if(this.tapIndex == 0){
				let info = await this.request(`v1/ActivityInfo/userLiked?type=${100}&&currentPage=${1}`)
				this.communityList = info[1].data
				console.log(info)
			}
			switch(this.contentIndex){
				case 0:
					return this.activities
				case 1:
					return this.dynamic
				case 2:
					return this.knowledge
			}
		},
		async currentCategory(){
			let cateogry = this.tarBars[this.tapIndex].name
			
			return cateogry
		}
		
	},
	data() {
		return {
			activities:[],
			dynamic:[],
			knowledge:[],
			// 下拉刷新的配置
			downOption: { 
				
			},
			// 上拉加载的常用配置
			upOption: {
				
			},
			activityType:'getActivity',
					
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
			filters: [
				{
					title: '类别',
			
					choices: ['志愿服务', '学生组织','辩论类','英语类','体育类','电竞类','娱乐类','文化交流','舞蹈类']
				},
			
			],
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
					name: '舞蹈类',
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
			console.log(res.target);
		}
		return {
			title: '轻松一校小程序',
			path: '/pages/index/index'
		};
	},
	methods: {
		
		async _getResources(){
			let url = `v1/ActivityInfo/${this.activityType}?currentPage=1&&category=`
			let community = await this.request(url + this.currentCategory)
			switch(this.contentIndex){
				case 0:
					this.activities = community[1].data
				case 1:
					this.dynamic = community[1].data
				case 2:
					this.knowledge = community[1].data
			}
			console.log("community:",community)
		},
		/*下拉刷新的回调*/
		downCallback(){
			// 与 mescroll-body 的处理方式一致 > 
		},
		/*上拉加载的回调*/
		upCallback(page) {
			// 与 mescroll-body 的处理方式一致 > 
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
			switch(e.index){
				case 0:
					this.activityType = "getActivity"
					break
				case 1:
					this.activityType = "getDynamic"
					break
				case 2:
					this.activityType = "getKnowledge"
					break
			}
			console.log(this.activityType)
			this.contentIndex = index
			this.content[index].active = true;
			this.ispopMenu = false;

		},
		tabChange(e) {
			this.tapIndex = e.detail.current;
		},
		tabtap(index) {
			this.tapIndex = index;
			console.log(this.currentCategory)
		},
		topublish() {
			
			uni.navigateTo({
				url: '../publishActivity/publishActivity',
				animationType: 'slide-in-left'
			});
		}
	},
	components: {
		activity,
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
		console.log(this.user)
		let activity = await this.request('v1/ActivityInfo/getActivity?currentPage=1&&category=' + this.currentCategory)
		// let dynamic = await this.request('v1/ActivityInfo/getActivity?currentPage=1')
		// let knowledge = await this.request('v1/ActivityInfo/getActivity?currentPage=1')
		
		this.activities = activity[1].data
		
		
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
