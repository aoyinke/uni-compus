<template>
	<view class="container">
		<uni-nav-bar left-icon="back" left-text="返回"  title="修改个人信息" @clickLeft="clickLeft"></uni-nav-bar>
		<view class="changePerson">
			<view class="changePerson_avatar">
				<view class="change_choice">
					<text>头像</text>
				</view>
				<view class="avatar middle">
					<image src="../../static/test/1.jpg" mode=""></image>
				</view>
				<view class="change">
					<image src="../../static/self/pencil.png" mode=""></image>
				</view>
			</view>

			<view class="changePerson_name">
				<view class="change_choice">
					<text>昵称</text>
				</view>
				<view class="userName middle">
					<text>{{userInfo.userName}}</text>
				</view>
				<view class="change">
					<image src="../../static/self/pencil.png" mode=""></image>
				</view>
			</view>

			<view class="changePerson_sex">
				<view class="change_choice">
					<text>性别</text>
				</view>
				<view class="userSex middle">
					<text>{{userInfo.userSex}}</text>
				</view>
				<view class="change">
					<image src="../../static/self/pencil.png" mode=""></image>
				</view>
			</view>

			<view class="changePerson_birthday">
				<view class="change_choice">
					<text>生日</text>
				</view>
				<view class="userBirthday middle">
					<text>{{userInfo.userBirthday}}</text>
				</view>
				<view class="change">
					<image src="../../static/self/pencil.png" mode=""></image>
				</view>
			</view>

			<view class="changePerson_loveState">
				<view class="change_choice">
					<text>情感</text>
				</view>
				<view class="loveState middle">
					<text>{{userInfo.loveState}}</text>
				</view>
				<view class="change">
					<image src="../../static/self/pencil.png" mode=""></image>
				</view>
			</view>

			<view class="changePerson_job">
				<view class="change_choice">
					<text>职业</text>
				</view>
				<view class="userJob middle">
					<text>{{userInfo.job}}</text>
				</view>
				<view class="change">
					<image src="../../static/self/pencil.png" mode=""></image>
				</view>
			</view>

			<view class="changePerson_hometown">
				<view class="change_choice">
					<text>家乡</text>
				</view>
				<view class="userName middle">
					<text>{{userInfo.hometown}}</text>
				</view>
				<view class="change">
					<image src="../../static/self/pencil.png" mode=""></image>
				</view>
			</view>
		</view>
		<button type="primary" size="32">完成</button>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-icons/uni-icons.vue'
	export default {
		data() {
			return {
				userInfo: {
					userName: "天堂屠夫",
					hometown: "江苏省-常州市-天宁区",
					job: "学生",
					loveState: "恋爱中",
					userSex: "男",
					avatar: "static/test/avatar.png",
					userBirthday: "2000-8-28"
				}
			};
		},
			
		components:{
			
		},
		methods:{
			clickLeft(){
				uni.navigateBack({
					animationDuration:300,
					animationType:'pop-out'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.change {
		width: 30upx;
		height: 30upx;

	}

	.changePerson {
		margin: 30upx;
	}

	.changePerson_avatar,
	.changePerson_sex,
	.changePerson_name,
	.changePerson_birthday,
	.changePerson_hometown,
	.changePerson_job,
	.changePerson_loveState {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 30upx 0;

		.change_choice {
			color: #708090;
			font-size: 35upx;
			font-weight: bold;
		}

		.change image {
			width: 50upx;
			height: 50upx;
			margin-top: -10upx;
		}


	}

	.avatar image {
		width: 80upx;
		height: 80upx;
		border-radius: 50%;

	}

	.middle {
		margin-right: -260upx;
	}
</style>
