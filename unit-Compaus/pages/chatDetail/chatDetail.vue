<template>
	<view class="contaier">
		<uni-nav-bar title="轻松一校交流群" left-icon="back" @clickLeft="clickLeft"></uni-nav-bar>
		<scroll-view scroll-y="true" :style="{height:srollHeight + 'px'}" class="chatBar">
			<view class="chatBar-others">
				<block v-for="(otherMsg,id) in otherMsgs" :key="id">
					<view class="chatItem">
						<chatOtherLeft :otherAvatar="otherMsg.avatar" :otherMsg="otherMsg.msg"></chatOtherLeft>
					</view>
					
				</block>
			</view>
			<view class="chatBar-user">
				<block v-for="(userMsg,idx) in userMsgs" :key="idx">
					<chatUserRight :userAvatar="userMsg.avatar" :userMsg="userMsg.msg"></chatUserRight>
					<view class="chatItem">
						
					</view>
					
				</block>
			</view>
		</scroll-view>
		
		<view class="bottom">
			<chatBottomBar @confirm="sendMsg"></chatBottomBar>
		</view>
	</view>
</template>

<script>
	import chatBottomBar from '@/components/uni-compus-components/uniCompus-chatDetailBottom.vue'
	import chatUserRight from '@/components/uni-compus-components/uniCompus-chatUser-right.vue'
	import chatOtherLeft from '@/components/uni-compus-components/uniCompus-chatOther-left.vue'
	export default {
		data() {
			return {
				srollHeight: 0,
				userMsgs: [{
					avatar: "../../static/test/waterfull/2.jpg",
					msg: "很多时候，不是你不好，而是你遇到的人不对。在乎你的人，你怎么样都行，讨厌你的人，你再好都不行。人活着，难调众人之口，不管你做得多好，总有人不满意，不管你行得多正，总有人挑毛病。别在意他人的看法，时间会给出最好的证明。懂你的人，即使不言不语，也能心知意会，不懂你的，即使喋喋不休，也难解释清楚。你唯一要做的，就是心态放平，做好自己。"
				}],
				otherMsgs:[{
					avatar: "../../static/test/waterfull/2.jpg",
					msg: "很多时候，不是你不好，而是你遇到的人不对。在乎你的人，你怎么样都行，讨厌你的人，你再好都不行。人活着，难调众人之口，不管你做得多好，总有人不满意，不管你行得多正，总有人挑毛病。别在意他人的看法，时间会给出最好的证明。懂你的人，即使不言不语，也能心知意会，不懂你的，即使喋喋不休，也难解释清楚。你唯一要做的，就是心态放平，做好自己。"
				},
				{
					avatar: "../../static/test/waterfull/2.jpg",
					msg: "hello world"
				}
				],
				rightTop:0,
				leftTop:0
			};
		},
		components: {
			chatBottomBar,
			chatUserRight,
			chatOtherLeft
		},
		methods: {
			clickLeft() {
				uni.navigateBack({
					animationDuration: 300,
					animationType: 'pop-out'
				})
				console.log(this.$refs)
			},
			sendMsg(msg) {
				this.userMsgs.push(msg)
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					let height = res.windowHeight - uni.upx2px(290)
					this.srollHeight = height
				}
			})

		},
		mounted(){
			
		}
	}
</script>

<style lang="scss" scoped>
	@mixin chatArea {
		width: 100%;

	}
	.chatItem{
		display: block;
	}
	.bottom {
		position: absolute;
		bottom: 0;
		width: 100%;
	}

	.chatBar {
		background-color: #d1ccc0;
		position: relative;
		
		.chatBar-others {
			@include chatArea;


		}

		.chatBar-user {
			@include chatArea;
			display: flex;
			justify-content: flex-end;

		}

	}
</style>
