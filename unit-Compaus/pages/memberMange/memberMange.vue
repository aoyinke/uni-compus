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
									<view class="uni-list-cell-db"><text>{{key}}</text></view>

									<view class="manageMember" @click="changejoinedPeople($event, groupMembers[key],key)"><text class="eosfont">&#xe715;</text></view>
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
								<block v-for="(applicant, idx) in applicantList" :key="idx">
									<view class="applicant-list-item" >
										<view class="applicant-list-item-left">
											<kp-avatar :image="applicant.avatar" size="large" mode="aspectFill" @tap="handleOpenCommunity(row)" />
											<view class="applicant-list-item-left-info">
												<view class="applicant-list-item-left-info-name">
													<text>{{ applicant.nickname }}</text>
												</view>
											</view>
										</view>
										<view class="applicant-list-item-right">
											<view class="applicant-list-item-right-aprove">
												<uni-compus-button background="#7ed6df" content="通过" width="100" @click.native="approveJoin"></uni-compus-button>
											</view>

											<text class="eosfont" @click="declineJoin">&#xe60f;</text>
										</view>
									</view>
									<view class="applicant-reason">
										
										<text>{{applicant.reason}}</text>
										
									</view>
							</block>
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
						<view class="choosejoinedPeople-title">
							<input type="text" v-model="currentAdujstDepatment" />
							<view class="">
								<uni-compus-button width="80" content="确认修改名称" @click.native="confirmChangeDeartment" background="#2ecc71"></uni-compus-button>
							</view>
							
						</view>
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
				<uni-compus-button width="100" content="移出小组" @click.native="removeFromGroup" background="#eb4d4b"></uni-compus-button>
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
	async onLoad(item){
		let {groupId} = item
		let raw_members = await this.request('v1/group/getGroupByMember?groupId=' + groupId)
		this.groupMembers = raw_members[1].data
		console.log("raw_members",raw_members)
		let raw_applicants = await this.request('v1/group/getApplicantList?groupId=' + groupId)
		console.log("raw_applicants",raw_applicants)
	},
	watch:{
		
	},
	data() {
		return {
			member:{},
			authList:[{auth:'社长权限',value:16},{auth:'部长权限',value:8},{auth:'成员权限',value:4}],
			defaultProps:{"label":"auth","value":"value"},
			currentAdujstDepatment:"",
			oldKey:"",
			
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
		removeFromGroup(){
			let {uid,groupId} = this.member
			uni.showModal({
				title:"移除成员",
				content:"你确定要移除该成员吗？",
				success: (res) => {
					if(res.confirm){
						this.request('v1/group/removeFromGroup',{groupId,uid},'POST').then(res=>{
							this.joinedPeopleList.splice(this.member.index,1)
						})
					}
				}
			})
			
		},
		submitChangeMember(){
			console.log(this.groupMembers)
			this.request('v1/group/updateMember',this.groupMembers,'POST').then(res=>{
				console.log(res)
			})
		},
		
		approveJoin(info){
			
		},
		declineJoin(info){
			
		},
		
		changeDepartment(e){
			this.newKey = e.detail.value
			
		},
		confirmChangeDeartment(){
			let members = this.groupMembers[this.oldKey]
			console.log("this.oldKey",this.oldKey)
			console.log("this.currentAdujstDepatment",this.currentAdujstDepatment)
			if(this.oldKey == this.currentAdujstDepatment){
				uni.showToast({
					title:"并无修改",
					icon:"none"
				})
			}else{
				uni.showModal({
					title:"修改部门名称",
					content:"确认修改？",
					success: (res) => {
						console.log(this.currentAdujstDepatment)
						if(res.confirm){
							this.request('v1/group/updateMemberDepartment',members,'POST').then(res=>{
								uni.showToast({
									title:"修改成功"
								})
							})
						}
						
					}
				})
			}
			
			
		},
		getOldKey(key){
			
		},
		updateMemberAuth(){
			this.$refs.selector.show()
		},
		handleOpenManage(member,key,id){
			console.log(key)
			let targetMemeber = this.groupMembers[key][id]
			this.member = {...member,index:id}
			this.oldKey = key
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
			this.otherPeople = [].concat(this.otherPeople,this.joinedPeopleList.splice(index, 1))
		},
		changejoinedPeople(e, part,department) {
			this.joinedPeopleList = part;
			console.log(e);
			console.log(part);
			console.log(department)
			this.currentAdujstDepatment = department
			this.$refs.popup.open();
		},
		addJoinedMember(index, member) {
			this.otherPeople.splice(index, 1);
			member.department = this.currentAdujstDepatment
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
.applicant-reason{
	padding: 20rpx;
	box-shadow: 3px 2px 2px 2px #EEEEEE;
	
}
.applicant-list {
	&-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx;
		border-bottom:1px solid #EEEEEE;
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
