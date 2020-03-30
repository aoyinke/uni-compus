<template>
	<view class="publishActivity">
		<uni-nav-bar left-icon="back" title="发布动态" @clickLeft="clickLeft">

		</uni-nav-bar>
		<view class="main">
			<view class="publish-title">
				<input type="text" v-model="title" class="uni-input" placeholder="标题（选填）" />
				<view class="publish-title-botton"></view>


			</view>
			<view class="uni-textarea">
				<textarea value="" placeholder="和志同道合的人一起分享动态吧" style="height: 400upx;" />
				</view>
			<view class="chooseGroup" @click="showGroup">
				<text class="eosfont">&#xe65e;</text>
				<text>选择该贴代表的团队吧    </text>
				<text class="eosfont">&#xe7df;</text>
			</view>
			<view class="groupShow-List" v-if="showGroupList">
				<view class="groupShow-item" v-for="(group,groupID) in groupList" :key="groupID" @click="chooseGroup(group.iconUrl,group.name,groupID)"
				:class="groupActive==groupID ? 'box-active' : '' ">
					<image :src="group.iconUrl" mode=""></image>
					<text>{{group.name}}</text>
				</view>
			</view >
			
		</view>
		<view class="footer">
			<view class="video footer-bar" @click="chooseVideo">
				<image src="../../static/publish/video.png" mode=""></image>
				<text>视频</text>
			</view>
			<view class="imgs footer-bar" @click="chooseImg">
				<image src="../../static/publish/picture.png" mode=""></image>
				<text>图片</text>
			</view>
		</view>
		<view class="showBar" v-if="publishImgList.length">
			<view class="showImg">
				<image :src="img" mode="" v-for="(img,imgId) in publishImgList" :key="imgId"></image>
			</view>
			<view class="showVideo" v-if="videoSrc">
				<video :src="videoSrc" controls></video>
			</view>
		</view>
		<button type="primary">发表</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showGroupList:false,
				groupActive:0,
				isSubmit:true,
				ImgShow:false,
				title:"",
				groupList:[],
				videoSrc:"",
				publishImgList:[]
			};
		},
		methods:{
			clickLeft(){
				uni.navigateBack({
					animationDuration:300,
					animationType:'pop-out'
				})
			},
			showGroup(){
				this.showGroupList = true
			},
			chooseGroup(img,name,groupID){
				this.groupActive = groupID
			},
			chooseImg(){
				let self = this
				uni.chooseImage({
					count: 9, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: function (res) {
						self.publishImgList = JSON.stringify(res.tempFilePaths)
						console.log(self.publishImgList)
					}
				});
			},
			chooseVideo(){
				let self = this
				uni.chooseVideo({
					count: 1,
					sourceType: ['camera', 'album'],
					success: function (res) {
						self.videoSrc = res.tempFilePath;
						console.log(self.videoSrc)
					}
				});
			}
		},
		async created() {
			let groupList = await this.request('groups/')
			this.groupList = groupList[1].data.data.records
			console.log(this.groupList)
		}
	}
</script>

<style lang="scss" scoped>
	.nav-right{
		button{
			background-color: yellow;
		}
	}
	.footer{
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		margin-top: 40upx;
		
		.footer-bar{
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			image{
				width: 60upx;
				height: 60upx;
			}
		}
	}
	.publish-title{
		input{
			
		}
		&-bottom{
			height: 20upx;
			border-bottom: 1upx solid #EEEEEE;
		}
	}
	.main{
		.groupShow-List{
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			justify-content: space-evenly;
			.groupShow-item{
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				border-bottom: 1upx solid #EEEEEE;
				image{
					width: 80upx;
					height: 80upx;
					border-radius: 50%;
					margin-bottom: 10upx;
				}
			}
		}
	}
	.showBar{
		.showImg{
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			align-content: center;
			image{
				width: 100upx;
				height: 150upx;
				
			}
		}
	}
</style>
