<template>
	<view>
		<uni-nav-bar left-icon="back" title="修改任务" @clickLeft="clickLeft"></uni-nav-bar>
		<view class="TaskName">
			<text class="eosfont">&#xe627;</text>
			<text class="TaskName-title">{{ taskInfo.taskName }}</text>
			
		</view>
		<view class="main" v-if="groupAuth >= 8">
			<view class="uni-list-cell uni-list-cell-pd changeTaskName">
				<view class="uni-list-cell-db" style="font-weight: 500;">任务的名称</view>
				<input type="text" v-model="taskInfo.taskName" />
			</view>
			
			<view class="uni-list-cell uni-list-cell-pd" @tap="changeDeadLine">
				<view class="uni-list-cell-db" style="font-weight: 500;">任务截止的时间</view>
				
				<text>{{taskInfo.deadLine}}</text>
			</view>
			<view class="uni-list-cell uni-list-cell-pd">
				<view class="uni-list-cell-db" style="font-weight: 500;">任务注意的事项</view>
				<text class="eosfont addConcernEvent">&#xe715;</text>
			</view>
			<view class="inputConcernEvent">
				<textarea v-model="taskInfo.concernEvent" placeholder="请输入任务注意事项" />
			</view>
			<uni-compus-upload-img title="选择任务需要的图片(点击可预览)" :imageList="taskInfo.taskImgs" @close="close" @chooseImg="chooseImg"></uni-compus-upload-img>
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
						<text>{{ row.name }}</text>
					</view>
				</view>
			</view> 
			<uni-compus-button content="确认修改" background="#fbc531" width="100"></uni-compus-button>
		</view>
		<view class="taskBar" v-else>
			<view class="taskBar-img">
				<swiper v-if="taskInfo.taskImgs.length" :indicator-dots="true"  class="swiper-box" :autoplay="true" :interval="3000" :duration="1000">
					<swiper-item v-for="(img,idx) in taskInfo.taskImgs" :key="idx">
						<image :src="img" mode="" style="width: 100%;height: 100%;" @click="previewTaskImg(taskInfo.taskImgs)"></image>
					</swiper-item>
				</swiper>
				<uni-collapse :accordion="true">
					<uni-collapse-item :title="taskInfo.taskName" :showAnimation="true" >
						<view class="task-progress">
							<textarea v-model="progressMessage" style="width: 100%;height: 100%;" placeholder="更新个人任务进度" />
							
						</view>
						<uni-compus-button content="汇报进度" background="#fbc531" width="100" @click.native="submitProgress"></uni-compus-button>
					</uni-collapse-item>
					
				</uni-collapse>
				<view class="uni-list-cell uni-list-cell-pd ">
					<view class="uni-list-cell-db" style="font-weight: 500;">任务属于的活动</view>
					<view class="uni-list-cell-db" style="font-weight: 500;">
						<text>{{taskInfo.belongActivity}}</text>
					</view>
				</view>
				<view class="uni-list-cell uni-list-cell-pd ">
					<view class="uni-list-cell-db" style="font-weight: 500;">任务截止时间</view>
					<view class="uni-list-cell-db" style="font-weight: 500;">
						<text>{{taskInfo.deadLine}}</text>
					</view>
				</view>
				<view class="uni-list-cell uni-list-cell-pd ">
					<view class="uni-list-cell-db" style="font-weight: 500;">任务的内容</view>
				</view>
				<view class="taskBar-content item">
					<text>{{taskInfo.content}}</text>
				</view>
				<view class="uni-list-cell uni-list-cell-pd ">
					<view class="uni-list-cell-db" style="font-weight: 500;">任务的注意事项</view>
				</view>
				<view class="taskBar-concernEvent item">
					<text>{{taskInfo.concernEvent}}</text>
				</view>
			</view>
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
	</view>
</template>

<script>
import wPicker from "@/components/w-picker/w-picker.vue"
import lvSelect from '@/components/lv-select/lv-select.vue';
import KpAvatar from '@/components/kp-avatar/index.vue';
import uniPopup from '@/components/uni-popup/uni-popup.vue';
import uniCompusButton from '@/components/uni-compus-components/unicompus-button.vue';
import uniCompusUploadImg from '@/components/uni-compus-components/uniCompus-uploadImg.vue'
import uniCollapse from '@/components/uni-collapse/uni-collapse.vue';
import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue';
export default {
	async onLoad(item){
		let {taskId,groupAuth} = item
		let taskInfo = await this.request('v1/task/getTaskInfo?taskId='+taskId)
		taskInfo = taskInfo[1].data
		console.log("groupAuth",groupAuth)
		this.groupAuth = groupAuth
		this.joinedPeopleList = taskInfo.joinedPeople
		this.taskInfo = taskInfo
	},
	data() {
		return {
			progressMessage:"",
			groupAuth:"",
			taskInfo:{"belongActivity":"轻松一校上线",taskName:"轻松一校","concernEvent":"asdsaddsa",content:"asdasdas",taskImgs:
			["https://images.mepai.me/app/works/38224/2018-12-13/w_5c11a8909399c/75c11a89102357.jpg!1200w.jpg",
  "https://images.mepai.me/app/works/38224/2018-12-13/w_5c11a8909399c/65c11a89102397.jpg!1200w.jpg",
  "https://images.mepai.me/app/works/38224/2018-12-13/w_5c11a8909399c/45c11a8910240b.jpg!1200w.jpg",]},
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
	methods: {
		submitProgress(){
			if(this.progressMessage){
				let {id,groupId} = this.taskInfo
				let messageInfo = {taskId:id,groupId,message:this.progressMessage}
				uni.showModal({
					title:"汇总进度",
					content:"是否提交进度？",
					success: (res) => {
						if(res.confirm){
							this.request('v1/task/uploadTaskMessage',messageInfo,"POST").then(res=>{
								uni.showToast({
									title:"汇总成功"
								})
								this.progressMessage = ""
							})
						}
					}
				})
			}else{
				uni.showToast({
					title:"不能为空",
					icon:"none"
				})
			}
			
			console.log(this.taskInfo)
			console.log(this.progressMessage)
		},
		previewTaskImg(imgs){
			uni.previewImage({
			    urls: imgs
			});
		},
		changeDeadLine(){
			this.$refs.shortTerm.show()
		},
		onConfirmDeadLine(event){
			let obj = this.taskInfo
			obj.deadLine = event.result
			this.taskInfo = obj
			console.log(this.taskInfo)
		},
		
		chooseImg(){
			uni.chooseImage({
			    sourceType: ["camera", "album"],
			    sizeType: "compressed",
			    count: 8 - this.taskInfo.taskImgs.length,
			    success: (res) => {
					let obj = this.taskInfo
					obj.taskImgs = obj.taskImgs.concat(res.tempFilePaths)
					this.taskInfo = obj
			        
			    }
			})
		},
		close(e){
			this.taskInfo.taskImgs.splice(e,1);
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
		uniCompusUploadImg,
		uniCollapse,
		uniCollapseItem,
		
	},
	created() {
		for (let i = 0; i < 5; i++) {
			this.groupMembers.push(this.groupMembers[0])
			this.joinedPeopleList.push(this.joinedPeopleList[0]);
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
