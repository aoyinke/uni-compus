<template>
	<view class="container">
		<uni-nav-bar left-icon="back" title="Login" @clickLeft="clickLeft" background-color="#6495ED"></uni-nav-bar>
		<view class="topBar">
			<image src="../../static/logo.jpg" mode=""></image>
		</view>
		<view class="main">
			<form @submit="formSubmit" @reset="formReset" class="form">
				<view class="input">

					<view class="account">
						<view class="disign">
							<text class="eosfont">&#xe602;</text>
							<input type="text" value="" placeholder="请输入账号" />
						</view>
						<view class="account-bottom"></view>
					</view>
					<view class="password">
						<view class="disign">
							<text class="eosfont">&#xe608;</text>
							<input type="text" value="" password="true" placeholder="请输入密码" />
						</view>
						<view class="password-bottom"></view>
					</view>
				</view>
				<button type="primary" class="confirmLogin" size="30">登录</button>
				<view class="gotoRegister">
					还没有账号?
					<text>那快来注册吧</text>
				</view>
			</form>
		</view>

		<view class="footer">
			<view class="line">
				<text>第三方登录</text>
			</view>
			<view class="otherLogin">
				<image src="" mode=""></image>
				<image src="" mode=""></image>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				backgroundColor: "#6495ED"
			};
		},
		methods: {
			clickLeft() {
				uni.navigateTo({
					url:"../index/index",
					animationType:'fade-in',
					animationDuration:500
				})
			}
		},
		onLoad(options) {
			
			
			
		}
	}
</script>

<style lang="scss" scoped>
	.topBar {
		background-color: #6495ED;
		height: 30vh;

		image {
			top: 15%;
			right: 40%;
			position: absolute;
			height: 150upx;
			width: 150upx;
			border-radius: 50%;
		}
	}

	.account-bottom,
	.password-bottom {
		margin-top: 10upx;
		border-bottom: 2upx solid #EEEEEE;
	}

	.main {
		position: absolute;
		top: 38%;
		width: 90%;
		right: 5%;
		margin: auto 0;
		box-shadow: 2upx 10upx 10upx 5upx #EEEEEE;
		background-color: #fff;
		z-index: 100;

		.confirmLogin {
			background-color: #6495ED;
			box-shadow: 2upx 2upx 2upx 2upx #EEEEEE;
			width: 80%;
			border-radius: 20upx;

			text {
				font-size: 30upx;
			}
		}

		.account,
		.password {
			.disign{
				display: flex;
				align-items: center;
				justify-content: center;
				width: 100%;
				input {
					
					margin: 30upx;
				}
				text{
					
				}
			}
			

		}

		.input {
			margin: 100upx 30upx;
		}

		.gotoRegister {
			display: flex;
			justify-content: flex-end;
			margin: 20upx 0;

			text {
				color: orange;
			}
		}
	}

	.footer {
		position: absolute;
		bottom: -10%;
		height: 20vh;

		.line {
			height: 1px;
			border-top: 1px solid #ddd;
			text-align: center;

			text {
				position: relative;
				top: -12px;
				background: #fff;
				padding: 0 20px;
			}

		}
	}
</style>
