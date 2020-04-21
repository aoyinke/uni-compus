<template>
	<button type="primary" :size="size" class="button" :style="{'background':background}">{{content}}</button>
</template>

<script>
	export default{
		props:{
			content:{
				type:String,
				required:true
			},
			size:{
				default:"mini",
				type:String,
				
			},
			background:{
				default:"blue",
				type:String
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
</style>
