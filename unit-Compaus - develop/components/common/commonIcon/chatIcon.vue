<template>
	<view class="chatIcon">
		<text class="eosfont" @click="goChat">&#xe69a;</text>
	</view>
</template>

<script>
	export default {
		
		data() {
			return {
				
			};
		},
		methods:{
			goChat(){
				if(!this.alreadyInDetail){
					uni.navigateTo({
						url:'/pages/activityDetail/activityDetail'
					})
					this.alreadyInDetail = true
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.eosfont{
		font-size: 50upx !important;
	}
</style>
