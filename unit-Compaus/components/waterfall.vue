<template>
	<view class="contaier">
		<view class="peopleFall" :style="{height:peopleViewHeight}">
			<view class="peopleFall-item" v-for="(item,index) in peopleList" :key="index" ref="peopleItem" :style="{top:peopleItemStyles[index].top,right:peopleItemStyles[index].right,left:peopleItemStyles[index].left}">
				<image class="peopleFall-item-img" :src="item.src" mode="" :style="{height:imgStyle[index].height}"></image>
				<view class="peopleFall-item-desc">
					<text class="peopleFall-item-groupName">{{item.groupName}}</text>
					<text class="text-line-2">{{item.introduction}}</text>
					<view class="peopleFall-item-tag">
						<random-color-tag :content="tag" v-for="(tag,idx) in item.tag" :key="idx"></random-color-tag>
					</view>
					<view class="footer">
						<view class="footer-left">
							<text class="eosfont">&#xe657;</text>
							<text>{{item.loveNum}}</text>
						</view>
						<text class="eosfont">&#xe7e0;</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import randomColorTag from '@/components/randomColorTag.vue'
	export default {
		data() {
			return {
				imgStyle: [],
				MIN_IMG_HEIGHT: 178,
				MAX_IMG_HEIGHT: 230,
				ITEM_MARIN_SIZE: 20,
				peopleItemStyles:[],
				peopleViewHeight:0,
				peopleList: [{
					src: "../static/test/waterfull/1.jpg",
					introduction: "来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊",
					loveNum:0,
					tag:['nb','无与伦比','技术宅'],
					groupName:"轻松一校"
				}, {
					src: "../static/test/waterfull/2.jpg",
					groupName:"轻松一校",
					introduction: "来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊",
					loveNum:0
				}, {
					src: "../static/test/waterfull/3.jpg",
					groupName:"轻松一校",
					introduction: "来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊",
					loveNum:0
				}, {
					src: "../static/test/waterfull/4.jpg",
					groupName:"轻松一校",
					introduction: "来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊",
					loveNum:0
				}, {
					src: "../static/test/waterfull/5.jpg",
					groupName:"轻松一校",
					introduction: "来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊",
					loveNum:0
				}, {
					src: "../static/test/waterfull/6.jpg",
					groupName:"轻松一校",
					introduction: "来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊",
					loveNum:0
				}, {
					src: "../static/test/waterfull/7.jpg",
					groupName:"轻松一校",
					introduction: "来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊",
					loveNum:0
				}, {
					src: "../static/test/waterfull/8.jpg",
					groupName:"轻松一校",
					introduction: "来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊",
					loveNum:0
				}, {
					src: "../static/test/waterfull/9.jpg",
					groupName:"轻松一校",
					introduction: "来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊",
					loveNum:0
				}, {
					src: "../static/test/waterfull/10.jpg",
					groupName:"轻松一校",
					introduction: "来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊",
					loveNum:0
				}, {
					src: "../static/test/waterfull/11.jpg",
					groupName:"轻松一校",
					introduction: "来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊",
					loveNum:0
				}, {
					src: "../static/test/waterfull/12.jpg",
					groupName:"轻松一校",
					introduction: "来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊",
					loveNum:0
				}]

			};
		},
		methods: {
			imgHeight() {
				let result = Math.floor(Math.random() * (this.MAX_IMG_HEIGHT - this.MIN_IMG_HEIGHT) + this.MIN_IMG_HEIGHT)
				return result;
			},
			initImgStyles() {
				this.peopleList.forEach(item => {
					let imgHeight = this.imgHeight() + 'px'
					this.imgStyle.push({
						height: imgHeight
					})

				})
			},
			initWaterfall() {
				let leftHeightTotal = 0
				let rightHeightTotal = 0
				
				const query = uni.createSelectorQuery().in(this);
				query.selectAll('.peopleFall-item').boundingClientRect(data => {
					
					data.forEach(item=>{
						let peopleItemStyle = {}
						let elHeight = Math.floor(item.height) + this.ITEM_MARIN_SIZE
						if(leftHeightTotal <= rightHeightTotal){
							peopleItemStyle = {
								left:'0px',
								top:leftHeightTotal + 'px'
							};
							leftHeightTotal +=elHeight;
						}else{
							peopleItemStyle = {
								right:'0px',
								top:rightHeightTotal + 'px'
							};
							rightHeightTotal+=elHeight
						}
						this.peopleItemStyles.push(peopleItemStyle)
					})
					this.peopleViewHeight = Math.max(leftHeightTotal,rightHeightTotal) + 'px'
					console.log(this.peopleViewHeight)
					console.log(this.peopleItemStyles)
				}).exec();
			}
		},
		async mounted() {
			await this.initImgStyles()
			await this.initWaterfall()
		},
		components: {
			randomColorTag
		},

	}
</script>

<style lang="scss" scoped>
	.peopleFall {
		position: relative;

		&-item {
			position: absolute;
			width: 45%;
			border-radius: 20upx;
			box-sizing: border-box;
			box-shadow: 2upx 2upx 8upx 8upx #EEEEEE;
			margin: 20upx;
			
			&-img {
				width: 100%;
			}
			&-tag{
				display: flex;
				
			}
			&-groupName{
				font-weight: bold;
				margin-bottom: 20upx;
				
			}
		}
	}
	.footer{
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: row;
		border-bottom: 3px solid #EEEEEE;
	}
</style>
