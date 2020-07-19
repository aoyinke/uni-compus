<template>
	<view>
		<uni-nav-bar left-icon="back" title="我的详情" @clickLeft="clickLeft"></uni-nav-bar>
		<!-- <view style="">
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
		</view> -->
		<view class="uni-tab-bar">
			<scroll-view scroll-y="true" class="list">
				<template v-if="type == 5">
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
					<block v-for="(group, index) in userSavedGroup" :key="index">
						
					<view class="groupList">
						<group-item
							:needChat="false"
							:groupLogo="group.logo"
							:groupName="group.groupName"
							:intro="group.description"
							:tag="group.tags"
							@click.native="gotoDetail(group.id)"
						></group-item>
					</view>
					</block>
				</template>
				<template v-if="type == 2">
					<block v-for="(group, index) in userJoinedGroup" :key="index">
						<view class="groupList"><group-item
							:needChat="false"
							:groupLogo="group.logo"
							:groupName="group.groupName"
							:intro="group.description"
							:tag="group.tags"
							@click.native="gotoDetail(group.id)"
						></group-item></view>
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
				<template v-if="6">
					<view class="need-List">
						<view class="need-item" v-for="(needInfo, id) in needList" :key="id">
							<user-top-bar :groupInfo="needInfo.userInfo"  @deleteInfo="deleteInfo(needInfo,id)"></user-top-bar>
							<view class="need-item-main">
								<view class="need-item-main-left">
									<view class="need-item-main-left-title">
										<text class="eosfont title">&#xe640;</text>
										<text>{{ needInfo.title }}</text>
									</view>
									<view class="need-item-main-left-content">
										<text class="text-line-4">{{ needInfo.content }}</text>
									</view>
								</view>
								<view class="need-item-main-right">
									<good-icon :needInfo="needInfo" @addGood="addGood(id)" @cancelGood="cancelGood(id)"></good-icon>
									<text>{{ needInfo.fav_nums }}</text>
								</view>
							</view>
						</view>
					</view>
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

import userTopBar from '@/components/activity/userTopBar.vue';
import { mapState } from 'vuex';
export default {
	
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
			communityInfo: [],
			userSavedGroup: [],
			userJoinedGroup: [],
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
			needList: []
		};
	},
	computed: {
		communityList() {
			return this.communityInfo;
		}
	},
	methods: {
		gotoDetail(groupId){
			uni.navigateTo({
				url:"/pages/groupDetail/groupDetail?groupId=" + groupId
			})
		},
		deleteInfo(needInfo,index){
			let {id} = needInfo
			uni.showModal({
				title:"删除需求",
				content:"确认删除需求",
				success: (res) => {
					if(res.confirm){
						this.request('v1/needWall/deleteNeed',{needId:id},'POST')
						this.needList.splice(index,1)
					}
				}
			})
			console.log("deleteInfo")
		},
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
		KpAvatar,
		userTopBar
	},
	created() {},
	async onLoad(option) {
		let pageId = option.pageId;
		console.log(pageId);
		pageId = parseInt(pageId);
		this.type = pageId;
		switch (pageId) {
			case 1:
				let raw_userSavedGroup = await this.request('v1/group/getUserSavedGroup');
				this.userSavedGroup = raw_userSavedGroup[1].data;
				console.log(this.userSavedGroup);
				break;
			case 2:
				let userJoinedGroup = await this.request('v1/group/findUserGroup')
				console.log("userJoinedGroup",userJoinedGroup);
				this.userJoinedGroup = userJoinedGroup[1].data
				break;
			case 5:
				let raw_communityInfo = await this.request('v1/saved/UserSavedCommunity');
				this.communityInfo = raw_communityInfo[1].data;
				console.log(this.userSavedGroup);
				break;
			case 4:
				break;
			case 3:
				break;
			case 6:
				let needList = await this.request('v1/needWall/findUserNeed');
				console.log(needList)
				this.needList = needList[1].data
				break;
		}
	}
};
</script>

<style lang="scss" scoped>
@mixin elementCenter {
	display: flex;
	justify-content: center;
	align-items: center;
}
.need-List {
	.need-item {
		border-bottom: 2rpx solid #eeeeee;
		padding-bottom: 5rpx;
		&-main {
			display: flex;
			align-items: center;
			min-height: 300rpx;
			&-left {
				height: 250rpx;
				flex: 1;
				background-color: rgba(204, 174, 98, 1);
				&-title {
					@include elementCenter;
					text {
						font-weight: 600;
						font-size: 1.2em;
					}
				}
				&-content {
					@include elementCenter;
				}
			}
			&-right {
				height: 250rpx;
				width: 15%;
				@include elementCenter;
				flex-direction: column;
			}
		}
	}
}
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
