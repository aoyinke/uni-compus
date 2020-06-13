<template>
	<view class="goodIcon">
		<template v-if="!isGood">
			<text class="eosfont" @click="Good">&#xe605;</text>
		</template>
		<template v-else>
			<image src="../../../static/common/Good.png" mode="" class="isgood" @click="notgood"></image>
		</template>
	</view>
</template>

<script>
	export default {
		
		data() {
			return {
				isGood:this.needInfo.fav_status
				
			};
		},
		methods:{
			async Good(){
				this.isGood = true
				console.log(this.needInfo)
				this.$emit("addGood")
				let {id,category} = this.needInfo
				

				await this.request('v1/like/likeNeed',{needId:id,category},'POST')

				
			},
			async notgood(){
				this.isGood = false
				this.$emit("cancelGood")
				let {id,category} = this.needInfo

				await this.request('v1/like/dislikeNeed',{needId:id,category},'POST')
				
			}
		},
		props:{
			needInfo:{
				type:Object
			}
		}
	}
</script>

<style lang="scss" scoped>
.isgood{
	width: 60upx;
	height: 60upx;
	margin: 20upx;
	
}
.eosfont{
		font-size: 60upx !important;
	}
</style>
