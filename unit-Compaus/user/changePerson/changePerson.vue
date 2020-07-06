<template>
	<view class="container">
		<uni-nav-bar left-icon="back" left-text="返回" title="修改个人信息" @clickLeft="clickLeft"></uni-nav-bar>
		<view class="changePerson">
			<view class="changePerson_avatar" @click="changePerson_avatar">
				<view class="change_choice">
					<text>头像</text>
				</view>
				<view class="changePerson_right">
					<image :src="userInfo.avatar" mode=""></image>
					<text class="eosfont">&#xe611;</text>
				</view>
			</view>

			<view class="changePerson_name">
				<view class="change_choice">
					<text>昵称</text>
				</view>
				<view class="changePerson_right">
					<input type="text" v-model="userInfo.nickName" />
					<text class="eosfont">&#xe611;</text>
				</view>
			</view>
			
			<view class="changePerson_name">
				<view class="change_choice">
					<text>所属学校</text>
				</view>
				<view class="changePerson_right">
					<input type="text" v-model="userInfo.college" />
					<text class="eosfont">&#xe611;</text>
				</view>
			</view>

			<view class="changePerson_sex" @click="changePerson_sex">
				<view class="change_choice">
					<text>性别</text>
				</view>
				<view class="changePerson_right">
					<text>{{userInfo.sex}}</text>
					<text class="eosfont">&#xe611;</text>
				</view>
			</view>

			<view class="changePerson_birthday" @click="changePerson_birthday">
				<view class="change_choice">
					<text>生日</text>
				</view>
				<view class="changePerson_right">
					<text>{{userInfo.birthday}}</text>
					<text class="eosfont">&#xe611;</text>
				</view>
			</view>

			<view class="changePerson_loveState" @click="changePerson_loveState">
				<view class="change_choice">
					<text>情感</text>
				</view>
				<view class="changePerson_right">
					<text>{{userInfo.love}}</text>
					<text class="eosfont">&#xe611;</text>
				</view>
			</view>

			<view class="changePerson_job" @click="changePerson_job">
				<view class="change_choice">
					<text>职业</text>
				</view>
				<view class="changePerson_right">
					<text>{{userInfo.job}}</text>
					<text class="eosfont">&#xe611;</text>
				</view>
			</view>

			<view class="changePerson_hometown" @click="changePerson_hometown">
				<view class="change_choice">
					<text>家乡</text>
				</view>
				<view class="changePerson_right">
					<text>{{userInfo.homeTown}}</text>
					<text class="eosfont">&#xe611;</text>
				</view>
			</view>
		</view>
		<view class="uni-list-cell uni-list-cell-pd">
			<view class="uni-list-cell-db">个人介绍</view>
		</view>
		<view class="group-description">
			<textarea v-model="userInfo.description" placeholder="编辑个人介绍吧~" />
		</view>
		
		<view class="uni-list-cell uni-list-cell-pd">
			<view class="uni-list-cell-db">拥有的成就</view>
		</view>
		<view class="group-achievement">
			<textarea v-model="userInfo.achievement" placeholder="编辑拥有的成就成就吧,想说啥就说啥~" />
		</view>
		
		<view class="uni-list-cell uni-list-cell-pd">
			<view class="uni-list-cell-db">参加过的活动</view>
		</view>
		<view class="group-specailActivity">
			<textarea v-model="userInfo.joinedActivity" placeholder="编辑参加过的活动活动吧~" />
		</view>
		
		<view class="uni-list-cell uni-list-cell-pd" @click="addTags">
			<view class="uni-list-cell-db">添加标签</view>
			<text class="eosfont addTags">&#xe715;</text>
		</view>
		<view class="group-tags">
			<view v-for="(row,index) in userInfo.tags" :key="index" class="tag-wrap">
				<kp-tag
				  class="detail-labels"
				  type="primary"
				  shape="circle"
				>{{row}}</kp-tag>
				<view class="close-view" @click="closeTag(index)">x</view>
			</view>
			
		</view>
		<view class="uni-list-cell uni-list-cell-pd">
			<view class="uni-list-cell-db">上传封面图片</view>
		</view>
		
		<uni-compus-upload-img title="最多可上传9张" :imageList="userInfo.coverImgs" @close="close" @chooseImg="chooseImg"></uni-compus-upload-img>
		<uniCompusButton content="保存" width="100" background="#4834d4" @click.native="submit"></uniCompusButton>
		
		
		<chunLei-modal v-model="value" type="input" :mData="inputData"  @onConfirm="onConfirmTag" navMask>
		</chunLei-modal>
		<chunLei-modal v-model="showErr" type="default" :mData="errData" navMask>
		</chunLei-modal>
		<chunLei-modal v-model="chunLeiModal.value" :type="chunLeiModal.type" :mData="chunLeiModal.mData" navMask @onConfirm="onConfirm">
		</chunLei-modal>
		<w-picker
		        mode="region"
		        
		        default-type="value"
		        :hide-area="false"
		        @confirm="onConfirmHome($event,'region')"
		        @cancel="onCancel"
		        ref="region" 
		    ></w-picker>
		
		    <w-picker
		        mode="date" 
		        startYear="2017" 
		        endYear="2029"
		        value="2020-04-07"
		        :current="true"
		        fields="day"
		        @confirm="onConfirmBirthday($event,'date')"
		        
		        :disabled-after="false"
		        ref="date" 
		    ></w-picker>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-icons/uni-icons.vue'
	import wPicker from "@/components/w-picker/w-picker.vue"
	import uniCompusUploadImg from '@/components/uni-compus-components/uniCompus-uploadImg.vue'
	import KpTag from "@/components/kp-tag";
	import { mapState} from 'vuex';
	import {changeUserInfoValidator} from '@/utils/validator.js'
	import {arryDifferences} from '@/utils/util.js'
	export default {
		computed:{
			...mapState(['user'])
		},
		async onLoad() {
			let user = await this.request('v1/user/getUserInfo')
			user = user[1].data
			if(user.tags){
				user.tags = user.tags.split(',')
			}else{
				user.tags = ['优秀','腹黑']
			}
			
			let res = user
			
			Object.keys(user).forEach(key=>{
				if(!user[key]){
					res[key] = this.user.userInfo[key]
				}
			})
			this.userInfo = res
			this.raw_avatar = this.userInfo.avatar
			console.log("this.userInfo",this.userInfo)
			this.raw_coverImgs = this.userInfo.coverImgs

		},
		data() {
			return {
				showErr:false,
				errData:{title:'提示',content:'这是一个模态弹窗',cancelText:'cancel',confirmColor:'#3CC51F'},
				raw_avatar:"",
				raw_coverImgs:[],
				inputData:{
				  title:'定义标签',
				  content:[
				  {title:'标签名称',content:'',placeholder:'请输入标签'},
				  
				 ]},
				picker: {
					mode: 'date'
				},
				selectList1: [],
				defaultVal: ['2018', '12', '31'],
				chunLeiModal: {
					value: false,
					type: 'default',
					mData: {}
				},
				userInfo:{},
				value:false
			};
		},

		components: {
			wPicker,
			uniCompusUploadImg,
			KpTag
		},
		methods: {
			closeTag(index){
				this.userInfo.tags.splice(index,1)
			},
			close(e){
				uni.showModal({
					title:"删除图片",
					content:"你确认要删除该图片吗？",
					success:()=>{
						let res = this.userInfo.coverImgs.splice(e,1);
						this.request('v1/user/deleteCoverImg',{url:res[0]},'POST')
						
					}
				})
			},
			
			chooseImg(){
				uni.chooseImage({
				    sourceType: ["camera", "album"],
				    sizeType: "compressed",
				    count: 8 - this.userInfo.coverImgs.length,
				    success: (res) => {
						let obj = this.userInfo
						obj.coverImgs = obj.coverImgs.concat(res.tempFilePaths)
						this.userInfo = obj
				        
				    }
				})
			},
			onConfirmTag(e){
				
				this.userInfo.tags.push(e[0].content)
			},
			addTags(){
				this.value = true
			},
			
			async  submit(){
				
				let avatar = this.userInfo.avatar
				let coverImgs = this.userInfo.coverImgs
				coverImgs = arryDifferences(coverImgs,this.raw_coverImgs)

				
				this.userInfo.coverImgs = ""
				coverImgs.forEach(item=>{
					this.uploadFile('v1/uploadFiles/userCoverImgs',item)
				})
				
				
				//设置用户修改信息头像
				if(this.raw_avatar !== avatar){
					let avatarUrl = await this.uploadFile('v1/uploadFiles/avatar',avatar)
					this.userInfo.avatar = avatarUrl[1].data
				}
				
				
				//将用户的个人标签转化形式
				this.userInfo.tags = this.userInfo.tags.toString()
				let res = changeUserInfoValidator(this.userInfo)
				if(!res){
					this.request('v1/user/update',this.userInfo,'POST')
					uni.showToast({
						title:"修改成功",
						success: () => {
							uni.reLaunch({
								url:"/pages/self/self"
							})
						}
					})
					
				}else{
					let obj = this.errData
					obj.content = res
					this.errData = obj
					this.showErr = true
				}
				
				
			},
			onConfirm(item) {

			},
			onConfirmBirthday(item){
				
				
				this.userInfo = Object.assign({},this.userInfo,{birthday:item.result})
			},
			onConfirmHome(e){
				
				this.userInfo = Object.assign({},this.userInfo,{homeTown:e.result})
				
			},
			clickLeft() {
				uni.navigateBack({
					animationDuration: 300,
					animationType: 'pop-out'
				})
			},


			changePerson_avatar() {
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: (res) => {
						
						this.userInfo.avatar = res.tempFilePaths[0]
					}
				})
			},
			changePerson_sex() {
				this.chunLeiModal = {
					value: true,
					type: "select",
					mData: [{
						title: "男",
						icon: "../../static/personDetail/man.png"
					}, {
						title: "女",
						icon: "../../static/personDetail/woman.png"
					}]
				}
				this.onConfirm = (item) => {
					this.userInfo.sex = item.title

				}
			},
			changePerson_birthday() {

				this.$refs.date.show()
				
			},
			changePerson_hometown() {

				this.$refs.region.show()
				
			},
			changePerson_job() {
				this.chunLeiModal = {
					value: true,
					type: "select",
					mData: [{
							title: "学生汪",

						}, {
							title: "IT汪",

						},
						{
							title: "手艺汪",

						},
						{
							title: "商务汪",
						},
						{
							title: "家里蹲",
						},
						{
							title: "公务员",
						}
					]
				}
				this.onConfirm = (item)=>{this.userInfo.job=item.title}
			},
			changePerson_loveState(){
				this.chunLeiModal = {
					value: true,
					type: "select",
					mData:[{
						title:"单身汪"
					},
					{
						title:"恋爱中"
					},
					{
						title:"呵~我不会让你知道的"
					}]
				}
				this.onConfirm = (item)=>{this.userInfo.love=item.title}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tag-wrap{
		position: relative;
	}
	.close-view {
		text-align: center;
		line-height: 14px;
		height: 16px;
		width: 16px;
		border-radius: 50%;
		background: #ff5053;
		color: #ffffff;
		position: absolute;
		top: -6px;
		right: -4px;
		font-size: 12px;
		margin-top: 20rpx;
	}
	@import './index.scss';
	.eosfont {
		font-size: 42upx !important;
		margin-left: 20upx !important;
	}

	.changePerson_right {
		display: flex;
		justify-content: center;
		align-items: center;

		image {
			height: 80upx;
			width: 80upx;
			border-radius: 50%;
			margin-right: 20upx;
		}

		input {
			text-align: right;
		}

	}

	.changePerson {
		margin: 30upx;
	}

	.changePerson_avatar,
	.changePerson_sex,
	.changePerson_name,
	.changePerson_birthday,
	.changePerson_hometown,
	.changePerson_job,
	.changePerson_loveState {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 30upx 0;
		padding-bottom: 10upx;
		border-bottom: 1px solid #eee;

		.change_choice {
			color: #95afc0;
			font-size: 35upx;
			font-weight: 400;
		}

		.change image {
			width: 50upx;
			height: 50upx;
			margin-top: -10upx;
		}


	}

	.avatar image {
		width: 80upx;
		height: 80upx;
		border-radius: 50%;

	}
	
	.uniCompusButton{
		margin: 10upx;
	}
</style>
