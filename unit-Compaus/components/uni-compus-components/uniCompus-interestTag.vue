<template>
	<view class="contaier">
		<view class="Tag-item">
			<image :src="categoryInfo.categoryFont" mode=""></image>
			<text class="category">{{categoryInfo.category}}</text>
			<view class="concern" @click="addInterestTag(categoryInfo.categoryId)">
				<uniCompusButton content="关注" :isDisabled="isDisabled"></uniCompusButton>
			</view>
			
		</view>
	</view>
</template>

<script>
	import uniCompusButton from '@/components/uni-compus-components/unicompus-button.vue'
	export default {
		data() {
			return {
				isDisabled:false
			};
		},
			
		props:{
			categoryInfo:{
				type:Object
			}
		},
		components:{
			uniCompusButton
		},
		methods:{
			addInterestTag(categoryId){
				this.$emit("addInterestTag",this.isDisabled,categoryId)
			}
		},
		mounted() {
			console.log("this is tag")
		}
	}
</script>

<style lang="scss" scoped>
	.Tag-item{
		border: 1upx solid #dcdde1;
		box-sizing: border-box;
		image{
			width: 50upx;
			height: 50upx;
		}
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		
		
	}
</style>
