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
			},
			detailUrl:{
				type:String
			}
		},
		methods:{
			handleClick(){
				uni.navigateTo({
					url:this.detailUrl
				})
			}
		}
		
	}
</script>

<style lang="scss">

</style>
