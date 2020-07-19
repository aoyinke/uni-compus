<template>
	<view>
		<view class="tag" :style="{backgroundColor:backgroundColor[colorType],width:width}">
			<text>{{content}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				backgroundColor:['green','yellow','orange','darkgray','#D8BFD8','#E6E6FA','	#483D8B','#9932CC'],
				colorType:0
			};
		},
		props: {
			content: {
				type: String,
				default: '轻松一校'
			},
			width:{
				type:String,
				default:"100upx"
			}
		},
		methods: {
			changeColorType() {
				this.colorType = Math.floor(Math.random()*this.backgroundColor.length)
			}
		},
		created(){
			this.changeColorType()
		}
	}
</script>

<style lang="scss" scoped>
	.tag{
		margin-top: 10upx;
		border-radius: 20upx;
		height: 40upx;
		color: #fff;
		text-align: center;
		box-shadow: 2upx 2upx 2upx 2upx #EEEEEE;
		margin-right: 10upx;
	}
</style>
