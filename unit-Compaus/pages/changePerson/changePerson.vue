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
		
			<uniCompusButton content="保存" width="100" background="#4834d4" @click.native="submit"></uniCompusButton>
		
		
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
	import uniCompusButton from '@/components/uni-compus-components/unicompus-button.vue'
	import {mapState} from 'vuex'
	export default {
		computed:{
			...mapState([
				'user'
			])
		},
		onLoad() {
			
			this.userInfo = Object.assign({},this.user.userInfo)
			console.log(this.userInfo)
		},
		data() {
			return {
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
				userInfo:{}
			};
		},

		components: {
			wPicker,
			uniCompusButton
		},
		methods: {
			submit(){
				console.log(this.userInfo)
				this.request('v1/user/update','6666','POST')
				console.log(this.request)
			},
			onConfirm(item) {

			},
			onConfirmBirthday(item){
				console.log(item)
				
				this.userInfo = Object.assign({},this.userInfo,{birthday:item.result})
			},
			onConfirmHome(e){
				console.log(e)
				this.userInfo = Object.assign({},this.userInfo,{homeTown:e.result})
				
			},
			clickLeft() {
				uni.navigateBack({
					animationDuration: 300,
					animationType: 'pop-out'
				})
			},
			submitChangedInfo() {
				console.log(this.userInfo)
			},

			changePerson_avatar() {
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: (res) => {

						this.userInfo.avatar = res.tempFilePaths
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
