<template>
	<view>
		<uni-nav-bar left-icon="back" title="任务详情" @clickLeft="clickLeft"></uni-nav-bar>
		<view class="TaskName">
			<text class="eosfont">&#xe627;</text>
			<text class="TaskName-title">{{ TaskName }}</text>
			
		</view>
		<view class="main">
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
								<text>{{ row.name }}</text>
							</view>
						</view>
						<scroll-view scroll-y="true" class="list" :style="{height:scrollHeight}">
							<view class="memberList">
								<view class="memberList-item" v-for="(member,idx) in groupMembers" :key="idx">
									<view class="memberList-item-left">
										<kp-avatar :image="member.avatar" size="large" mode="aspectFill" @tap="handleOpenCommunity(row)" />
										<text>{{ member.name }}</text>
									</view>
									<view class="memberList-item-right" @click="addJoinedMember(idx,member)"><text class="eosfont">&#xe715;</text></view>
								</view>
							</view>
						</scroll-view>
					</view>
				</view>
			</slot>
		</uni-popup>
	</view>
</template>

<script>
import lvSelect from '@/components/lv-select/lv-select.vue';
import KpAvatar from '@/components/kp-avatar/index.vue';
import uniPopup from '@/components/uni-popup/uni-popup.vue';
import uniCompusButton from '@/components/uni-compus-components/unicompus-button.vue';

export default {
	data() {
		return {
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

			TaskName: '开发任务',
			groupMembers:[{name:"老王",avatar:"https://images.mepai.me/app/activity/211/38224/a_5aa7297480979/05aa72975372c0.jpg!1200w.jpg"}],
			joinedPeopleList: [{ name: '小明', avatar: 'https://images.mepai.me/app/activity/211/38224/a_5aa7297480979/15aa729753727f.jpg!1200w.jpg'}]
		};
	},
	methods: {
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
