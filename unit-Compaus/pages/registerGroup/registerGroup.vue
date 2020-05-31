<template>
	<view>
		<uni-nav-bar left-icon="back" title="社团注册" @clickLeft="clickLeft"></uni-nav-bar>
		<view class="main">
			<view class="uni-list-cell uni-list-cell-pd changeTaskName">
				<view class="uni-list-cell-db" style="font-weight: 500;">所属的学校</view>
				<input type="text" v-model="groupInfo.college" />
			</view>
			<view class="uni-list-cell uni-list-cell-pd changeTaskName">
				<view class="uni-list-cell-db" style="font-weight: 500;">社团的名称</view>
				<input type="text" v-model="groupInfo.groupName" />
			</view>
			<view class="uni-list-cell uni-list-cell-pd changeTaskName" @click="openCategoryPicker">
				<view class="uni-list-cell-db" style="font-weight: 500;">所属的类别</view>
				<text class="category">{{groupInfo.category}}</text>
			</view>
			

			<view class="uni-list-cell uni-list-cell-pd changeTaskName" @click="chooseLogo">
				<view class="uni-list-cell-db" style="font-weight: 500;">社团logo</view>
				<image :src="groupInfo.logo" mode="" class="logo"></image>
			</view>
			<view class="uni-list-cell uni-list-cell-pd changeTaskName"><view class="uni-list-cell-db" style="font-weight: 500;">简介</view></view>
			<view class="group-description"><textarea v-model="groupInfo.description" placeholder="编辑社团简介吧~" /></view>
			
			<uni-compus-button content="确认注册" width="100" @click.native="confirmRegister" background="#f1c40f"></uni-compus-button>
		</view>
		
		 <w-picker
		        mode="selector"
				value="创新实践类"
		 
		        :options="category"
		        @confirm="onConfirmCategory($event,'selector')"
		        :default-props="defaultProps"
		        ref="selector" 
		    ></w-picker>
		<chunLei-modal v-model="showErr" type="default" :mData="errData" navMask>
		</chunLei-modal>
	</view>
</template>

<script>	
import wPicker from "@/components/w-picker/w-picker.vue"
import {fileHost} from '@/utils/config.js'
import {groupRegisterValidator} from '@/utils/validator.js'
export default {
	data() {
		return {
			showErr:"",
			errData:{title:'提示',content:'这是一个模态弹窗',cancelText:'取消',confirmColor:'#3CC51F'},
			groupInfo: { groupName: '', logo: '', description: '', college: '',category:"" },
			defaultProps:{label:"category"},
			index:0,
			category:[{category:'创新实践类'},
			{category:'志愿服务类'},
			{category:'学生组织类'},
			{category:'辩论类'},
			{category:'英语类'},
			{category:'体育类'},
			{category:'电竞类'},
			{category:'文娱类'},
			{category:'文化交流类'},
			{category:'舞蹈类'}]
		};
	},
	components: {
		wPicker
	},
	methods: {
		async confirmRegister(){
			
			
			let errMsg = groupRegisterValidator(this.groupInfo)
			if(!errMsg){
				let logo = this.groupInfo.logo
				
				let group = await this.request('v1/group/register',this.groupInfo,'POST')
				
				this.uploadFile('v1/uploadFiles/logo',logo,{groupId:group[1].data.id})
				uni.showToast({
					title:"成功注册社团~",
					success: () => {
						uni.switchTab({
							url:"/pages/manage/manage"
						})
					}
				})
			}else{
				this.errData.content = errMsg
				this.showErr = true
			}
			
		},
		openCategoryPicker(){
			this.$refs.selector.show()
		},
		onConfirmCategory(e) {
			
			
			let obj = this.groupInfo;
			obj.category = e.result;
			this.groupInfo = obj;
			console.log(this.groupInfo)
		},
		clickLeft() {
			uni.navigateBack({
				animationDuration: 300,
				animationType: 'pop-out'
			});
		},
		chooseLogo() {
			uni.chooseImage({
				count: 1, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], //从相册选择
				success: (res)=> {
					
					let logo = res.tempFilePaths;
					let obj = this.groupInfo;
					obj.logo = logo[0];
					this.groupInfo = obj;
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
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
input {
	text-align: right;
}
.logo {
	width: 100rpx;
	height: 100rpx;
	border-radius: 50%;
	background-color: #95a5a6;
}
.group-description {
	@include textareaStyle;
}
</style>
