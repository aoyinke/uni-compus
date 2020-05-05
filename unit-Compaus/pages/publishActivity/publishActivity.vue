<template>
	<view class="publishActivity">
		<uni-nav-bar left-icon="back" title="发布动态" @clickLeft="clickLeft"></uni-nav-bar>
		<view class="topBar">
			<block v-for="(item, index) in iconList" :key="index">
				<avatar :imgSrc="item.imgSrc" :name="item.content" @click.native="chooseType(index)" :class="{ active: tapIndex == index }"></avatar>
			</block>
		</view>
		<view class="main">
			<view class="uni-list-cell uni-list-cell-pd">
				<view class="uni-list-cell-db" style="font-weight: 500;">是否需要标题</view>
				<switch :checked="needTitle" @change="isTitle" color="#12CBC4" />
			</view>
			<view class="uni-list-cell uni-list-cell-pd" @click="chooseCategory">
				<view class="uni-list-cell-db" style="font-weight: 500;">选择类别吧</view>
				<text>{{ choosedCategory }}</text>
			</view>
			<view class="publish-title" v-show="needTitle"><input type="text" v-model="title" class="uni-input" placeholder="标题（选填）" /></view>
			<view class="uni-textarea"><textarea v-model="description" placeholder="和志同道合的人一起分享动态吧" style="height: 400upx;" /></view>

			<view class="uni-list-cell uni-list-cell-pd" v-if="tapIndex === 2 || 3">
				<view class="uni-list-cell-db" style="font-weight: 500;">
					<text class="eosfont">&#xe65e;</text>
					<text>选择发布的团队吧</text>
				</view>
				<switch :checked="isGroup" @change="showGroup" color="#12CBC4" />
			</view>
			<view class="choosedGroup" v-show="groupID">
				<view class="choosedGroup-item">
					<kp-avatar :image="userChoosedGroup.logo" size="large" mode="aspectFill" />
					<text>{{ userChoosedGroup.name }}</text>
				</view>
			</view>
		</view>

		<view class="footer">
			<view class="video footer-bar" @click="chooseVideo">
				<image src="../../static/publish/video.png" mode=""></image>
				<text>视频</text>
			</view>
			<view class="text footer-bar" @click="chooseText">
				<image src="../../static/index/pencil.png" mode=""></image>
				<text>纯文本</text>
			</view>
			<view class="imgs footer-bar" @click="chooseImg">
				<image src="../../static/publish/picture.png" mode=""></image>
				<text>图片</text>
			</view>
		</view>
		<view class="showImgBar" v-if="publishImgList.length">
			<view class="showImg" v-for="(img, imgId) in publishImgList" :key="imgId">
				<image :src="img" mode=""></image>
				<uni-badge text="x" class="cancelChoose" type="error" size="small" @click="cancelChoose(imgId)"></uni-badge>
			</view>
		</view>
		<view class="showVideoBar" v-if="videoSrc"><video :src="videoSrc" controls></video></view>
		<view class="bottomBar" @click="sendActivity"><uniCompusButton background="#FFC312" content="发表" width="100"></uniCompusButton></view>
		<uni-popup ref="CategoryPopup" type="bottom">
			<slot>
				<view class="CategoryPopup">
					<view class="uni-tab-bar">
						<scroll-view scroll-y="true" style="height:500px;" class="list">
							<view class="category-list">
								<view class="category-list-item" v-for="(category, idx) in categoryList" :key="idx" @click="finishChooseCategory(category)">
									<text>{{ category.category }}</text>
								</view>
							</view>
						</scroll-view>
					</view>
				</view>
			</slot>
		</uni-popup>
		<uni-popup ref="popup" type="bottom">
			<slot>
				<view class="choose-publish-group">
					<view class="uni-tab-bar">
						<view class="choose-publish-group-title"><text>待选择的社团</text></view>
						<view style="">
							<lv-select
								@handleSearch="handleSearch"
								@change="change"
								placeholder="请输入社团名称"
								:infoList="infoList"
								:showValue="showValue"
								v-model="searchValue"
								:loading="loading"
								type="primary"
								:uniShadow="true"
							></lv-select>
						</view>
						<scroll-view scroll-y="true" class="list" :style="{ height: scrollHeight + 'px' }">
							<view class="group-list">
								<view class="group-list-item" v-for="(group, idx) in group.userJoinedGroup" :key="idx">
									<view class="group-list-item-left">
										<kp-avatar :image="group.logo" size="large" mode="aspectFill" />
										<text>{{ group.name }}</text>
									</view>
									<view class="group-list-item-right" @click="chooseGroup(group.id, group)"><text class="eosfont">&#xe715;</text></view>
								</view>
							</view>
						</scroll-view>
					</view>
				</view>
			</slot>
		</uni-popup>
	</view>
</template>

<script>
import uniCompusButton from '@/components/uni-compus-components/unicompus-button.vue';
import avatar from '@/components/uni-compus-components/uniCompus-avatar.vue';
import uniBadge from '@/components/uni-badge/uni-badge.vue';
import lvSelect from '@/components/lv-select/lv-select.vue';
import KpAvatar from '@/components/kp-avatar/index.vue';
import uniPopup from '@/components/uni-popup/uni-popup.vue';

import { mapMutations, mapState } from 'vuex';
export default {
	computed: {
		...mapState(['group'])
	},
	data() {
		return {
			info: {},
			categoryList: [{category:'舞蹈',en:"dance"}, {category:'绘画',en:"draw"},
			{category:'编程',en:"programming"},{category:'文学',en:"literature"},{category:'英语',en:"English"} ],
			choosedCategory: '',
			scrollHeight: 500,
			userChoosedGroup: {},
			groupID: '',
			description: '',
			isGroup: false,
			needTitle: false,
			tapIndex: 0,
			showGroupList: false,
			groupActive: 0,
			isSubmit: true,
			ImgShow: false,
			title: '',
			groupList: [],
			videoSrc: '',
			publishImgList: [],
			iconList: [
				{ imgSrc: '../../static/index/MyActivity.png', content: '活动' },
				{ imgSrc: '../../static/index/activity.png', content: '动态' },
				// { imgSrc: '../../static/index/answer.png', content: '问答' },
				{ imgSrc: '../../static/index/knowledge.png', content: '知识' }
			],

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
			]
		};
	},
	methods: {
		...mapMutations({
			addActivity: 'ADD_ACTIVITYINFO'
		}),
		sendActivity() {
			this.info.title = this.title;
			this.info.description = this.description;
			this.info.img = this.publishImgList;
			this.info.videoSrc = this.videoSrc;
			this.info.groupID = this.groupID;
			console.log(this.info);
			this.addActivity(this.info);
			uni.showToast({
				title:"提交成功"
			})
		},
		chooseCategory() {
			this.$refs.CategoryPopup.open();
		},
		finishChooseCategory(item) {
			this.choosedCategory = item.category;
			this.info.category = item.en
			this.$refs.CategoryPopup.close();
		},
		chooseGroup(id, group) {
			this.userChoosedGroup = group;
			this.groupID = id;
			this.$refs.popup.close();
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
		cancelChoose(index) {
			this.publishImgList.splice(index, 1);
		},
		isTitle(e) {
			this.needTitle = e.detail.value;
		},
		chooseType(index) {
			if (index == 0) {
				this.info.type = 100;
			} else if (index == 1) {
				this.info.type = 200;
			} else if (index == 2) {
				this.info.type = 400;
			}

			this.tapIndex = index;
		},
		clickLeft() {
			uni.navigateBack({
				animationDuration: 300,
				animationType: 'pop-out'
			});
		},
		showGroup(e) {
			let needGroup = e.target.value;
			if (needGroup) {
				this.$refs.popup.open();
			} else {
				this.groupID = '';
				this.userChoosedGroup = {};
			}
		},
		chooseImg() {
			let self = this;
			uni.chooseImage({
				count: 9, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				success: function(res) {
					console.log(res);
					self.publishImgList = res.tempFilePaths;
					console.log(self.publishImgList);
				}
			});
		},
		chooseVideo() {
			let self = this;
			uni.chooseVideo({
				count: 1,
				sourceType: ['camera', 'album'],
				success: function(res) {
					self.videoSrc = res.tempFilePath;
					console.log(self.videoSrc);
				}
			});
		}
	},
	async created() {
		let groupList = await this.request('groups/');
		this.groupList = groupList[1].data.data.records;
		console.log(this.group);
	},
	components: {
		uniCompusButton,
		avatar,
		uniBadge,
		KpAvatar,
		uniPopup,
		lvSelect
	}
};
</script>

<style lang="scss" scoped>
@import './index.scss';
.active {
	border-bottom: 1px solid #ffc312;
	padding-top: 10upx;
	transform: scale(1.1);
	transition: 0.5s;
}
.topBar {
	display: flex;
	justify-content: space-evenly;
	align-items: center;
}
.nav-right {
	button {
		background-color: yellow;
	}
}

.footer {
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	margin-top: 40upx;

	.footer-bar {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		image {
			width: 60upx;
			height: 60upx;
		}
	}
}
.publish-title {
	border-bottom: 1px solid #eee;
	padding-bottom: 10upx;
}
.main {
	.choosedGroup {
		&-item {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
		}
	}
}

.bottomBar {
	width: 100%;
}

.showImgBar {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	align-content: center;
	border: 3px solid #ffffff;
	.showImg {
		position: relative;
		image {
			width: 150upx;
			height: 150upx;
		}
		.cancelChoose {
			position: absolute;
			top: -5%;
			right: -5%;
		}
	}
}
</style>
