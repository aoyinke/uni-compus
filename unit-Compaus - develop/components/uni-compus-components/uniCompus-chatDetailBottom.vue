<template>
	<view class="bottomBar">
		<view class="bottomBar-left cont">
			<text class="eosfont" >&#xe64f;</text>
		</view>
		<view class="bottomBar-input">
			<input type="text" value="" v-model="Msg" @confirm="sendMsg(Msg)"/>
		</view>
		<view class="bottomBar-right  cont">
			<text class="eosfont">&#xe671;</text>
			<text class="eosfont">&#xe715;</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Msg:''
			};
		},
		methods:{
			sendMsg(Msg){
				this.$emit("sendMsg",Msg)
				this.Msg = ''
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cont{
		margin: 15upx;
	}
	.eosfont{
		font-size: 50upx;
	}
	.bottomBar{
		display: flex;
		align-items: center;
		border-top: 1px solid #dfe4ea;
		background-color: #dfe4ea;
		font-size: 30upx;
		
		&-left{
			width: 60upx;
			text-align: center;
		}
		&-input{
			flex: 1;
			background-color:#fff;
			margin: 5px 0;
			input{
				height: 2.4rem;
			}
		}
		&-right{
			width: 140upx;
			text-align: center;
			:nth-child(2){
				margin-left: 15upx;
			}
		}
	}
</style>
