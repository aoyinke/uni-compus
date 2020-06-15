<template>
	<view>
		<uni-nav-bar title="兴趣标签"></uni-nav-bar>
		<view class="interetsTagList">

				<view class="Tag-item" v-for="(Tag,idx) in interetsTagList" :key="idx">
					
					<text class="eosfont dance">&#xe614;</text>
					<text>{{Tag.category}}</text>
					<view class="concern" @click="addInterestTag(idx,Tag.category)" >
						<uni-compus-button :content="Tag.buttonContent"  width="100" background="rgba(126, 214, 223,1.0)" :choosed="Tag.selected"></uni-compus-button>
					</view>

				</view>

		</view>
		<uni-compus-button open-type="getUserInfo"  width="100" background="#fbc531" content="确认提交"  @click.native="submitTags"></uni-compus-button>

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
						
						category: "舞蹈",
						categoryId: 2,
						selected: false,
						buttonContent:"关注"
					},
					{
						
						category: "学生组织",
						categoryId: 3,
						selected: false,
						buttonContent:"关注"
					},
					{
						category: "创新实践",
						categoryId: 4,
						selected: false,
						buttonContent:"关注"
					},
					{
						category: "辩论类",
						categoryId: 5,
						selected: false,
						buttonContent:"关注"
					},
					{
						category: "文化交流",
						categoryId: 6,
						selected: false,
						buttonContent:"关注"
					},
					{
						category: "娱乐类",
						categoryId: 7,
						selected: false,
						buttonContent:"关注"
					},
					{
						category: "英语类",
						categoryId: 8,
						selected: false,
						buttonContent:"关注"
					},
					{
						category: "体育类",
						categoryId: 9,
						selected: false,
						buttonContent:"关注"
					},
					{
						category: "电竞类",
						categoryId: 10,
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
			submitTags(){
				
				let concernTag = this.concernList.toString(',')
				
				if(concernTag){
					this.request('v1/user/update',{interestsTag:concernTag},'POST').then(res=>{
						uni.reLaunch({
							url:"/pages/self/self"
						})
					})
				}
			},
			addInterestTag(idx,category) {
				let obj = this.interetsTagList
				if(obj[idx]['selected']){
					obj[idx]['selected'] = false
					obj[idx]['buttonContent'] = "关注"
					let index = this.concernList.indexOf(category)
					this.concernList.splice(index,1)
				}else{
					obj[idx]['selected'] = true
					obj[idx]['buttonContent'] = "已关注"
					this.concernList.push(category)
				}
				this.interetsTagList = obj
				
				console.log(this.concernList)
			}
		},
		onLoad(option) {
			let {uid} = option
			console.log(uid)
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
