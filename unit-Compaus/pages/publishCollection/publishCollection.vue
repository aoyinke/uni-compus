<template>
	<view class="publishActivity">
		<uni-nav-bar left-icon="back" title="发布合集" @clickLeft="clickLeft"></uni-nav-bar>
		<view class="topBar">
			<block v-for="(item, index) in iconList" :key="index">
				<avatar :imgSrc="item.imgSrc" :name="item.content" @click.native="chooseType(index)" :class="{ active: tapIndex == index }"></avatar>
			</block>
		</view>
		<view class="main">
			
			<view class="uni-list-cell uni-list-cell-pd">
				<view class="uni-list-cell-db" style="font-weight: 500;">标题</view>
				<input type="text" v-model="title" class="uni-input" style="text-align: right;" placeholder="输入标题" />
			</view>
			
			<view class="uni-list-cell uni-list-cell-pd" @click="chooseCategory">
				<view class="uni-list-cell-db" style="font-weight: 500;">选择类别吧</view>
				<text>{{ choosedCategory }}</text>
			</view>
			<view class="uni-list-cell uni-list-cell-pd" @click="chooseCategory">
				<view class="uni-list-cell-db" style="font-weight: 500;">合集描述</view>
			</view>
			<view class="uni-textarea">
				<textarea v-model="description" placeholder="合集描述" style="height: 400upx;" />
			</view>
			<view class="uni-list-cell uni-list-cell-pd" @click="chooseCategory">
				<view class="uni-list-cell-db" style="font-weight: 500;">正文内容</view>
			</view>
			<view class="uni-textarea">
				<textarea v-model="description" placeholder="内容" style="height: 400upx;" />
			</view>

			
		</view>

		<view class="footer">
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
		
	</view>
</template>

<script>
import uniCompusButton from '@/components/uni-compus-components/unicompus-button.vue';
import avatar from '@/components/uni-compus-components/uniCompus-avatar.vue';
import uniBadge from '@/components/uni-badge/uni-badge.vue';

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
			publishImgList: [],
			iconList: [
				{ imgSrc: '../../static/index/MyActivity.png', content: '活动' },
				{ imgSrc: '../../static/index/activity.png', content: '动态' },
				// { imgSrc: '../../static/index/answer.png', content: '问答' },
				{ imgSrc: '../../static/index/knowledge.png', content: '知识' }
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
