<template>
	<view>
		<uni-nav-bar left-icon="back" title="发布任务" @clickLeft="clickLeft"></uni-nav-bar>
		<view class="main">
			<view class="task" v-for="(task,index) in inputTask" :key="index">
				<view class="task-left">
					<text class="eosfont">&#xe716;</text>
					<text>{{task.content}}</text>
				</view>
				<view class="task-right">
					<input type="text" value="" :placeholder="task.placeholder" />
				</view>
			</view>
			<view class="deadLine" @click="changeDeadLine">
				<view class="deadLine-left">
					<text class="eosfont">&#xe716;</text>
					<text>设置任务截止时间</text>
				</view>
				<text>{{taskInfo.deadLine}}</text>
				
			</view>
	
			<uni-compus-upload-img title="选择任务需要的图片(点击可预览)" :imageList="taskInfo.imageList" @close="close" @chooseImg="chooseImg"></uni-compus-upload-img>
			<view class="addTaskCategory">
				<view class="addTaskCategory-item" v-for="(item,idx) in addTaskCategoryItems" :key="idx" >
					<text class="content">{{item}}</text>
					<text class="delete" @click="deleteDask(idx)">删除</text>
				</view>
				<view class="addTaskCategory-title" @click="addTaskCategory">
					<text >+增加任务分类</text>
				</view>
				
				<view class="addTaskCategory-description">
					<text>例如物资租借，物资购买等</text>
				</view>
			</view>
			
			
			<uniCompusButton width="100" content="发布任务" backgroud="#ffa502"></uniCompusButton>
		</view>
		
		<w-picker
		        mode="shortTerm"
		        value="2020-04-08 13:18:00"
		        :current="true"
		        expand="60"
		        @confirm="onConfirmDeadLine($event,'shortTerm')"
		        
		        ref="shortTerm" 
		    >
		</w-picker>
		<chunLei-modal v-model="showModel" :mData="inputData" type="input" @onConfirm="onConfirm" @cancel="cancel" navMask>
		    </chunLei-modal>
	</view>
</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue"
	import uniCompusButton from '@/components/uni-compus-components/unicompus-button.vue'
	export default {
		data() {
			return {
				choosedImg:[],
				showModel:false,
				inputData:{
				  title:'输入任务名称',
				  content:[
				  {title:'任务',content:'',type:'text',placeholder:'请输入任务名'},
				  
				  ]
				},
				taskName:"",
				taskInfo:{},
				selectList1: [],
				defaultVal: ['2018', '12', '31'],
				addTaskCategoryItems:[],
				inputTask:[
				{content:"任务名称",placeholder:"请填写任务名称"},
				{content:"任务所属的活动",placeholder:"请填写任务所属的活动"},
				{content:"参与人员的数量",placeholder:"请填写参与人员的数量"}]
			};
		},
		methods:{
			close(e){
			    this.imageList.splice(e,1);
			},
			chooseCoverImg(){
				let that = this
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album'], //从相册选择
				    success: function (res) {
				        
						that.choosedImg = JSON.stringify(res.tempFilePaths)
						console.log(that.choosedImg)
				    }
				});
			},
			deleteDask(idx){
				this.addTaskCategoryItems.splice(idx,1)
			},
			onConfirmDeadLine(event){
				let obj = {}
				obj.deadLine = event.result
				this.taskInfo = obj
				console.log(this.taskInfo)
			},
			onConfirm(e){this.addTaskCategoryItems.push(e[0].content)},
			cancel(e){console.log(e)},
			changeDeadLine() {
				this.$refs.shortTerm.show()
				
			},
			clickLeft() {
				uni.navigateBack({
					animationDuration: 300,
					animationType: 'pop-out'
				})
			},
			addTaskCategory(index){
				this.showModel = true 
			}
		},
		components:{
			wPicker,
			uniCompusButton
		}
		
	}
</script>

<style lang="scss" scoped>
@import './index.scss';
	@mixin inputStyle {
		background-color: #fff;
		margin: 20upx 0;
		border-bottom: 1px solid #eee;
		padding: 15upx;
	}
	.main{
		padding-top: 20upx;
		height: 100vh;
		background-color: #dfe4ea;
		.task{
			display: flex;
			align-items: center;
			@include inputStyle;
			&-left{
				& :first-child{
					color: #eb4d4b;
					
				}
			}
			&-right{
				flex: 1;
				text-align: right;
			}
		}
		
		.deadLine{
			@include inputStyle;
			display: flex;
			justify-content: space-between;
			align-items: center;
			&-left{
				& >text:first-child{
					color: #eb4d4b;
				}
			}
		}
		
		.addTaskCategory{
			padding-top: 20upx;
			border: 1px solid #eee;
			box-shadow: 3px 3px 3px 5px rgba($color: #ced6e0, $alpha: 0.7);
			&-item{
				@include inputStyle;
				display: flex;
				margin: 0 !important;
				justify-content: space-between;
				align-items: center;
				text-align: center;
				color: black;
				font-weight: 500;
				.delete{
					color: #ff4757;
				}
			}
			&-title{
				background-color: #FFFFFF;
				width: 100%;
				text-align: center;
				color: #22a6b3 !important;
			}
			& text:last-child{
				margin: 20upx 0;
				
			}
		}
	}
</style>
