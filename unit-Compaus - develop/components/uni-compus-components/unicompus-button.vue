<template>
	<button type="primary" :disabled="isDisabled" :size="size" class="button" 
	:style="{'background': isDisabled ? '#ced6e0' : background ,width:width + '%'}"
	:class="{'choosed':choosed}">{{content}}</button>
</template>

<script>
	export default{
		props:{
			openType:{
				type:String
			},
			content:{
				type:String,
				required:true
			},
			choosed:{
				type:Boolean,
				default:false
			},
			size:{
				default:"mini",
				type:String,
				
			},
			background:{
				default:"blue",
				type:String
			},
			isDisabled:{
				type:Boolean,
				default:false
			},
			width:{
				type:Number
			}
		}
	}
</script>

<style scoped lang="scss"> 
	.button{
		
		color: #fff;
		border-radius: 20upx;
		box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2), 0 25px 50px 0 rgba(0,0,0,0.1);
	}
	.choosed{
		background: rgba(113, 128, 147,1.0) !important;
	}
</style>
