<template>
	<view>
		<uni-nav-bar left-icon="back" title="成员管理" @clickLeft="clickLeft"></uni-nav-bar>
		<view class="uni-tab-bar" style="height: 100vh;">
			<scroll-view scroll-y="true" class="list">
				<view class="nav">
					<view class="nav-left"><text class="eosfont">&#xe602;</text></view>

					<view class="nav-center">
						<text @click="navTomember" :class="{ active: currentIndex == 0 }">内部成员</text>
						<text @click="navToapply" :class="{ active: currentIndex == 1 }">加群申请</text>
					</view>
				</view>
				<swiper :current="currentIndex" @change="changePage" class="swiper-box">
					<swiper-item class="member">
						<view class="swiper-item">
							<block v-for="(part, key, index) in groupMembers" :key="index">
								<view class="uni-list-cell uni-list-cell-pd">
									<view class="uni-list-cell-db"><input type="text" :value="key" /></view>

									<view class="manageMember" @click="changejoinedPeople($event, groupMembers[key])"><text class="eosfont">&#xe715;</text></view>
								</view>
								<view class="partMembers">
									<block v-for="(partMember, id) in groupMembers[key]" :key="id">
										<view class="partMember">
											<kp-avatar :image="partMember.avatar" size="large" mode="aspectFill" @tap="handleOpenManage(partMember,key,id)" />
											<text>{{ partMember.nickName }}</text>
											<text>{{ partMember.position }}</text>
										</view>
									</block>
								</view>
							</block>
						</view>
						<uni-compus-button width="100" content="确认修改" @click.native="submitChangeMember" background="#fbc531"></uni-compus-button>
					</swiper-item>
					<swiper-item class="apply">
						<view class="swiper-item">
							<view class="applicant-list">
								<view class="applicant-list-item" v-for="(applicant, idx) in applicantList" :key="idx">
									<view class="applicant-list-item-left">
										<kp-avatar :image="applicant.avatar" size="large" mode="aspectFill" @tap="handleOpenCommunity(row)" />
										<view class="applicant-list-item-left-info">
											<view class="applicant-list-item-left-info-name">
												<text>{{ applicant.name }}</text>
											</view>
											<view class="applicant-list-item-left-info-description">
												<text>{{ applicant.description }}</text>
											</view>
										</view>
									</view>
									<view class="applicant-list-item-right">
										<view class="applicant-list-item-right-aprove">
											<uni-compus-button background="#7ed6df" content="通过" width="100"></uni-compus-button>
										</view>

										<text class="eosfont">&#xe60f;</text>
									</view>
								</view>
							</view>
						</view>
					</swiper-item>
				</swiper>
			</scroll-view>
		</view>
		<uni-popup ref="popup" type="bottom">
			<slot>
				<view class="choosejoinedPeople">
					<view class="uni-tab-bar">
						<view class="choosejoinedPeople-title"><text>成员调整</text></view>
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
								<text>{{ row.position }}</text>
								<view class="close-view" @click="removeJoined(index)">x</view>
							</view>
						</view>
						<scroll-view scroll-y="true" class="list" :style="{ height: scrollHeight }">
							<view class=""><text>未分配的人</text></view>
							<view class="memberList">
								<view class="memberList-item" v-for="(member, idx) in otherPeople" :key="idx">
									<view class="memberList-item-left">
										<kp-avatar :image="member.avatar" size="large" mode="aspectFill" @tap="handleOpenCommunity(row)" />
										<text>{{ member.nickName }}</text>
										<text>{{ member.position }}</text>
									</view>
									<view class="memberList-item-right" @click="addJoinedMember(idx, member)"><text class="eosfont">&#xe715;</text></view>
								</view>
							</view>
						</scroll-view>
					</view>
				</view>
			</slot>
		</uni-popup>
		<uni-popup ref="updateMember" type="bottom">
			<slot>
				<view class="updateMemberInfo">
					<view class="updateMemberInfo-left">
						<view class="uni-list-cell uni-list-cell-pd" @click="updateMemberAuth">
							<view class="uni-list-cell-db" style="font-weight: 500;">权限等级</view>
							<text>{{member.auth}}</text>
						</view>
						 
					</view>
					<view class="updateMemberInfo-right">
						<view class="uni-list-cell uni-list-cell-pd">
							<view class="uni-list-cell-db" style="font-weight: 500;">职位名称</view>
							<input type="text" v-model="member.position" style="text-align: right;"/>
						</view>
						
					</view>
				</view>
				<uni-compus-button width="100" content="确认修改" @click.native="confirmChangeMemberInfo" background="#fbc531"></uni-compus-button>
			</slot>
		</uni-popup>
		<w-picker
		      :visible.sync="visible"
		      mode="selector"
		      :value="member.auth"
		      default-type="auth"
		      :default-props="defaultProps"
		      :options="authList"
		      @confirm="confirmChangeAuth($event,'selector')"
		      
		      ref="selector" 
		  ></w-picker>
	</view>
</template>

<script>
import lvSelect from '@/components/lv-select/lv-select.vue';
import KpAvatar from '@/components/kp-avatar/index.vue';
import uniPopup from '@/components/uni-popup/uni-popup.vue';

export default {
	async onLoad(){
		let raw_members = await this.request('v1/group/getGroupByMember?groupId=1')
		this.groupMembers = raw_members[1].data
		
		let raw_applicants = await this.request('v1/group/getApplicantList?groupId=1')
		console.log(raw_applicants)
	},
	
	data() {
		return {
			member:{},
			authList:[{auth:'社长权限',value:16},{auth:'部长权限',value:8},{auth:'成员权限',value:4}],
			defaultProps:{"label":"auth","value":"value"},
			
			applicantList: [{ avatar: 'https://lz.sinaimg.cn/osj1080/967d9727ly3gd46iout75j20vz1kw4qp.jpg', name: 'paradiseButcher', description: '最牛逼的人' }],
			currentIndex: 0,
			scrollHeight: '500rpx',
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

			groupMembers: {},
			joinedPeopleList: [],
			otherPeople: [{ name: '小白', avatar: 'https://img.pixbe.com/p47810601/E124CB219C59429A82FB9443D28EFF4C_640.jpg' }]
		};
	},
	components: {
		KpAvatar,
		uniPopup,
		lvSelect,
		
	},
	methods: {
		submitChangeMember(){
			
		},
		updateMemberAuth(){
			this.$refs.selector.show()
		},
		handleOpenManage(member,key,id){
			
			let targetMemeber = this.groupMembers[key][id]
			this.member = {...member,index:id}
			this.$refs.updateMember.open()
		},
		confirmChangeAuth(item){
			console.log(item)
			this.member.auth = item.result
		},
		confirmChangeMemberInfo(){
			let {department,index} = this.member
			
			this.groupMembers[department][index] = this.member
			this.request('v1/group/changeMemberAuth',this.member,'POST')
			this.$refs.updateMember.close()
		},
		
		
		removeJoined(index) {
			this.joinedPeopleList.splice(index, 1);
		},
		changejoinedPeople(e, part) {
			this.joinedPeopleList = part;
			console.log(e);
			console.log(part);
			this.$refs.popup.open();
		},
		addJoinedMember(index, member) {
			this.otherPeople.splice(index, 1);
			this.joinedPeopleList.push(member);
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
		navTomember() {
			this.currentIndex = 0;
		},
		navToapply() {
			this.currentIndex = 1;
		},
		changePage(e) {
			this.currentIndex = e.detail.value;
		}
	}
};
</script>

<style lang="scss" scoped>
@import './index.scss';
.partMembers {
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	flex-wrap: wrap;
	.partMember {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		margin-bottom: 10rpx;
		text {
			color: #718093;
			font-size: 24rpx;
		}
	}
}
.applicant-list {
	&-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx;
		&-left {
			display: flex;
			&-info {
				margin-left: 20rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				&-name {
					font: {
						weight: 500;
						size: 32rpx;
					}
				}
				&-description {
					color: #dcdde1;
				}
			}
		}
		&-right {
			display: flex;
			align-items: center;
			&-aprove {
			}
		}
	}
}
.manageMember {
	color: rgba(37, 204, 247, 1);
	width: 17%;
	text-align: center;
}
.nav {
	display: flex;
	align-items: center;
	&-left {
		color: rgba(254, 211, 48, 1);
	}
	&-center {
		margin-left: 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-around;
		width: 45%;
	}
}
.active {
	transform: scale(1.2);
	transition: 1s;
	color: #000000;
	font-weight: bold;
	border-bottom: 4upx solid #000000;
	padding-bottom: 5upx;
}
</style>
