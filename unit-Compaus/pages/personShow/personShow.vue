<template>
	<view class="contaier">
		<uni-nav-bar left-icon="back" title="用户详情" @clickLeft="clickLeft"></uni-nav-bar>
		<person-show-with-bg :userAvatar="userDetail.avatarUrl" :userBg="userDetail.coverUrl" :userName="userDetail.name"></person-show-with-bg>
	</view>
</template>

<script>
	import personShowWithBg from '@/components/common/personShowWithBg.vue'
	export default {
		data() {
			return {
				userDetail:{
					avatarUrl:"../../static/test/avatar.png"
				}
			};
		},
		comments:{
			personShowWithBg
		},
		async mounted() {
			let userDetail = await this.request('users/1/')
			this.userDetail = userDetail[1].data.data
			console.log(this.userDetail)
		},
		methods:{
			clickLeft(){
				uni.navigateBack({
					animationDuration:300,
					animationType:'pop-out'
				})
			},
		}
	}
</script>

<style lang="scss" scoped>

</style>
