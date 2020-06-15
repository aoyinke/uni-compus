<template>
	<view>
		<uni-nav-bar left-icon="back" title="我的详情" @clickLeft="clickLeft"></uni-nav-bar>
		<view style="">
			<lv-select
				@handleSearch="handleSearch"
				@change="change"
				placeholder="输入名称搜索"
				:infoList="infoList"
				:showValue="showValue"
				v-model="searchValue"
				:loading="loading"
				type="primary"
				:uniShadow="true"
			></lv-select>
		</view>
		<view class="uni-tab-bar">

				<scroll-view scroll-y="true" class="list">
					<template v-if="type == 0">
						<view class="likeActivity">
							
							<activity :activityInfo="communityList"></activity>
							
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

					<template v-if="type == 1">
						<block v-for="(item, index) in userSavedGroup" :key="index">
							<view class="groupList">
								
								<group-item :needChat="false" :groupLogo="item.logo" :groupName="item.name" :intro="item.intro" :tag="item.tag"></group-item>
								
							</view>
						</block>
					</template>
					<template v-if="type == 2">
						<block v-for="(item, index) in userJoinedGroup" :key="index">
							<view class="groupList">
								
								<group-item :needChat="false" :groupLogo="item.logo" :groupName="item.name" :intro="item.intro" :tag="item.tag"></group-item>
								
							</view>
						</block>
					</template>
					<template v-if="type == 3">
						
						<block v-for="(concernedPerson, id) in user.concernedPersonList" :key="id">
							<view class="concernedPerson-item">
								<view class="concernedPerson-item-left"><kp-avatar :image="concernedPerson.avatar" size="large" mode="" @tap="handleOpenCommunity(row)" /></view>
								<view class="concernedPerson-item-right">
									<view class="concernedPerson-item-right-name">
										<text>{{ concernedPerson.name }}</text>
									</view>
									
									<view class="concernedPerson-item-right-intro text-line-2">
										<text>{{ concernedPerson.intro }}</text>
									</view>
								</view>
							</view>
						</block>
						
					</template>
				</scroll-view>
			
		</view>
	</view>
</template>

<script>
import groupItem from '@/components/group/group-item.vue';
import photoWall from '@/config/wallpapers.js';
import activity from '@/components/activity/activity.vue';
import KpAvatar from '@/components/kp-avatar/index.vue';
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
import { mapState } from 'vuex';
export default {
	mixins: [MescrollMixin], // 使用mixin
	data() {
		return {
			type: 0,
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
			communityInfo:[],
			userSavedGroup:[],
			userJoinedGroup:[],
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
			needList:[]
		};
	},
	computed: {
		
		communityList() {
			return this.communityInfo
		}
	},
	methods: {

		handleOpenCommunity(row) {},
		handleSearch() {
			this.loading = true;
			setTimeout(() => {
				this.loading = false;
				this.infoList = this.infoLists;
			}, 2000);
		},
		change(val) {
			console.log(val);
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

		clickLeft() {
			uni.navigateBack({
				animationDuration: 300,
				animationType: 'pop-out'
			});
		}
	},
	components: {
		groupItem,
		activity,
		KpAvatar
	},
	created() {
		
	},
	async onLoad(option) {
		let pageId = option.pageId
		console.log(pageId)
		switch(pageId){
			case 1:
				let raw_userSavedGroup = await this.request('v1/saved/UserSavedGroup')
				this.userSavedGroup = raw_userSavedGroup[1].data
				console.log(this.userSavedGroup)
				break;
			case 2:
				break;
			case 3:
				let raw_communityInfo = await this.request('v1/saved/UserSavedCommunity')
				this.communityInfo = raw_communityInfo[1].data
				break;
			case 4:
				break;
			case 5:
				break;
			case 6:
				let needList = await this.request('v1/needWall/findUserNeed')
				console.log(needList)
				break
		}
	
		
		
	}
};
</script>

<style lang="scss" scoped>
.concernedPerson-item {
	display: flex;
	align-items: center;
	margin-bottom: 20upx;
	&-left {
		width: 20%;
		padding: 20upx;
	}
	&-right {
		flex: 1;
		&-name {
			font-size: 32upx;
		}
		&-intro {
			color: gray;
		}
	}
}
</style>
