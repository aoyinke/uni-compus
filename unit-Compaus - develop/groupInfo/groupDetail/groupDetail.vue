<template>
	<view>
		<uni-nav-bar  title="社团"  left-icon="back"  @clickLeft="clickLeft">
			
		</uni-nav-bar>
		<view class="uni-tab-bar">
			<scroll-view scroll-y="true" style="height: 100vh;">
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
											<text>{{groupInfo.groupName}}</text>
										</view>
										<view class="userPosition" style="margin-top: 10px;">
											<kp-tag
											  size="small"
											  color="#3498db"
											  weight="500"
											  bg-color="#f1c40f"
											  class="left-star"
											>{{groupInfo.college}}</kp-tag>
										</view>
									</view>
									<view class="groupLogo">
										<kp-avatar
										  :image="groupInfo.logo"
										  size="large"
										  mode="aspectFill"
										  @tap="handleOpenCommunity(row)"
										/>
									</view>
								</view>
								
								<view class="heart">
									<like-icon :groupInfo="groupInfo" @addSave="addSave" @cancelSave="cancelSave"></like-icon>
									<text style="margin-top: -20rpx;">{{groupInfo.fav_nums}}</text>
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
							
							<view class="concat paragraph">
								<view class="paragraph-title">
									<kp-badge class="title-dot" dot bg-color="#f5624f"/>
									<h2>联系方式</h2>
								</view>
							  <view class="Introduce content">
							  	<text>{{groupInfo.concat}}</text>
							  </view>
							</view>
							
							<view class="Introduce paragraph">
								<view class="paragraph-title">
									<kp-badge class="title-dot" dot bg-color="#f5624f"/>
									<h2>社团介绍</h2>
								</view>
							  <view class="Introduce content">
							  	<text>{{groupInfo.description}}</text>
							  </view>
							</view>
							
							<view class="achievement paragraph">
								<view class="paragraph-title">
									<kp-badge class="title-dot" dot bg-color="#1e90ff"/>
									<h2>社团成就</h2>
								</view>
							  <view class="Introduce content">
							  	<text>{{groupInfo.achievements}}</text>
							  </view>
							</view>
							
							<view class="classicActivity paragraph">
								<view class="paragraph-title">
									<kp-badge class="title-dot" dot bg-color="#1e90ff"/>
									<h2>专属活动</h2>
								</view>
							  <view class="classicActivity content">
							  	<text>{{groupInfo.specialActivity}}</text>
							  </view>
							</view>
							
							<view class="labels paragraph">
								<view class="paragraph-title">
									<kp-badge class="title-dot" dot bg-color="#ff7f50"/>
									<h2>定制标签</h2>
								</view>
							  <view class="labels content">
							  	<kp-tag
							  	  v-for="(row,index) in groupInfo.tags"
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
									<h2>团队</h2>
								</view>
							  <view class="team content">
								<view v-for="(row,index) in team" :key="index" class="detail-team-item">
								  <kp-avatar
								    :image="row.avatar"
								    size="large"
								    mode="aspectFill"
								    @tap="handleOpenCommunity(row)"
								  />
								  <text>{{row.nickName}}</text>
								  <text>{{row.position}}</text>
								</view>
							  </view>
							</view>
						</view>
						<view class="bottom">
							<uniCompusButton content="申请加入" background="#ff6b81" width="100" style="width: 100%;" @click.native="joinGroup"></uniCompusButton>
							<!-- <uniCompusButton content="聊天" background="#70a1ff" width="100" style="width: 40%;" @click.native="gotoChatPage"></uniCompusButton> -->
						</view>
					</swiper-item>
					
					<swiper-item class="collections">
						<view class="collections-title">
							<text>Previous collections</text>
						</view>
						<hj3-display-images
							:images="img"
							:vertical="false"
							:vtouch="true"
							@itap="tap"
							:autoplay="true"
							:clockwise="true"
							:interval="3000"
							:titleBottom="true"
							:background="back"
						></hj3-display-images>
						<view class="total-collection">
							<text> 回忆：{{ current }}/{{totalNums}}</text>
						</view>
						<view class="bottom">
							<uniCompusButton content="申请加入" background="#ff6b81" width="100" style="width: 100%;" @click.native="joinGroup"></uniCompusButton>
							<!-- <uniCompusButton content="聊天" background="#70a1ff" width="100" style="width: 40%;" @click.native="gotoChatPage"></uniCompusButton> -->
						</view>
					</swiper-item>
					
				</swiper>
				
				</view>
				
			</scroll-view>
		</view>
		<chunLei-modal  v-model="showJoin" :mData="inputData" type="input" @onConfirm="onConfirmJoin"  navMask>
		    </chunLei-modal>
	</view>
</template>

<script>
import hj3DisplayImages from '@/components/hj3-display-images/hj3-display-images.vue';
import kpSwiper from '@/components/kp-swiper/index.vue';
import config from '@/config/index.js';
import KpIcon from "@/components/kp-icon";
import KpTag from "@/components/kp-tag";
import likeIcon from '@/components/common/commonIcon/groupLike.vue';
import kpBadge from '@/components/kp-badge/index.vue';
import KpAvatar from '@/components/kp-avatar/index.vue';
import { mapState} from 'vuex';
import {baseConfig,collections} from '@/config/index.js'
export default {
	computed: {
		...mapState(['group'])
	},
	data() {
		return {
			totalNums:0,
			img: [
				// {src:'http://image.zhangxinxu.com/image/study/s/s128/mm1.jpg',title:"mm1"}, {src:'http://image.zhangxinxu.com/image/study/s/s128/mm8.jpg',title:"mm2"},
			    //只是为了演示，不推荐这种混合方式，不一致不太好
					"https://images.mepai.me/app/works/38224/2019-12-11/w_5df03f532c12d/05df03f532c285.jpg!1200w.jpg",
					"https://images.mepai.me/app/works/38224/2019-12-08/w_5dec4ca4a2700/05dec4ca4a2878.jpg!1200w.jpg",
			        "https://lz.sinaimg.cn/orj1080/967d9727ly3gc0whyfofkj20sg0sg4av.jpg",
			        "https://images.mepai.me/app/works/38224/2019-12-25/w_5e02b44081594/05e02b440816c9.jpg",
			        "https://images.mepai.me/app/works/38224/2019-12-22/w_5dfecd711bb5a/05dfecd711bc6b.jpg!1200w.jpg",
			   ],
			current:0,
			back:'#fff',
			showJoin:false,
			inputData:{
			  title:'申请加入',
			  content:[
			  {title:'加入理由',content:'',placeholder:'请输入加入理由'}
			  ]
			},
			groupInfo:{},
			
			collections:collections,
			team:[],

			tapIndex:0,
			nav:['主页','展示'],
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
		hj3DisplayImages,
		kpSwiper,
		KpIcon,
		KpTag,
		likeIcon,
		kpBadge,
		KpAvatar
	},
	async onLoad(item) {
		uni.getSystemInfo({
			success: (res) => {
				let height = res.windowHeight - uni.upx2px(355)
				this.scrollHeight = height
			}
		})
		
		let raw_groupInfo = await this.request('v1/group/detail?groupId=' + item.groupId)
		let groupInfo = raw_groupInfo[1].data
		if(groupInfo.tags){
			groupInfo.tags = groupInfo.tags.split(',')
		}else{
			groupInfo.tags = ['优秀','精神小伙']
		}
		let res = groupInfo
		Object.keys(groupInfo).forEach(key=>{
			if(!groupInfo[key]){
				res[key] = this.group.defaultGroup[key]
			}
		})
		
		this.groupInfo = res
		this.coverImgs = Object.assign(this.coverImgs,{gallery:groupInfo.coverImgs})
		
		
		let raw_teamMembers = await this.request(`v1/group/groupMembers?groupId=${groupInfo.id}`)
		this.team = raw_teamMembers[1].data
	},
	methods: {
		tap:function (e) {
				
				this.current = e
		},
		async onConfirmJoin(item){
			let reason = item[0].content
			let groupId = this.groupInfo.id
			let res = await this.request('v1/group/applicant',{groupId,reason},'POST')
			console.log(res)
		},
		joinGroup(){
			this.showJoin = true
		},
		
		addSave(){
			let obj = this.groupInfo
			obj.fav_nums++
			this.groupInfo = obj
		},
		cancelSave(){
			let obj = this.groupInfo
			obj.fav_nums--
			this.groupInfo = obj
		},
		
		gotoCollections(index){
			
			uni.navigateTo({
				url:"/groupInfo/collectionsDetail/collectionsDetail?type=" + index
			})
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
	.total-collection{
		text-align: center;
		color:rgba(52, 152, 219,0.8);
		font:{
			size: 1.3em;
			weight:bold;
		}
	}
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
		height: 125%;
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
					margin: 10upx 0 0 40upx;
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
							size: 32upx;
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
		width: 70%;
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
