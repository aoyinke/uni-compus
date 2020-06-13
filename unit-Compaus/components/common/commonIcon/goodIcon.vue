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
		inject:['activity'],
		data() {
			return {
				isGood:this.activity.item.like_status,
				activity_id:this.activity.item.id,
				contentIndex:this.$props.contentIndex
				
			};
		},
		methods:{
			async Good(){
				this.isGood = true
				this.$emit("addGood")
				
				let type = 100
				switch(this.contentIndex){
					case 0:
						type = 100
						break;
					case 1:
						type = 200
						break;
					case 2:
						type = 400
						break;
				}
				await this.request('v1/like/activity',{activity_id:this.activity_id,type},'POST')

				
			},
			async notgood(){
				this.isGood = false
				this.$emit("cancelGood")
				let type = 100
				switch(this.contentIndex){
					case 0:
						type = 100
						break
					case 1:
						type = 200
						break
					case 2:
						type = 400
						break
				}
				await this.request('v1/like/cancelActivty',{activity_id:this.activity_id,type},'POST')
				
			}
		},
		props:{
			
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
