<template>
	<view class="contaier">
		<view class="coverImg">
			<image :src="src" mode=""></image>
		</view>
		<view class="content">
			<view class="title">
				<text>{{title}}</text>
			</view>
			<view class="partners">
				<text>{{partners}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		computed:{
			partners(){
				return this.partnersArray.join('')
			}
		},
		props:{
			src:{
				type:String,
				required:true
			},
			partnersArray:{
				type:Array,
				required:true
			},
			title:{
				type:String,
				required:true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contaier{
		width: 400upx;
		height: 300upx;
		margin: 20upx;
		.coverImg{
			width: 100%;
			image{
				width: 100%;
				height: 150upx;
			}
			
		}
		.content{
			.title{
				font-weight: 500;
				font-size: .5em;
			}
			.partners{
				
			}
		}
	}
	.contaier:hover{
		box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2), 0 25px 50px 0 rgba(0,0,0,0.1);
	}
</style>
