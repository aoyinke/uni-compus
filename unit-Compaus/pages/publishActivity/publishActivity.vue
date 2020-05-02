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
				<switch :checked="needTitle" @change="isTitle" color="#12CBC4"/>
			</view>
			<view class="publish-title" v-if="needTitle"><input type="text" v-model="title" class="uni-input" placeholder="标题（选填）" /></view>
			<view class="uni-textarea"><textarea value="" placeholder="和志同道合的人一起分享动态吧" style="height: 400upx;" /></view>

			<view class="uni-list-cell uni-list-cell-pd" v-if="(tapIndex === 2 || 3)">
				<view class="uni-list-cell-db" style="font-weight: 500;">
					<text class="eosfont">&#xe65e;</text>
					<text>选择发布的团队吧</text>
				</view>
				<switch :checked="isGroup" @change="showGroup" color="#12CBC4" />
			</view>
			<view class="groupShow-List" v-if="showGroupList">
				<view
					class="groupShow-item"
					v-for="(group, groupID) in groupList"
					:key="groupID"
					@click="chooseGroup(group.iconUrl, group.name, groupID)"
					:class="groupActive == groupID ? 'box-active' : ''"
				>
					<image :src="group.iconUrl" mode=""></image>
					<text>{{ group.name }}</text>
				</view>
			</view>
		</view>

		<view class="footer" >
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
				<image :src="img" mode="" ></image>
				<uni-badge text="x" class="cancelChoose" type="error" size="small" @click="cancelChoose(imgId)"></uni-badge>
			</view>
			
		</view>
		<view class="showVideoBar" v-if="videoSrc">
			<video :src="videoSrc" controls></video>
		</view>
		<view class="bottomBar"><uniCompusButton background="#FFC312" content="发表" width="100"></uniCompusButton></view>
	</view>
</template>

<script>
import uniCompusButton from '@/components/uni-compus-components/unicompus-button.vue';
import avatar from '@/components/uni-compus-components/uniCompus-avatar.vue';
import uniBadge from "@/components/uni-badge/uni-badge.vue"
export default {
	data() {
		return {
			isGroup:false,
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
				{ imgSrc: '../../static/index/answer.png', content: '问答' },
				{ imgSrc: '../../static/index/knowledge.png', content: '知识' }
			]
		};
	},
	methods: {
		cancelChoose(index){
			this.publishImgList.splice(index,1)
		},
		isTitle(e) {
			this.needTitle = e.detail.value;
		},
		chooseType(index) {
			this.tapIndex = index;
		},
		clickLeft() {
			uni.navigateBack({
				animationDuration: 300,
				animationType: 'pop-out'
			});
		},
		showGroup(e) {
			this.showGroupList = e.detail.value;
		},
		chooseGroup(img, name, groupID) {
			this.groupActive = groupID;
		},
		chooseImg() {
			let self = this;
			uni.chooseImage({
				count: 9, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				success: function(res) {
					console.log(res)
					self.publishImgList = res.tempFilePaths
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
		console.log(this.groupList);
	},
	components: {
		uniCompusButton,
		avatar,
		uniBadge
	}
};
</script>

<style lang="scss" scoped>
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
	
	.groupShow-List {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-evenly;
		.groupShow-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			border-bottom: 1upx solid #eeeeee;
			image {
				width: 80upx;
				height: 80upx;
				border-radius: 50%;
				margin-bottom: 10upx;
			}
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
	border: 3px solid #FFFFFF;
	.showImg {
		position: relative;
		image {
			width: 150upx;
			height: 150upx;
		}
		.cancelChoose{
			position: absolute;
			top: -5%;
			right: -5%;
		}
	}
}
</style>
