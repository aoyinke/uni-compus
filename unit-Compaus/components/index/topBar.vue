<template>
	<view class="block">
		<view class="block-item" v-for="(block,idx) in blocks" :key="idx" @click="active(idx)" :class="activeBlock==idx ?  'active' : '' ">
			<avtar :imgSrc="block.src" :name="block.type"></avtar>
		</view>
	</view>
</template>

<script>
	import avtar from '../uni-compus-components/uniCompus-avatar.vue'
	export default{
		data(){
			return{
				activeBlock:0,
				blocks:[
					{type:'活动',src:"../../static/index/MyActivity.png",color:'yellow'},
					{type:'动态',src:"../../static/index/activity.png",color:'blue'},
					{type:'问答',src:"../../static/index/answer.png",color:'orange'},
					{type:'知识',src:"../../static/index/knowledge.png",color:'pink'}
					]
			}
		},
		methods:{
			active(index){
				this.activeBlock = index
				
			}
		},
		components:{
			avtar
		}
	}
</script>

<style scoped lang="scss">
	.block{
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		
		margin: 20upx 0;
		&-item{
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			image{
				height: 70upx;
				width: 70upx;
			}
			text{
				font-size: 30upx;
				font-weight: bold;
			}
		}
	}
	
	.active{
		
	}
</style>
