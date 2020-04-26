<template>
	<view class="chatPages">
		<uni-nav-bar title="聊天"></uni-nav-bar>
		<uni-search-bar :radius="100" @confirm="search" placeholder="搜索你的小伙伴吧"></uni-search-bar>

		<scroll-view scroll-y="true">
			<view class="chatList">
				<block v-for="(chatItem,idx) in chatList" :key="idx">
					<chatItem :userAvatar="chatItem.userAvatar" :sendTime="chatItem.sendTime" :userName="chatItem.userName"
					 :latestInfo="chatItem.latestInfo" :messageNum="chatItem.messageNum"></chatItem>
				</block>

			</view>
		</scroll-view>
	</view>
</template>

<script>
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	import chatItem from '@/components/uni-compus-components/uniCompus-chatItem.vue'
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				
			};
		},
		components: {
			uniSearchBar,
			chatItem
		},
		methods: {
			search() {

			}
		},
		computed:{
			...mapState({
			      chatList: state => state.chatInfo.chatList
			})
			
		},
		onLoad() {
			console.log(this.$store.state.chatInfo.chatList)
		}
	}
</script>

<style lang="scss">

</style>
