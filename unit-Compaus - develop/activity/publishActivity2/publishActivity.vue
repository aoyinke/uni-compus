<template>
	<view class="publishActivity">
		<uni-nav-bar left-icon="back" title="发布动态" @clickLeft="clickLeft"></uni-nav-bar>
		<jyf-parser :html="html" ref="article"></jyf-parser>
	</view>
</template>
 
<script>
import jyfParser from "@/components/jyf-parser/jyf-parser";
import uniCompusButton from '@/components/uni-compus-components/unicompus-button.vue';
import avatar from '@/components/uni-compus-components/uniCompus-avatar.vue';
import uniBadge from '@/components/uni-badge/uni-badge.vue';
import lvSelect from '@/components/lv-select/lv-select.vue';
import KpAvatar from '@/components/kp-avatar/index.vue';
import uniPopup from '@/components/uni-popup/uni-popup.vue';
import { pathToBase64, base64ToPath } from '@/js_sdk/gsq-image-tools/image-tools/index.js'
import { mapMutations, mapState } from 'vuex';
import {activityInoValidator} from '@/utils/validator.js'
export default {
	async onLoad(){
		this.request('v1/group/findUserGroup').then(res=>{
			let userGroupInfo = res[1].data
			console.log(userGroupInfo)
			this.userJoinedGroup = userGroupInfo
		})
		// 方式 1
		this.html = '<div>Hello World!</div>';
	},
	computed: {
		
	},
	data() {
		return {
			html: '',
			showErr:false,
			errData:{title:'提示',content:'',cancelText:'取消',confirmColor:'#3CC51F'},
			userJoinedGroup:[],
			info: {type:100,title:"",description:"",category:"",groupId:"",content:"",deadline:"",videoSrc:""},
			categoryList: [

				{
					category: '志愿服务',
					id: 'wudao'
				},
				{
					category: '舞蹈',
					id: 'wudao'
				},
				{
					category: '学生组织',
					id: 'dianjing'
				},
				{
					category: '辩论类',
					id: 'shufa'
				},
				{
					category: '英语类',
					id: 'dianying'
				},
				{
					category: '体育类',
					id: 'biancheng'
				},
				{
					category: '电竞类',
					id: 'biancheng'
				},
				{
					category: '娱乐类',
					id: 'biancheng'
				},
				{
					category: '文化交流',
					id: 'biancheng'
				}
			],
			
			scrollHeight: 500,
			userChoosedGroup: {},
			groupId: '',
			description: '',
			isGroup: false,
			needTitle: false,
			tapIndex: 0,
			showGroupList: false,
			groupActive: 0,
			isSubmit: true,
			ImgShow: false,
			
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
		
		chooseDeadLine(){
			this.$refs.shortTerm.show()
		},
		onConfirmDeadLine(event){

			this.info.deadline = event.result
		},
		
		async sendActivity() {

			this.info.groupId = this.groupId
			console.log(this.info)
			let errMsg = activityInoValidator(this.info,this.publishImgList)
			
			if(!errMsg){
				uni.showModal({
					title:"确认提交",
					content:"请确认信息无误，审核后即将发表",
					success:async result=>{
						let videoSrc = ""
						if(this.info.videoSrc){
							
							let res = await this.uploadFile('v1/uploadFiles/video',this.info.videoSrc)	
							
							videoSrc = JSON.parse(res[1].data).videoPath
							this.info.videoSrc = videoSrc
						}
						let activityInfo = await this.request('v1/ActivityInfo/upLoadActivity',this.info,'POST')
						activityInfo = activityInfo[1].data
						console.log("activityInfo",activityInfo)
						this.publishImgList.forEach(item=>{
							this.uploadFile('v1/uploadFiles/files',item,{activity_id:activityInfo.activity_id,type:activityInfo.type})
						})
						
						uni.showToast({
							title:"提交成功",
							duration:2500,
							success: () => {
								uni.reLaunch({
									url:"/pages/index/index"
								})
							}
						})
					}
				})
				
			}else{
				let obj = this.errData
				obj.content = errMsg
				this.errData = obj
				this.showErr = true
			}
			
		},
		chooseCategory() {
			this.$refs.CategoryPopup.open();
		},
		finishChooseCategory(item) {
			this.info.category = item.category
			this.$refs.CategoryPopup.close();
		},
		chooseGroup(id, group) {
			this.userChoosedGroup = group;
			this.groupId = id;
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
				this.groupId = '';
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
					self.info.videoSrc = res.tempFilePath;
					
					console.log(self.info.videoSrc)
					
				}
			});
		}
	},

	components: {
		uniCompusButton,
		avatar,
		uniBadge,
		KpAvatar,
		uniPopup,
		lvSelect,
		jyfParser
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
