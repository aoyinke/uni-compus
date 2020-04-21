<template>
	<view class="container">
		<view class="title">
			<text>{{title}}</text>
		</view>
		<view class="showBar">
			<view class="showBar-cards">
				<avatar v-for="(group,idx) in myGroups" :imgSrc="group.src" :name="group.name" :circle="group.circle"></avatar>
			</view>
			<slot></slot>
		</view>
	</view>
</template>

<script>
	import avatar from './uniCompus-avatar.vue'
	export default {
		data() {
			return {
				
			};
		},
		props:{
			title:{
				type:String,
				required:true
			},
			myGroups:{
				type:Array,
				required:true
			}
			
		},
		components:{
			avatar
		}
	}
</script>

<style lang="scss">
	.container{
		.title{
			border-bottom: 1px solid #ecf0f1;
			box-shadow: 2px 2px 2px 2px rgba(0,0,0,0.1);
			text{
				margin-left: 20upx;
				font-size: 40upx;
				font-weight: 500;
			}
		}
		.showBar{
			margin-top: 20upx;
			.showBar-cards{
				display: flex;
				justify-content: space-evenly;
				align-items: center;
			}
		}
	}
	
</style>
