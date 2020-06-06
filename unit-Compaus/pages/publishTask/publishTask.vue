<template>
	<view>
		<uni-nav-bar left-icon="back" title="修改任务" @clickLeft="clickLeft"></uni-nav-bar>

		<view class="main">
			<view class="uni-list-cell uni-list-cell-pd changeTaskName">
				<view class="uni-list-cell-db" style="font-weight: 500;">任务的名称</view>
				<input type="text" v-model="taskInfo.taskName" class="taskName"></taskInfo>
			</view>
			<view class="uni-list-cell uni-list-cell-pd changeTaskName">
				<view class="uni-list-cell-db" style="font-weight: 500;">任务所属的活动</view>
				<input type="text" v-model="taskInfo.belongActivity" />
			</view>
			<view class="uni-list-cell uni-list-cell-pd" @tap="changeDeadLine">
				<view class="uni-list-cell-db" style="font-weight: 500;">设置截止的时间</view>
				
				<text>{{taskInfo.deadLine}}</text>
			</view>
			
			<view class="uni-list-cell uni-list-cell-pd">
				<view class="uni-list-cell-db" style="font-weight: 500;">任务的内容</view>
				<text class="eosfont addConcernEvent">&#xe715;</text>
			</view>
			<view class="inputConcernEvent">
				<textarea v-model="taskInfo.content" placeholder="请输入任务的内容" />
			</view>
			
			<view class="uni-list-cell uni-list-cell-pd">
				<view class="uni-list-cell-db" style="font-weight: 500;">任务注意的事项</view>
				<text class="eosfont addConcernEvent">&#xe715;</text>
			</view>
			<view class="inputConcernEvent">
				<textarea v-model="taskInfo.concernEvent" placeholder="请输入任务注意事项" />
			</view>
			<uni-compus-upload-img title="选择任务封面图片(点击可预览)" :imgNumber="1" :imageList="taskInfo.coverImg" @close="closeCover" @chooseImg="chooseCoverImg"></uni-compus-upload-img>
			<uni-compus-upload-img title="选择任务需要的图片(点击可预览)" :imageList="taskInfo.imageList" @close="close" @chooseImg="chooseImg"></uni-compus-upload-img>
			<view class="joinedPeople">
				<view class="joinedPeople-change">
					<view class="joinedPeople-change-left">
						<text class="eosfont">&#xe671;</text>
						<text>参与的成员</text>
					</view>
					<view class="joinedPeople-change-right" @click="changejoinedPeople"><text class="eosfont">&#xe715;</text></view>
				</view>
				<view class="joinedPeople-list">
					<view class="joinedPeople-list-item" v-for="(row, index) in joinedPeopleList" :key="index">
						<kp-avatar :image="row.avatar" size="large" mode="aspectFill" @tap="handleOpenCommunity(row)" />
						<text>{{ row.nickName }}</text>
					</view>
				</view>
			</view> 
			<uni-compus-button content="确认修改" background="#fbc531" width="100" @click.native="uploadTask"></uni-compus-button>
		</view>
		<uni-popup ref="popup" type="bottom">
			<slot>
				<view class="choosejoinedPeople">
					<view class="uni-tab-bar">
						<view class="choosejoinedPeople-title"><text>未加入任务的成员</text></view>
						<view style="">
							<lv-select
								@handleSearch="handleSearch"
								@change="change"
								placeholder="请输入成员名称"
								:infoList="infoList"
								:showValue="showValue"
								v-model="searchValue"
								:loading="loading"
								type="primary"
								:uniShadow="true"
							></lv-select>
						</view>
						<view class="joinedPeople-list">
							<view class="joinedPeople-list-item" v-for="(row, index) in joinedPeopleList" :key="index">
								<kp-avatar :image="row.avatar" size="large" mode="aspectFill" @tap="handleOpenCommunity(row)" />
								<text>{{ row.nickName }}</text>
							</view>
						</view>
						<scroll-view scroll-y="true" class="list" :style="{height:scrollHeight}">
							<view class="memberList">
								<view class="memberList-item" v-for="(member,idx) in groupMembers" :key="idx">
									<view class="memberList-item-left">
										<kp-avatar :image="member.avatar" size="large" mode="aspectFill" @tap="handleOpenCommunity(row)" />
										<text>{{ member.nickName }}</text>
									</view>
									<view class="memberList-item-right" @click="addJoinedMember(idx,member)"><text class="eosfont">&#xe715;</text></view>
								</view>
							</view>
						</scroll-view>
					</view>
				</view>
			</slot>
		</uni-popup>
		<w-picker
		        mode="shortTerm"
		        value="2020-04-08 13:18:00"
		        :current="true"
		        expand="60"
		        @confirm="onConfirmDeadLine($event,'shortTerm')"
		        
		        ref="shortTerm" 
		    >
		</w-picker>
		<chunLei-modal v-model="showErr" type="default" :mData="errData" navMask>
		</chunLei-modal>
	</view>
</template>

<script>
import wPicker from "@/components/w-picker/w-picker.vue"
import lvSelect from '@/components/lv-select/lv-select.vue';
import KpAvatar from '@/components/kp-avatar/index.vue';
import uniPopup from '@/components/uni-popup/uni-popup.vue';
import uniCompusButton from '@/components/uni-compus-components/unicompus-button.vue';
import uniCompusUploadImg from '@/components/uni-compus-components/uniCompus-uploadImg.vue'
import {publishTaskValidator} from '@/utils/validator.js'
export default {
	data() {
		return {
			showErr:false,
			errData:{title:'提示',content:'这是一个模态弹窗',cancelText:'取消',confirmColor:'#3CC51F'},
			
			taskInfo:{imageList:[],coverImg:[],deadLine:""},
			scrollHeight:"500rpx",
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
			groupMembers:[{name:"老王",avatar:"https://images.mepai.me/app/activity/211/38224/a_5aa7297480979/05aa72975372c0.jpg!1200w.jpg"}],
			joinedPeopleList: []
		};
	},
	async onLoad(option){
		
		let raw_teamMembers = await this.request(`v1/group/groupMembers?groupId=${option.groupId}`)
		let groupMembers = raw_teamMembers[1].data
		this.groupMembers = groupMembers
	},
	methods: {
		async uploadTask(){
			console.log(this.taskInfo)
			let errMsg = publishTaskValidator(this.taskInfo)
			if(!errMsg){
				let taskInfo = this.taskInfo
				let taskImgs = taskInfo.imageList
				let coverImg = taskInfo.coverImg
				
				if(taskInfo.deadLine){
					let split_deadline = taskInfo.deadLine.split(' ')

				}
				taskInfo.joinedPeopleList = this.joinedPeopleList
				let raw_task = await this.request('v1/task/addTask',taskInfo,'POST')
				let task = raw_task[1].data
				let taskId = task.id
				console.log("task",task)
				
				this.uploadFile('v1/uploadFiles/taskCoverImg',coverImg,{taskId})
				if(taskImgs.length){
					
					taskImgs.forEach(url=>{
						this.uploadFile('v1/uploadFiles/taskImgs',url,{taskId})
					})
				}
				uni.navigateTo({
					
				})
				
			}else{
				let obj = this.errData
				obj.content = errMsg
				this.errData = obj
				this.showErr = true
			}
			
		},
		changeDeadLine(){
			this.$refs.shortTerm.show()
		},
		onConfirmDeadLine(event){
			this.taskInfo.deadLine = event.result
			console.log(this.taskInfo)
		},
		chooseCoverImg(){
			uni.chooseImage({
			    sourceType: ["camera", "album"],
			    sizeType: "compressed",
			    count: 1,
			    success: (res) => {
					let obj = this.taskInfo
					obj.coverImg = res.tempFilePaths
					this.taskInfo = obj
			        
			    }
			})
		},
		closeCover(e){
			this.taskInfo.coverImg="";
		},
		
		chooseImg(){
			uni.chooseImage({
			    sourceType: ["camera", "album"],
			    sizeType: "compressed",
			    count: 8 - this.taskInfo.imageList.length,
			    success: (res) => {
					let obj = this.taskInfo
					obj.imageList = obj.imageList.concat(res.tempFilePaths)
					this.taskInfo = obj
			        
			    }
			})
		},
		close(e){
			this.taskInfo.imageList.splice(e,1);
		},
		
		addJoinedMember(index,member){
			this.groupMembers.splice(index,1)
			this.joinedPeopleList.push(member)
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
		clickLeft() {
			uni.navigateBack({
				animationDuration: 300,
				animationType: 'pop-out'
			});
		},
		handleOpenCommunity(e) {
			console.log(e);
		},

		changejoinedPeople() {
			this.$refs.popup.open();
		}
	},
	components: {
		KpAvatar,
		uniPopup,
		lvSelect,
		uniCompusButton,
		wPicker,
		uniCompusUploadImg
		
	},
	created() {
		for (let i = 0; i < 5; i++) {
			this.groupMembers.push(this.groupMembers[0])
			
		}
	}
};
</script>

<style lang="scss" scoped>
@import './index.scss';
.addConcernEvent{
	color: #00a8ff;
}
.changeTaskName{
	input{
		text-align: right;
	}
	
}
.inputConcernEvent{
	background-color: #dcdde1;
	margin: 20upx 20upx 20upx 20upx;
	border: 1px solid #eee;
}
.TaskName{
	text-align: center;
	margin-bottom: 30upx;
	&-title{
		
		font: {
			size: 36upx;
			font-weight: 600;
		};
	}
}
.main {
	.joinedPeople {
		box-shadow: 3px 3px 3px 5px rgba($color: #dfe4ea, $alpha: 0.7);
		&-change {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 15upx;
			border-radius: 1px solid #f1f2f6;
			&-left {
			}
			&-right {
				color: #70a1ff;
			}
		}
		&-list {
			display: flex;
			align-items: center;
			justify-content: space-evenly;
			flex-wrap: wrap;
			margin: 15rpx;
			&-item {
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
			}
		}
	}
}
</style>
