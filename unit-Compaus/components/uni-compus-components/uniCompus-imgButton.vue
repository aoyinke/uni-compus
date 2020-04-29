<template>
	<view>
		<button @getuserinfo="onGetUserInfo"
		    :open-type='openType'  :plain='true'
		     class="container">
		  <slot name="img"></slot>
		</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props:{
			openType: {
			  type: String
			}
		},
		methods:{
			onGetUserInfo(event){
			  this.$emit("getUserInfo",event.detail,{})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container{
	    padding: 0 !important;
	    border:none !important;
	  }
</style>
