<template>
	<view>
		<uni-nav-bar></uni-nav-bar>
		<view class="interetsTagList">

				<view class="Tag-item" v-for="(Tag,idx) in interetsTagList" :key="idx">
					<image :src="Tag.categoryFont" mode=""></image>
					<text class="category">{{Tag.category}}</text>
					<view class="concern" @click="addInterestTag(Tag.categoryId,idx)">
						<uniCompusButton :content="Tag.buttonContent" :isDisabled="Tag.selected" ></uniCompusButton>
					</view>

				</view>

		</view>


	</view>
</template>

<script>
	
	import uniCompusButton from '@/components/uni-compus-components/unicompus-button.vue'
	export default {
		data() {
			return {
				interetsTagList: [{
						categoryFont: "../../static/test/vue.png",
						category: "编程",
						categoryId: 1,
						selected: false,
						buttonContent:"关注"
					},
					{
						categoryFont: "../../static/test/Dance.png",
						category: "编程",
						categoryId: 1,
						selected: false,
						buttonContent:"关注"
					},
					{
						categoryFont: "../../static/test/vue.png",
						category: "编程",
						categoryId: 1,
						selected: false,
						buttonContent:"关注"
					},
					{
						categoryFont: "../../static/test/vue.png",
						category: "编程",
						categoryId: 1,
						selected: false,
						buttonContent:"关注"
					},
				],
				concernList: [],
				
			}
		},
		components: {
			uniCompusButton
		},
		methods: {
			addInterestTag(categoryId,idx) {
				
				this.interetsTagList[idx]['selected'] = true
				this.interetsTagList[idx]['buttonContent'] = "已关注"
				this.concernList.push(categoryId)
				this.content = "已关注"
				console.log(this.concernList)
			}
		},
		onLoad(option) {
			const item = JSON.parse(decodeURIComponent(option.item));
			console.log(item)
		}
	}
</script>

<style lang="scss" scoped>
	.interetsTagList {
		display: flex;
		justify-content: space-around;
		align-items: center;
		flex-wrap: wrap;

		.Tag-item {
			width: 40%;
			margin: 20upx;
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
	}
</style>
