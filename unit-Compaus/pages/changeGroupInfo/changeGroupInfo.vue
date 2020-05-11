<template>
	<view>
		<uni-nav-bar left-icon="back" title="修改社团信息" @clickLeft="clickLeft"></uni-nav-bar>
		<view class="uni-list-cell uni-list-cell-pd">
			<view class="uni-list-cell-db">社团介绍</view>
		</view>
		<view class="group-description">
			<textarea v-model="groupInfo.description" placeholder="编辑社团介绍吧~" />
		</view>
		
		<view class="uni-list-cell uni-list-cell-pd">
			<view class="uni-list-cell-db">社团成就</view>
		</view>
		<view class="group-achievement">
			<textarea v-model="groupInfo.achievement" placeholder="编辑社团成就吧~" />
		</view>
		
		<view class="uni-list-cell uni-list-cell-pd">
			<view class="uni-list-cell-db">特色活动</view>
		</view>
		<view class="group-specailActivity">
			<textarea v-model="groupInfo.specailActivity" placeholder="编辑特色活动吧~" />
		</view>
		
		<view class="uni-list-cell uni-list-cell-pd" @click="addTags">
			<view class="uni-list-cell-db">添加标签</view>
			<text class="eosfont addTags">&#xe715;</text>
		</view>
		<view class="group-tags">
			<kp-tag
			  v-for="(row,index) in groupInfo.tags"
			  :key="index"
			  class="detail-labels"
			  type="primary"
			  shape="circle"
			>{{row}}</kp-tag>
		</view>
		<view class="uni-list-cell uni-list-cell-pd">
			<view class="uni-list-cell-db">上传封面图片</view>
		</view>
		
		<uni-compus-upload-img title="最多可上传9张" :imageList="groupInfo.coverImgs" @close="close" @chooseImg="chooseImg"></uni-compus-upload-img>
		
		<uni-compus-button content="确认修改" background="rgba(249, 202, 36,1.0)" width="100" @click.native="confirmChange"></uni-compus-button>
		<chunLei-modal v-model="value" type="input" :mData="inputData"  @onConfirm="onConfirmTag" navMask>
		</chunLei-modal>
	</view>
</template>

<script>
import uniCompusUploadImg from '@/components/uni-compus-components/uniCompus-uploadImg.vue'
import KpTag from "@/components/kp-tag";
export default {
	data() {
		return {
			value:false,
			groupInfo:{description:"",achievement:"",specailActivity:"",tags:[],coverImgs:[]},
			inputData:{
			  title:'登录',
			  content:[
			  {title:'标签名称',content:'',placeholder:'请输入标签'},
			  
			  ]}
		};
	},
	components:{
		uniCompusUploadImg,
		KpTag
		},
	methods:{
		confirmChange(){
			console.log(this.groupInfo)
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
	.group-tags{
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		flex-wrap: wrap;
		kp-tag{
			margin-bottom: 15upx;
		}
	}
	@mixin textareaStyle {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(223, 249, 251,1.0);
		height: 300rpx;
		textarea{
			margin: 50rpx 20rpx;
			height: 200rpx;
			border-radius: 20rpx;
			background: rgba(248, 239, 186,0.5);
			padding: 20rpx;
		}
		
	}
	
	
	.addTags{
		color: #4bcffa;
	}
	
	.group-description{
		@include  textareaStyle;
	}
	.group-achievement{
		@include  textareaStyle;
	}
	.group-specailActivity{
		@include  textareaStyle;
	}
</style>
