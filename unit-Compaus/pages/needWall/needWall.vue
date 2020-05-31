<template>
	<view>
		<uni-nav-bar>
			<view class="publishNeed" slot="left" @click="gotoPublishNeed">
				<text class="eosfont pencil">&#xe669;</text>
				
			</view>
		</uni-nav-bar>
		<view style="">
			<lv-select
				@handleSearch="handleSearch"
				@change="change"
				placeholder="只找你需要的~"
				:infoList="infoList"
				:showValue="showValue"
				v-model="searchValue"
				:loading="loading"
				type="primary"
				:uniShadow="true"
			></lv-select>
		</view>
		<view class="nav">
			<view class="nav-item" :class="{ 'nav-active': id === currentIndex }" v-for="(navContent, id) in nav" :key="id" @tap="changeNav(id)">
				<text>{{ navContent }}</text>
			</view>
		</view>

		<view class="uni-tab-bar" :style="{height:needHeight + 'px'}">
			<scroll-view scroll-y="true" class="list">
				<swiper :current="currentIndex" class="swiper-box" @change="changeCurrentIndex">
					<swiper-item>
						<view class="swiper-item">
							<view class="need-List">
								<view class="need-item" v-for="(needInfo,id) in needList" :key="id">
									<user-top-bar :groupInfo="needInfo.userInfo" :needCategory="false"></user-top-bar>
									<view class="need-item-main">
										<view class="need-item-main-left">
											<view class="need-item-main-left-title">
												<text class="eosfont title">&#xe640;</text>
												<text>{{ needInfo.title }}</text>
											</view>
											<view class="need-item-main-left-content">
												<text class="text-line-4">{{ needInfo.content }}</text>
											</view>
										</view>
										<view class="need-item-main-right">
											<like-icon></like-icon>
											<text>{{needInfo.like_nums}}</text>
										</view>
									</view>
								</view>
							</view>
						</view>
					</swiper-item>
				</swiper>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import lvSelect from '@/components/lv-select/lv-select.vue';
import userTopBar from '@/components/activity/userTopBar.vue';
import likeIcon from '@/components/common/commonIcon/likeIcon.vue';
export default {
	watch:{
		currentIndex:async function(oldVal,newVal){
			let cateogry = this.nav[oldVal]
			let needList = await this.request(`v1/needWall/needList?currentPage=${1}&&category=${cateogry}`)
			this.needList = needList[1].data
			console.log(needList)
		}
	},
	components: {
		lvSelect,
		userTopBar,
		likeIcon
	},
	data() {
		return {
			needHeight:0,
			currentIndex: 0,
			nav: ['众投活动', '大佬赞助', '技能需求'],
			
			needList:[],
			needInfo: {  college: '上海海事大学',logo:"https://lz.sinaimg.cn/orj1080/967d9727ly3gc0whyfofkj20sg0sg4av.jpg" 
			,like_nums:0, title: '一起来玩啊！', content: '招募一只皮皮虾作为镇宅神兽' },
			
			loading: false,
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
			]
		};
	},
	methods: {
		changeCurrentIndex(e){
			this.currentIndex = e.detail.value
		},
		changeNav(id) {
			this.currentIndex = id;
		},
		gotoPublishNeed() {},
		handleSearch() {
			this.loading = true;
			setTimeout(() => {
				this.loading = false;
				this.infoList = this.infoLists;
			}, 2000);
		},
		change(val) {
			console.log(val);
		}
	},
	async onLoad(){
		uni.getSystemInfo({
			success: res => {
				let height = res.windowHeight - uni.upx2px(145.2);
				this.needHeight = height;
			}
		});
		let needList = await this.request(`v1/needWall/needList?currentPage=${1}&&category=${'众投活动'}`)
		this.needList = needList[1].data
		console.log(this.needList)
	},
};
</script>

<style lang="scss" scoped>
.pencil{
	color: rgba(253, 150, 68,1.0);
	font-size: 2.5em;
}
@mixin elementCenter {
	display: flex;
	justify-content: center;
	align-items: center;
}
.need-List{
	.need-item{
		
		border-bottom: 2rpx solid #EEEEEE;
		padding-bottom: 5rpx;
		&-main{
			display: flex;
			align-items: center;
			min-height: 300rpx;
			&-left{
				height: 250rpx;
				flex: 1;
				background-color: rgba(204, 174, 98,1.0);
				&-title{
					@include elementCenter;
					text{
						font-weight: 600;
						font-size: 1.2em;
					}
				}
				&-content{
					@include elementCenter;
				}
			}
			&-right{
				height: 250rpx;
				width: 15%;
				@include elementCenter;
				flex-direction: column;
			}
		}
	}
}
.nav-active {
	color: #706fd3 !important;
	transition: 1s;
	transform: scale(1.2);
	border-bottom: 4px solid #fed330;
	font-weight: bold;
	padding-bottom: 15rpx;
}
.nav {
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	box-shadow: 2px 2px 2px #f7f1e3;
	margin: 20rpx 0;
	&-item {
		color: #d1d8e0;
	}
}
</style>
