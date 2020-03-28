<template>
	<view class="shareIcon">
		<text class="eosfont" @click="share">&#xe600;</text>
		<chunLei-modal v-model="value" :mData="shareData" type="share" @onConfirm="onConfirm" navMask>
		</chunLei-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: false,
				shareData: [{
						title: '朋友圈',
						icon: '../../static/shareIcon/pengyouquan.png'
					},
					{
						title: '微信好友',
						icon: '../../static/shareIcon/weixinhaoyou.png'
					},
					{
						title: '微博',
						icon: '../../static/shareIcon/weibo.png'
					},
					{
						title: 'QQ好友',
						icon: '../../static/shareIcon/qqhaoyou.png'
					},
					{
						title: 'QQ空间',
						icon: '../../static/shareIcon/qqkongjian.png'
					}
				],
			};
		},
		methods: {
			share() {
				this.value = true

			},
			onConfirm(item) {
				console.log(item)
			}
		}
	}
</script>

<style lang="scss" scoped>
.eosfont{
		font-size: 50upx !important;
	}
</style>
