<template>
	<view>
		<uni-nav-bar></uni-nav-bar>
		<view class="interetsTagList">

				<view class="Tag-item" v-for="(Tag,idx) in interetsTagList" :key="idx">
					
					<text class="eosfont dance">&#xe614;</text>
					<text>{{Tag.category}}</text>
					<view class="concern" @click="addInterestTag(Tag.categoryId,idx)" >
						<uni-compus-button :content="Tag.buttonContent"  width="100" background="rgba(126, 214, 223,1.0)" :choosed="Tag.selected"></uni-compus-button>
					</view>

				</view>

		</view>
		<uni-compus-button open-type="getUserInfo"  width="100" background="#fbc531" content="确认提交"  @click.native="login"></uni-compus-button>

	</view>
</template>

<script>
	
	import uniCompusButton from '@/components/uni-compus-components/unicompus-button.vue'
	export default {
		data() {
			return {
				
				interetsTagList: [{
						
						category: "编程",
						categoryId: 1,
						selected: false,
						buttonContent:"关注"
					},
					{
						
						category: "编程",
						categoryId: 2,
						selected: false,
						buttonContent:"关注"
					},
					{
						
						category: "编程",
						categoryId: 3,
						selected: false,
						buttonContent:"关注"
					},
					{
						categoryFont: "../../static/test/vue.png",
						category: "编程",
						categoryId: 4,
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
				let obj = this.interetsTagList
				if(obj[idx]['selected']){
					obj[idx]['selected'] = false
					obj[idx]['buttonContent'] = "关注"
					let index = this.concernList.indexOf(categoryId)
					this.concernList = this.concernList.splice(index,1)
				}else{
					obj[idx]['selected'] = true
					obj[idx]['buttonContent'] = "已关注"
					this.concernList.push(categoryId)
				}
				this.interetsTagList = obj
				
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

	.dance{
		color: rgba(255, 121, 121,1.0);
	}
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
