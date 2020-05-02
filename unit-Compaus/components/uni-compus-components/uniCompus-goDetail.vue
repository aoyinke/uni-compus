<template>
	<view @click="handleClick">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		props:{
			item:{
				type:Object
			},
			detailUrl:{
				type:String
			}
		},
		methods:{
			
			handleClick(){
				console.log(this.item)
				uni.navigateTo({
					url:`${this.detailUrl }?item=${encodeURIComponent(JSON.stringify(this.item))}`
				})
			}
		}
		
	}
</script>

<style lang="scss">

</style>
