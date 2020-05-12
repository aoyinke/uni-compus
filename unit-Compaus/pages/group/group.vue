<template>
	<view>
		<uni-nav-bar>
			<view class="selectSchool" slot="left">
				<ms-dropdown-menu><ms-dropdown-item v-model="school" :list="list"></ms-dropdown-item></ms-dropdown-menu>
			</view>
		</uni-nav-bar>
		<view style="">
			<lv-select
				@handleSearch="handleSearch"
				@change="change"
				placeholder="输入小组名称或ID号"
				:infoList="infoList"
				:showValue="showValue"
				v-model="searchValue"
				:loading="loading"
				type="primary"
				:uniShadow="true"
			></lv-select>
		</view>

		<view class="groupInfo">
			<view class="groupInfo-prepare" @click="checkAlreadySave">
				<text class="first">{{ user.groupInfo.prepare }}</text>
				<text class="second">已经收藏的小组</text>
			</view>

			<view class="groupInfo-already" @click="checkAlreadyJoin">
				<text class="first">{{ user.groupInfo.already }}</text>
				<text class="second">已经加入的小组</text>
			</view>
			<view class="groupInfo-recommend" @click="openFilter">
				<text class="eosfont">&#xe69e;</text>
				<text class="second">爱好偏向</text>
			</view>
		</view>
		<view class="group-detail-tab">
			<view class="group-detail-ownGroup tab" :class="tapIndex == 0 ? 'active' : ''" @tap="tap(0)"><text>校内热门小组</text></view>
			<view class="group-detail-country tab" :class="tapIndex == 1 ? 'active' : ''" @tap="tap(1)"><text>全国热门小组</text></view>
			<view class="group-detail-sponsor tab" :class="tapIndex == 2 ? 'active' : ''" @tap="tap(2)"><text>热门赞助活动</text></view>
		</view>
		<swiper class="swiper-box" :current="tapIndex" :style="{ height: swiperHeight + 'px' }" @change="tabChange">
			<swiper-item v-for="(items, index) in groupDetail" :key="index">
				<scroll-view scroll-y class="list" :style="{ height: swiperHeight + 'px' }">
					<block v-for="(item, indx) in items.content" :key="indx">
						<mescroll-uni ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
							<group-item
								:needChat="false"
								:groupLogo="item.groupLogo"
								:groupName="item.groupName"
								:intro="item.intro"
								:tag="item.tag"
								@click.native="gotoDetail"
							></group-item>
						</mescroll-uni>
					</block>
				</scroll-view>
			</swiper-item>
		</swiper>

		<uni-drawer ref="uniDrawer" mode="right" width="320">
			<view style="padding:30rpx;" class="filter-container">
				<view class="filter-content" v-for="(filter, index) in filters" :key="index"><filterBar :title="filter.title" :choices="filter.choices"></filterBar></view>
				<view class="filter-container-bottom">
					<uniCompusButton content="重置" background="#eb4d4b" width="48"></uniCompusButton>
					<uniCompusButton content="确认" background="#f0932b" width="48" @click.native="closeDrawer"></uniCompusButton>
				</view>
			</view>
		</uni-drawer>
	</view>
</template>

<script>
import lvSelect from '@/components/lv-select/lv-select.vue';
import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue';
import groupItem from '@/components/group/group-item.vue';
import uniDrawer from '@/components/uni-drawer/uni-drawer.vue';
import filterBar from '@/components/uni-compus-components/uniCompus-filter.vue';
import uniCompusButton from '@/components/uni-compus-components/unicompus-button.vue';
import goDetail from '@/components/uni-compus-components/uniCompus-goDetail.vue';
import msDropdownMenu from '@/components/ms-dropdown/dropdown-menu.vue';
import msDropdownItem from '@/components/ms-dropdown/dropdown-item.vue';

import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
export default {
	mixins: [MescrollMixin], // 使用mixin
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

			// 下拉刷新的配置
			downOption: {

			},
			// 上拉加载的常用配置
			upOption: {

			},

			list: [
				{
					text: "上海海事大学",
					value: 0
				},
				{
					text: "上海交通大学",
					value: 1
				},
				{
					text: "复旦大学",
					value: 2
				}
			],
			school: "上海海事大学",

			filters: [
				{
					title: '兴趣爱好',

					choices: ['舞蹈', '电竞', '书法', '书法']
				},
				{
					title: '兴趣爱好',

					choices: ['舞蹈', '电竞', '书法', '书法']
				},
				{
					title: '兴趣爱好',

					choices: ['舞蹈', '电竞', '书法', '书法']
				}
			],
			swiperHeight: 0,
			tapIndex: 0,
			user: {
				groupInfo: {
					prepare: 0,
					already: 0
				}
			},
			groupDetail: [
				{
					content: [
						{
							groupName: '轻松一校项目组',
							groupLogo: '../../static/test/waterfull/1.jpg',
							intro: '轻松一校项目组是地球上最强大的组织之一，它负责...',
							tag: ['强大', '优秀']
						}
					]
				}
			]
		};
	},
	components: {
		uniSearchBar,
		groupItem,
		uniDrawer,
		filterBar,
		uniCompusButton,
		lvSelect,
		goDetail,
		msDropdownMenu,
		msDropdownItem
	},
	methods: {
		/*下拉刷新的回调*/
		downCallback(){
			// 与 mescroll-body 的处理方式一致 >
		},
		/*上拉加载的回调*/
		upCallback(page) {
			// 与 mescroll-body 的处理方式一致 >
		},

		gotoDetail(){
			uni.navigateTo({
				url:"/pages/groupDetail/groupDetail"
			})
		},
		checkAlreadyJoin() {
			let item = { type: 2 };
			uni.navigateTo({
				url: `/pages/mySave/mySave?item=${encodeURIComponent(JSON.stringify(item))}`
			});
		},
		checkAlreadySave() {
			let item = { type: 1 };
			uni.navigateTo({
				url: `/pages/mySave/mySave?item=${encodeURIComponent(JSON.stringify(item))}`
			});
		},
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
		tap(index) {
			this.tapIndex = index;
		},
		tabChange(e) {
			this.tapIndex = e.detail.current;
		},
		openFilter() {
			this.$refs.uniDrawer.open();
		},
		closeDrawer() {
			this.$refs.uniDrawer.close();
		}
	},
	async onLoad() {
		let swiperHeight = uni.getSystemInfo({
			success: res => {
				let height = res.windowHeight - uni.upx2px(230);
				this.swiperHeight = height;
			}
		});
		let res = await this.request('groups/');
		console.log(res[1].data.data.records);
	}
};
</script>

<style lang="scss" scoped>
page {
	background-color: darkgray;
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

.groupInfo {
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	margin: 20upx 0;

	.groupInfo-prepare,
	.groupInfo-already,
	.groupInfo-recommend {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		border-right: 2upx solid #eeeeee;

		width: 33%;

		.first {
			font-weight: 700;
			font-size: 30upx;
		}

		.second {
			font-size: 20upx;
			color: darkgray;
		}
	}

	.groupInfo-recommend {
		border: none !important;
		margin-left: none !important;

		image {
			width: 50upx;
			height: 50upx;
		}
	}
}

.group-detail-tab {
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	flex-direction: row;
	height: 100upx;
	box-shadow: 3upx 3upx 5upx 5upx #eeeeee;

	.tab {
		font-size: 26upx;
		font-weight: 400;
	}
}

.content {
	display: flex;
	justify-content: space-around;
	margin: 30upx 10upx;
	width: 100%;
	flex-wrap: wrap;

	.group-logo {
		height: 100%;
		background-color: #fff;

		image {
			width: 80upx;
			height: 80upx;
			border-radius: 50%;
		}
	}

	.group-info {
		width: 60%;

		.group-username {
			font-weight: bold;
			font-size: 30upx;
		}

		.group-intro {
			.group-intro-tag {
				display: flex;
				flex-direction: row;
			}

			text {
				color: darkgray;
			}
		}

		.group-info-bottom {
			height: 50upx;
			border-bottom: 3upx solid #eeeeee;
		}
	}
}

.active {
	text {
		border-bottom: 5upx solid #5f9ea0;
		color: #4682b4;
		font-weight: bold;
	}
}
</style>
