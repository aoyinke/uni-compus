<template>
	<view class="avatar">
		<image :src="imgSrc" mode="" :style="{borderRadius: circle ? image_radius : ''} " ></image>
		<text >{{name}}</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				image_radius:"50%"
			};
		},
		props:{
			imgSrc:{
				type:String,
				required:true
			},
			name:{
				type:String,
				required:true
			},
			circle:{
				type:Boolean,
				default:false
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.avatar{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		image{
			height: 80upx;
			width: 80upx;
		}
		text{
			font-size: 22upx;
		}
	}
</style>
