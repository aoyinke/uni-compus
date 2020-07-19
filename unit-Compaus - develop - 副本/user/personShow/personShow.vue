<template>
	<view>
		<uni-nav-bar  title="个人简介"  left-icon="back"  @clickLeft="clickLeft">
			
		</uni-nav-bar>
		<view class="uni-tab-bar">
			<scroll-view scroll-y="true" style="height: 105vh;">
				<view class="mainContent">
					<view class="detail-header">
								<swiper
								  circular
								  class="gallery"
								  interval="6000"
								  :current="coverImgs.galleryIndex"
								  @change="handleSwiperChange"
								  @transition="handleSwiperTarget"
								  @animationfinish="handleSwiperFinish"
								>
								  <swiper-item v-for="(item,index) in coverImgs.gallery" :key="index">
								    <image :src="item" lazy-load mode="aspectFill">
								  </swiper-item>
								</swiper>
							
							<view class="dots">
							  <view class="dots-count">
							    <text>{{ coverImgs.galleryIndex+1 }}</text>
							    \{{ coverImgs.gallery.length }}
							  </view>
							  <kp-swiper
							    v-model="coverImgs.gallery"
							    :dotsIndex="coverImgs.galleryIndex"
							    :dotsDirection="coverImgs.galleryDirection"
							    @update="val=>coverImgs.galleryIndex=val"
							  />
							</view>
							<view class="userBar">
								<view class="userBar-left">
									<view class="userInfo">
										<view class="userInfo-top">
											<text>{{userInfo.nickName}}</text>
										</view>
										<view class="userPosition" style="margin-top: 6px;">
											<kp-tag
											  size="small"
											  color="#3498db"
											  weight="500"
											  bg-color="#f1c40f"
											  class="left-star"
											>{{userInfo.college}}</kp-tag>
										</view>
									</view>
									<view class="groupLogo">
										<kp-avatar
										  :image="userInfo.avatar"
										  size="large"
										  mode="aspectFill"
										  @tap="handleOpenCommunity(row)"
										/>
									</view>
								</view>
								
								<view class="heart">
									<like-icon :userInfo="userInfo" @addSave="addSave" @cancelSave="cancelSave"></like-icon>
									<text style="margin-top: -20rpx;">{{userInfo.likeNums}}</text>
								</view>
						</view>
					</view>
				</view>
				<view class="uni-tab-bar">
					<view class="naviBar">
						<block v-for="(item,index) in nav" :key="index">
							<view class="nav-item"  @click="changePage(index)" :class="{'active': tapIndex==index}">
								<text>{{item}}</text>
							</view>	
						</block>	
						
					</view>
				<swiper :current="tapIndex" @change="pageSwiperChange" class="swiper-box">
					<swiper-item>
						<view class="homePage">
							<view class="Introduce paragraph">
								<view class="paragraph-title">
									<kp-badge class="title-dot" dot bg-color="#f5624f"/>
									<h2>个人信息</h2>
								</view>
							  <view class="Introduce content">
							  	<text>
									昵称：{{userInfo.nickName}}
									性别：{{userInfo.sex}}
									恋爱：{{userInfo.love}}
									职业：{{userInfo.job}}
									生日：{{userInfo.birthday}}
									家乡：{{userInfo.homeTown}}
								</text>
							  </view>
							</view>
							<view class="Introduce paragraph">
								<view class="paragraph-title">
									<kp-badge class="title-dot" dot bg-color="#f5624f"/>
									<h2>介绍</h2>
								</view>
							  <view class="Introduce content">
							  	<text>{{userInfo.description}}</text>
							  </view>
							</view>
							
							<view class="achievement paragraph">
								<view class="paragraph-title">
									<kp-badge class="title-dot" dot bg-color="#1e90ff"/>
									<h2>成就</h2>
								</view>
							  <view class="Introduce content">
							  	<text>{{userInfo.achievement}}</text>
							  </view>
							</view>
							
						
							<view class="labels paragraph">
								<view class="paragraph-title">
									<kp-badge class="title-dot" dot bg-color="#ff7f50"/>
									<h2>标签</h2>
								</view>
							  <view class="labels content">
							  	<kp-tag
							  	  v-for="(row,index) in userInfo.tags"
							  	  :key="index"
							  	  class="detail-labels"
							  	  type="grey"
							  	  shape="circle"
							  	>{{row}}</kp-tag>
							  </view>
							</view>
							
							
							<view class="team paragraph">
								<view class="paragraph-title">
									<kp-badge class="title-dot" dot bg-color="#ff7f50"/>
									<h2>小组</h2>
								</view>
							  <view class="team content">
								<view v-for="(row,index) in groups" :key="index" class="detail-team-item">
								  <kp-avatar
								    :image="row.logo"
								    size="large"
								    mode="aspectFill"
								    @tap="handleOpenCommunity(row)"
								  />
								  <text>{{row.groupName}}</text>
								</view>
							  </view>
							</view>
						</view>
					</swiper-item>
					

				</swiper>
				
				</view>
				
			</scroll-view>
		</view>
		
	</view>
</template>

<script>
import kpSwiper from '@/components/kp-swiper/index.vue';
import config from '@/config/index.js';
import KpIcon from "@/components/kp-icon";
import KpTag from "@/components/kp-tag";
import likeIcon from '@/components/common/commonIcon/userLike.vue';
import kpBadge from '@/components/kp-badge/index.vue';
import KpAvatar from '@/components/kp-avatar/index.vue';
import {baseConfig} from '@/config/index.js'
import { mapState} from 'vuex';
export default {
	computed:{
		...mapState(['user'])
	},
	data() {
		return {
			userInfo:{},
			groups:[],
			tapIndex:0,
			nav:['主页'],
			owner:{
				name:"轻松一校",
				age:1,
				star:"LEO",
				position:"ShangHai",
				logo:"https://img.pixbe.com/p47810601/BB381FBF431A489C96419E312E6494F3_640.jpg"
			},

			coverImgs: {
				gallery: ["https://images.mepai.me/app/activity/211/38224/a_5aa7297480979/55aa7297537183.jpg!1200w.jpg",
  "https://images.mepai.me/app/activity/211/38224/a_5aa7297480979/45aa72975371c0.jpg!1200w.jpg",
  "https://images.mepai.me/app/activity/211/38224/a_5aa7297480979/35aa72975371ff.jpg!1200w.jpg",
  "https://images.mepai.me/app/activity/211/38224/a_5aa7297480979/25aa729753723d.jpg!1200w.jpg",],
				galleryIndex: 0, //相册初始化位置
				galleryDirection: '' //滑动方向
			},
			scrollHeight:0,
		
		};
	},
	components: {
		kpSwiper,
		KpIcon,
		KpTag,
		likeIcon,
		kpBadge,
		KpAvatar,
		
	},
	async onLoad(option) {
		let userInfo = {}
		let userJoinedGroup = {}
		uni.getSystemInfo({
			success: (res) => {
				let height = res.windowHeight - uni.upx2px(355)
				this.scrollHeight = height
			}
		})
		let {personShow,uid} = option
		console.log("personShow,uid",personShow,uid)
		if(personShow){
			userInfo = await this.request('v1/user/visitOtherUser?uid=' + uid)
			userInfo = userInfo[1].data
			let res = userInfo
			
			Object.keys(userInfo).forEach(key=>{
				if(!userInfo[key]){
					res[key] = this.user.userInfo[key]
				}
			})
			this.userInfo = res
			
			userJoinedGroup = await this.request('v1/group/findOtherGroup?uid=' + uid)
			this.groups = userJoinedGroup[1].data
			if(userInfo.tags){
				console.log("this.userInfo.tags",this.userInfo)
				userInfo.tags = userInfo.tags.split(',')
			}else{
				userInfo.tags = ['优秀','腹黑']
			}
			
			
		}else{
			userInfo = await this.request('v1/user/getUserInfo')
			userInfo = userInfo[1].data
			userJoinedGroup = await this.request('v1/group/findUserGroup')
			let res = userInfo
			
			Object.keys(userInfo).forEach(key=>{
				if(!userInfo[key]){
					res[key] = this.user.userInfo[key]
				}
			})
			this.userInfo = res
			
			if(userInfo.tags){
				userInfo.tags = userInfo.tags.split(',')
			}else{
				userInfo.tags = ['优秀','腹黑']
			}
			
			this.groups = userJoinedGroup[1].data
		}
		
		
		
		
		this.coverImgs = Object.assign(this.coverImgs,{gallery:this.userInfo.coverImgs})
		
	},
	methods: {
		addSave(){
			let obj = this.userInfo
			obj.likeNums++
			this.userInfo = obj
		},
		cancelSave(){
			let obj = this.userInfo
			obj.likeNums--
			this.userInfo = obj
		},
		
		clickLeft() {
			uni.navigateBack({
				animationDuration: 300,
				animationType: 'pop-out'
			})
		},
		gotoChatPage(){
			uni.navigateTo({
				url:"/pages/chatPages/chatPages"
			})
		},
		goDetail(id){
			let url = ""
			switch(id){
				case 0:
					url = "/pages/publishTask/publishTask"
					break;
				case 1:
					url = "/pages/groupTaskList/groupTaskList"
					break;
				case 4:
					url = "/pages/groupInfoConcat/groupInfoConcat"
					break;
			}
			uni.navigateTo({
				url:url
			})
		},
		handleOpenCommunity(row){
			console.log(row)
			uni.navigateTo({
				url:"/groupInfo/groupDetail/groupDetail?groupId=" + row.groupId
			})
		},
		pageSwiperChange(e){
			this.tapIndex = e.detail.value
		},
		changePage(index){
			this.tapIndex = index
		},
		handleAuthorLike() {
		  const { liked, likeClick } = this.user;
		  let system = uni.getSystemInfoSync();
		  const { brand, model } = system;
		  let value = `${brand}-${model}-${Date.now()}=> ${likeClick + 1} times`;
		  uni.setStorage({
		    key: `${config.key}_liked`,
		    data: value,
		    success: () => {
		      // 轻触震动小交互
		      uni.vibrateShort({
		        success: () => {
		          // console.log("Thanks for your like！");
		        }
		      });
		      //#ifdef MP-WEIXIN
		      // 针对微信平台的埋点
		      wx.reportAnalytics("click_home_confession", {
		        love_count: likeClick + 1
		      });
		      //#endif
		    }
		  });
		  this.user = {
		    liked: value,
		    likeClick: likeClick + 1,
		    likeAnimate: true
		  };
		  if (liked) {
		    debounce(
		      setTimeout(() => {
		        this.user.likeAnimate = false;
		      }, 5000)
		    );
		  }
		},
		handleSwiperChange(e) {
		  // https://developers.weixin.qq.com/miniprogram/dev/component/swiper.html
		  // source为touch时由用户触摸引起
		  if (e.detail.source === "touch") {
		    this.coverImgs.galleryIndex = e.target.current;
		  }
		},
		handleSwiperTarget(e) {
		  this.coverImgs.galleryDirection =
		    (e.detail.dx > 0 && "left") || (e.detail.dx < 0 && "right");
		},
		handleSwiperFinish(e) {
		  if (!e.detail.source) {
		    this.coverImgs.galleryDirection = "";
		  }
		}
		
		
	}
};
</script>

<style lang="scss" scoped>
	.cooperate{
		.cooperateBar{
			display: flex;
			justify-content: space-evenly;
			align-items: center;
			flex-wrap: wrap;
			
			&-choice{
				position: relative;
				margin: 30upx 20upx 0 20upx;
				color: #fff;
				font-weight: 500;
				height: 250upx;
				width: 25%;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				border-radius: 10upx;
				background-image: linear-gradient(rgba(253, 150, 68,0.7),rgba(250, 130, 49,1.0));
				box-shadow: 0 5px 5px 4px rgba($color: #eee, $alpha: 0.7);
				image{
					
					height: 80upx;
					width: 80upx;
				}
				&-text{
					position: absolute;
					bottom: 0;
				}
			}
		}
	}
	.collections{
		
		&-title{
			font:{
				size: 36upx;
				weight:500
			}
			margin: 30upx 40upx 15upx 40upx;
		}
		&-item{
			display: flex;
			margin: 0 40upx 25upx 40upx;
			border: 1px solid #EDEDED;
			box-sizing: border-box;
			border-radius: 20upx;
			box-shadow: 0 3px 4px 0 rgba(0,0,0,0.2), 0 25px 50px 0 rgba(0,0,0,0.1);
			&-left{
				width: 65%;
				height: 250upx;
				&-coverImg{
					height: 100%;
					image{
						width: 100%;
						height: 100%;
					}
				}
			}
			&-right{
				width: 35%;
				height: 250upx;
				&-top{
					color: #fff;
					padding: 19%;
					text-align: center;
					height: 50%;
					background-image: linear-gradient(#2bcbba,#20bf6b);
					
				}
				&-bottom{
					color: #778ca3;
					font-weight: 500;
					display: flex;
					justify-content: center;
					align-items: center;
					flex-direction: column;
					text-align: center;
					height: 50%;
					background-color: #ced6e0;
				}
			}
			
		}
	}
	.swiper-box{
		position: relative;
		height: 140%;
	}
	.paragraph{
		margin-bottom: 30upx;
		.paragraph-title{
			display: flex;
			width: 20%;
			justify-content: space-evenly;
			align-items: center;
			margin: 30upx 20upx ;
		}
		.labels{
			display: flex;
			justify-content: space-evenly;
			align-items: center;
			flex-wrap: wrap;
			kp-tag{
				margin-bottom: 15upx;
			}
		}
		.team{
			display: flex;
			justify-content: space-evenly;
			align-items: center;
			overflow: hidden;
			.detail-team-item{
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
			}
		}
		.content{
			color: #a4b0be;
			font-size: 24upx;
			margin-left: 49upx;
			margin-right: 50upx;
		}
	}
	.active{
		transform: scale(1.2);
		transition: 1s;
		color: #000000;
		font-weight: bold;
		border-bottom: 4upx solid #000000;
		padding-bottom: 5upx;
		
	}
	.detail-header{
		position: relative;
		.gallery {
		  min-height: 750rpx;
		  swiper-item {
		    image {
		      width: 100%;
			  height: 100%;
		      border-bottom-left-radius: 100rpx;
		    }
		  }
		}
		.dots {
		  width: 100%;
		  overflow: hidden;
		  position: absolute;
		  right: -40%;
		  bottom: 15%;
		  &-count {
		    text-align: center;
		    font-size: 32rpx;
		    color: #fff;
		    text {
		      font-size: 50rpx;
		    }
		  }
		}
		.userBar{
			position: absolute;
			background-color: #f4f9ff;
			border-top-left-radius: 100upx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			right: 0;
			bottom: 0;
			width: 80%;
			height: 15%;
			&-left{
				display: flex;
				align-items: center;
				.userInfo{
					margin: 10upx 0 0 50upx;
					display: flex;
					justify-content: center;
					align-items: flex-start;
					flex-direction: column;
					
					&-top{
						display: flex;
						justify-content: space-evenly;
						
						align-items: center;
						width: 100%;
						font: {
							size: 36upx;
							font-weight: 500;
						};
						& :first-child{
							margin-right: 12upx;
						}
						
					}
					
					
					
					.userPosition{
						margin-top: -12rpx;
						& :last-child{
							color: rgba(209, 216, 224,1.0);
							font: {
								size: 24upx;
							};
						}
					}
					
				}
				kp-avatar{
					margin-left: 20rpx;
				}
			}
			.heart{
				margin: 50upx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}
			
		}
		
	}
	.naviBar{
		display: flex;
		color: #a4b0be;
		font-size: 36upx;
		justify-content: space-evenly;
		width: 94%;
		align-items: center;
		margin-top: 30upx;
	}
	
	
	.bottom{
		display: flex;
		justify-content: space-evenly;
		margin-top: 50upx;
		
	}
	@keyframes heartBeat {
	  0% {
	    transform: scale(1);
	    opacity: 0.3;
	  }
	
	  14% {
	    transform: scale(1.2);
	    opacity: 0.5;
	  }
	
	  28% {
	    transform: scale(1);
	    opacity: 0.7;
	  }
	
	  42% {
	    transform: scale(1.2);
	    opacity: 0.9;
	  }
	
	  70% {
	    transform: scale(1);
	    opacity: 1;
	  }
	}
	@keyframes hearts-custom {
	  0%,
	  100% {
	    opacity: 0;
	  }
	  from {
	    transform: scale3d(0.35, 0.35, 0.35);
	  }
	  40% {
	    opacity: 0.8;
	    transform: scale3d(1, 1, 1) rotate3d(0, 0, 1, 15deg);
	  }
	  65% {
	    transform: rotate3d(0, 0, 1, -10deg);
	  }
	  75% {
	    transform: rotate3d(0, 0, 1, 5deg);
	  }
	  90% {
	    transform: rotate3d(0, 0, 1, -5deg);
	  }
	  to {
	    transform: rotate3d(0, 0, 1, 0deg);
	  }
	}
	
	@keyframes float-upwards {
	  0%,
	  100% {
	    opacity: 0;
	  }
	  50% {
	    opacity: 0.7;
	  }
	  50%,
	  100% {
	    transform: translate(-2rpx, -10rpx);
	  }
	}
	
	@keyframes wave1 {
	  0% {
	    opacity: 0.8;
	    transform: scale(1);
	    background-color: transparent;
	  }
	  100% {
	    opacity: 0;
	    transform: scale(2);
	  }
	}
	@keyframes wave2 {
	  0% {
	    opacity: 0.8;
	    transform: scale(1);
	    background-color: transparent;
	  }
	  100% {
	    opacity: 0;
	    transform: scale(3);
	  }
	}
</style>
