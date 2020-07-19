<template>
	<view>
		<view class="filterBar">
			<view class="filterBar-title">
				<text>{{title}}  ({{singleChoices ? '单选' : '多选'}})</text>
			</view>
			<view class="filterBar-Choices">
				<view class="filterBar-Choices-item" v-for="(choice,idx) in choices" :key="idx" :class="{itemSelected:selected.indexOf(choice) != -1}" @tap="selectedChoice(choice)">
					<text>{{choice}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				selected:[]
			};
		},
		computed:{
			
		},
		methods:{
			selectedChoice(choice){
				if(this.selected.indexOf(choice) == -1){
					this.selected.push(choice)
				}else{
					this.selected.splice(this.selected.indexOf(choice), 1); //取消
				}
				
				
				
			}
		},
		props:{
			choices:{
				type:Array
			},
			title:{
				type:String
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	.filterBar{
		&-title{
			margin: 20upx 10upx 10upx 10upx; 
		}
		&-Choices{
			display: flex;
			justify-content: space-evenly;
			align-items: center;
			flex-wrap: wrap;
			&-item{
				background-color: #dfe4ea;
				margin: 10upx;
				width: 25%;
				border: 1px solid #eee;
				text-align: center;
				border-radius: 10px;
				padding: 5px;
			}
		}
	}
	.itemSelected{
		background-color: #fff;
		border: 1px solid #ff7f50;
		color: #ff7f50;
	}
</style>
