<template>
	<view>
		<uni-nav-bar left-icon="back" title="我的详情" @clickLeft="clickLeft"></uni-nav-bar>
		<view class="uni-tab-bar">
			<scroll-view scroll-y="true" class="list">
				<view class="likeList" v-if="(type === 0)" v-for="(item, index) in activities" :key="index">
					<activity  :activityInfo="item"></activity>
				</view>
				<view class="groupList" v-for="(item, index) in saveGroups" :key="index" v-if="type === 1">
					<group-item 
					:needChat="false" :groupLogo="item.groupLogo" :groupName="item.groupName" :intro="item.intro" :tag="item.tag"></group-item>
				</view>
				<view class="groupList" v-for="(item, index) in alreadyJoins" :key="index" v-if="type === 1">
					<group-item 
					:needChat="false" :groupLogo="item.groupLogo" :groupName="item.groupName" :intro="item.intro" :tag="item.tag"></group-item>
				</view>
				
				
			</scroll-view>
		</view>
	</view>
</template>

<script>
import groupItem from '@/components/group/group-item.vue';
import photoWall from '@/config/wallpapers.js';
import activity from '@/components/activity/activity.vue';
export default {
	data() {
		return {
			type: 0,
			saveGroups: [
				{
					groupName: '轻松一校项目组',
					groupLogo: 'https://images.mepai.me/app/works/38224/2018-10-06/w_5bb80b86d3506/05bb80b86d38ab.jpg!1200w.jpg',
					intro: '轻松一校项目组是地球上最强大的组织之一，它负责...',
					tag: ['强大', '优秀']
				}
			],
			alreadyJoins:[
				{
					groupName: '轻松一校项目组',
					groupLogo: 'https://images.mepai.me/app/works/38224/2018-10-06/w_5bb80b86d3506/05bb80b86d38ab.jpg!1200w.jpg',
					intro: '轻松一校项目组是地球上最强大的组织之一，它负责...',
					tag: ['强大', '优秀']
				}
			],
			activities: [
				{
					groupLogo: '../../static/test/waterfull/1.jpg',
					groupName: '比赛大佬组',
					activityStartTime: '17小时前',
					activityPropagate: {
						type: 'img',
						src: ['../../static/test/waterfull/1.jpg', '../../static/test/waterfull/2.jpg', '../../static/test/waterfull/3.jpg']
					},
					hotNum: 80,
					commentNum: 6,
					commentDetail: [
						{
							commentor: '天堂屠夫',
							commentContent: 'nb.....'
						},
						{
							commentor: '天堂屠夫',
							commentContent: 'tnb.....'
						},
						{
							commentor: '天堂屠夫',
							commentContent: 'cznb.....'
						}
					]
				}
			]
		};
	},

	methods: {
		clickLeft() {
			uni.navigateBack({
				animationDuration: 300,
				animationType: 'pop-out'
			});
		}
	},
	components: {
		groupItem,
		activity
	},
	created() {
		for (let i = 0; i < 10; i++) {
			this.saveGroups.push(this.saveGroups[0]);
		}
		this.saveGroups.forEach((item, index) => {
			return (item.groupLogo = photoWall[10 + index]);
		});
		
		for (let i = 0; i < 10; i++) {
			this.alreadyJoins.push(this.alreadyJoins[0]);
		}
		this.alreadyJoins.forEach((item, index) => {
			return (item.groupLogo = photoWall[20 + index]);
		});
	},
	onLoad(option) {
		
		const item = JSON.parse(decodeURIComponent(option.item));
		this.type = item.type;
		console.log(this.type)
	}
};
</script>

<style lang="scss" scoped></style>
