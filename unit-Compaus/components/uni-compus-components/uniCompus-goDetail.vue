<template>
	<view @click="handleClick">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		props:{
			activityType:{
				type:Number
			},
			activityID:{
				type:Number
			},
			activityCategory:{
				type:Number
			}
		},
		methods:{
			handleClick(){
				uni.navigateTo({
					url:"/pages/activityDetail/activityDetail"
				})
			}
		}
		
	}
</script>

<style lang="scss">

</style>
