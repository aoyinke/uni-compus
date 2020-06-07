<template>
	<view>
		<uni-nav-bar left-icon="back" title="修改社团信息" @clickLeft="clickLeft"></uni-nav-bar>
		<view class="uni-list-cell uni-list-cell-pd" @click="changeGroupLogo">
			<view class="uni-list-cell-db">社团logo</view>
			<kp-avatar :image="groupInfo.logo" size="large" mode="aspectFill" />
		</view>
		<view class="uni-list-cell uni-list-cell-pd">
			<view class="uni-list-cell-db">社团名称</view>
			<input type="text" v-model="groupInfo.groupName" style="text-align: right;"/>
		</view>
		<view class="uni-list-cell uni-list-cell-pd">
			<view class="uni-list-cell-db">所属学校</view>
			<input type="text" v-model="groupInfo.college" style="text-align: right;"/>
		</view>
		
		<view class="uni-list-cell uni-list-cell-pd"><view class="uni-list-cell-db">社团介绍</view></view>
		<view class="group-description"><textarea v-model="groupInfo.description" placeholder="编辑社团介绍吧~" /></view>

		<view class="uni-list-cell uni-list-cell-pd"><view class="uni-list-cell-db">社团成就</view></view>
		<view class="group-achievement"><textarea v-model="groupInfo.achievements" placeholder="编辑社团成就吧~" /></view>

		<view class="uni-list-cell uni-list-cell-pd"><view class="uni-list-cell-db">特色活动</view></view>
		<view class="group-specailActivity"><textarea v-model="groupInfo.specialActivity" placeholder="编辑特色活动吧~" /></view>

		<view class="uni-list-cell uni-list-cell-pd" @click="addTags">
			<view class="uni-list-cell-db">添加标签</view>
			<text class="eosfont addTags">&#xe715;</text>
		</view>
		<view class="group-tags">
			<kp-tag v-for="(row, index) in groupInfo.tags" :key="index" class="detail-labels" type="primary" shape="circle">{{ row }}</kp-tag>
		</view>
		<view class="uni-list-cell uni-list-cell-pd"><view class="uni-list-cell-db">上传封面图片</view></view>

		<uni-compus-upload-img title="最多可上传9张" :imageList="groupInfo.coverImgs" @close="close" @chooseImg="chooseImg"></uni-compus-upload-img>

		<uni-compus-button content="确认修改" background="rgba(249, 202, 36,1.0)" width="100" @click.native="confirmChange"></uni-compus-button>
		<chunLei-modal v-model="value" type="input" :mData="inputData" @onConfirm="onConfirmTag" navMask></chunLei-modal>
		
		<chunLei-modal v-model="showErr" type="default" :mData="errData" navMask>
		</chunLei-modal>
	</view>
</template>

<script>
import uniCompusUploadImg from '@/components/uni-compus-components/uniCompus-uploadImg.vue'
import KpTag from "@/components/kp-tag";
import KpAvatar from '@/components/kp-avatar/index.vue';
import {changeGroupInfoValidator} from '@/utils/validator.js'
export default {
	async onLoad(item){
		
		let raw_groupInfo = await this.request(`v1/group/detail?groupId=${item.groupId}`)
		let groupInfo = raw_groupInfo[1].data
		groupInfo.tags = groupInfo.tags.split(',')
		this.groupInfo = groupInfo
		this.raw_logo = groupInfo.logo
		console.log(groupInfo)
	},
	data() {
		return {
			showErr:false,
			errData:{title:'提示',content:'',cancelText:'取消',confirmColor:'#3CC51F'},
			raw_logo:"",
			value:false,
			groupInfo:{},
			inputData:{
			  title:'定义标签',
			  content:[
			  {title:'标签名称',content:'',placeholder:'请输入标签'},

			  ]}
		};
	},
	components:{
		KpAvatar,
		uniCompusUploadImg,
		KpTag
	},
	methods:{
		async confirmChange(){
			let groupInfo = this.groupInfo
			let groupId = groupInfo.id
			console.log("raw_logo",this.raw_logo)
			let errMsg = changeGroupInfoValidator(groupInfo)
			
			if(!errMsg){
				let logo = groupInfo.logo
				let coverImgs = groupInfo.coverImgs
				
				
				
				groupInfo.tags  =  groupInfo.tags.toString()

				
				
				coverImgs.forEach(item=>{
					this.uploadFile('v1/uploadFiles/groupCoverImgs',item,{groupId})
				})
				
				
				this.request('v1/group/updateGroupInfo',groupInfo,'POST')
				if(logo != this.raw_logo){
					this.uploadFile('v1/uploadFiles/logo',logo,{groupId})	
					console.log("更改logo")
				}
				uni.showToast({
					duration:2000,
					title:"修改成功",
					success: () => {
						uni.reLaunch({
							url:"/pages/manage/manage"
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
		changeGroupLogo(){
			uni.chooseImage({
				count: 1,
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				success: (res) => {

					this.groupInfo.logo = res.tempFilePaths[0]
					console.log(this.groupInfo.logo)
				}
			})
			c
		},

		onConfirmTag(e){

			this.groupInfo.tags.push(e[0].content)
		},
		addTags(){
			this.value = true
		},
		clickLeft() {
			uni.navigateBack({
				animationDuration: 300,
				animationType: 'pop-out'
			})
		},
		chooseImg(){
			uni.chooseImage({
			    sourceType: ["camera", "album"],
			    sizeType: "compressed",
			    count: 8 - this.groupInfo.coverImgs.length,
			    success: (res) => {
					let obj = this.groupInfo
					obj.coverImgs = obj.coverImgs.concat(res.tempFilePaths)
					this.groupInfo = obj

			    }
			})
		},
		close(e){
			this.groupInfo.coverImgs.splice(e,1);
		},
	}
};
</script>

<style lang="scss" scoped>
.group-tags {
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	flex-wrap: wrap;
	kp-tag {
		margin-bottom: 15upx;
	}
}
@mixin textareaStyle {
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgba(223, 249, 251, 1);
	height: 300rpx;
	textarea {
		margin: 50rpx 20rpx;
		height: 200rpx;
		border-radius: 20rpx;
		background: rgba(248, 239, 186, 0.5);
		padding: 20rpx;
	}
}

.addTags {
	color: #4bcffa;
}

.group-description {
	@include textareaStyle;
}
.group-achievement {
	@include textareaStyle;
}
.group-specailActivity {
	@include textareaStyle;
}
</style>
