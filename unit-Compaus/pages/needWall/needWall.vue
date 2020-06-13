<template>
	<view>
		<uni-nav-bar>
			<view class="publishNeed" slot="left" @click="gotoPublishNeed"><text class="eosfont pencil">&#xe669;</text></view>
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
			<view class="nav-item" :class="{ 'nav-active': id == currentIndex }" v-for="(navContent, id) in nav" :key="id" @tap="changeNav(id)">
				<text>{{ navContent }}</text>
			</view>
		</view>

		<view class="uni-tab-bar" :style="{ height: needHeight + 'px' }">
			<scroll-view scroll-y="true" class="list">
				<swiper :current="currentIndex" class="swiper-box" @change="changeCurrentIndex">
					<swiper-item v-for="(tag,index) in nav" :key="index">
						<view class="swiper-item">
							<view class="need-List">
								<view class="need-item" v-for="(needInfo, id) in needList" :key="id">
									<user-top-bar :groupInfo="needInfo.userInfo" @click.native="toUserDetail(needInfo.uid)"></user-top-bar>
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
											<good-icon :needInfo="needInfo" @addGood="addGood(id)" @cancelGood="cancelGood(id)"></good-icon>
											<text>{{ needInfo.fav_nums }}</text>
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
import goodIcon from '@/components/common/commonIcon/needGood.vue';

export default {
	watch: {
		
	},
	components: {
		lvSelect,
		userTopBar,
		goodIcon
	},
	data() {
		return {
			needHeight: 0,
			currentIndex: 0,
			nav: ['技能需求', '梦想成真', '众投活动'],

			needList: [],
			

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
		async _getList(mm,currentIndex){
			let category = this.nav[currentIndex];
					
			let type = ''
			switch (category) {
				case '众投活动':
					type = 100;
					break
				case '梦想成真':
					type = 101;
					break
				case '技能需求':
					type = 102;
					break
			}
			let needList = await this.request(`v1/needWall/needList?currentPage=${1}&&category=${type}`);
			this.needList = needList[1].data;
			console.log(mm,needList);
		},
		addGood(id){
			let obj = this.needList
			
			console.log(obj[id],id)
			obj[id].fav_nums++
			this.needList = obj
		},
		cancelGood(id){
			let obj = this.needList
			obj[id].fav_nums--
			this.needList = obj
		},
		toUserDetail(uid){
			uni.navigateTo({
				url:`/pages/personShow/personShow?uid=${uid}&personShow=${true}`
			})
		},
		changeCurrentIndex(e) {
			this.currentIndex = e.detail.current;
			console.log(this.currentIndex)
			this._getList("changeCurrentIndex",this.currentIndex)
		},
		changeNav(id) {
			this.currentIndex = id;
			
			this._getList("changeNav",id)
		},
		gotoPublishNeed() {
			uni.navigateTo({
				url:'/pages/publishNeed/publishNeed'
			})
		},
		handleSearch() {
			this.loading = true;
			setTimeout(() => {
				this.loading = false;
				this.infoList = this.infoLists;
			}, 2000);
		},
		change(val) {
			
		}
	},
	async onLoad() {
		uni.getSystemInfo({
			success: res => {
				let height = res.windowHeight - uni.upx2px(145.2);
				this.needHeight = height;
			}
		});
		let needList = await this.request(`v1/needWall/needList?currentPage=${1}&&category=${100}`);
		needList[1].data.logo = this.needList = needList[1].data;
		
	}
};
</script>

<style lang="scss" scoped>
.pencil {
	color: rgba(253, 150, 68, 1);
	font-size: 2.5em;
}
@mixin elementCenter {
	display: flex;
	justify-content: center;
	align-items: center;
}
.need-List {
	.need-item {
		border-bottom: 2rpx solid #eeeeee;
		padding-bottom: 5rpx;
		&-main {
			display: flex;
			align-items: center;
			min-height: 300rpx;
			&-left {
				height: 250rpx;
				flex: 1;
				background-color: rgba(204, 174, 98, 1);
				&-title {
					@include elementCenter;
					text {
						font-weight: 600;
						font-size: 1.2em;
					}
				}
				&-content {
					@include elementCenter;
				}
			}
			&-right {
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
