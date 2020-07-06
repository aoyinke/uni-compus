<template>
	<view class="likeIcon">
		<template v-if="!isStore">
			<text class="eosfont like" @click="store">&#xe66c;</text>
		</template>
		<template v-else>
			<image src="../../../static/common/like.png" mode="" class="icon-active" @click="cancelStore"></image>
		</template>
	</view>
</template>

<script>
	export default {
		inject:['activity'],
		data() {
			return {
				isStore: false,
				activity_id:0,
				contentIndex:0,
				groupId:0,
				
			};
		},
		mounted() {
			if(this.activity.item){
				this.isStore = this.activity.item.save_status
				this.activity_id = this.activity.item.id
				this.contentIndex = this.$props.contentIndex
				this.groupId = this.activity.item.groupId
			}
			
		},
		methods: {
			async store() {
				this.isStore = true
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
				
				await this.request(this.likeUrl,{activity_id:this.activity_id,type,groupId:this.groupId},'POST')
				

			},
			cancelStore(){
				this.isStore = false
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
				
				this.request(this.dislikeUrl,{activity_id:this.activity_id,type,groupId:this.groupId},'POST')
			}

		},
		props: {
			activityId: {
				type: Number,
				
			},
			likeUrl:{
				type:String,
				default:'v1/saved/saveCommunity'
			},
			dislikeUrl:{
				type:String,
				default:'v1/saved/cancelSavedCommunity'
			}
		}
	}
</script>

<style lang="scss" scoped>
	.like {
		font-size: 50upx !important;
		transition: 1s;
	}
	.like:hover{
		width: 60upx;
		height: 60upx;
	}

	.icon-active {
		width: 50upx;
		height: 50upx;
		transform: scale3d(1.1);
	}
</style>
