<template>
	<view class="shareIcon">
		<text class="eosfont" @click="share">&#xe600;</text>
		<chunLei-modal v-model="value" :mData="shareData" type="share" @onConfirm="onConfirm" navMask></chunLei-modal>
	</view>
</template>

<script>
export default {
	data() {
		return {
			value: false,
			shareData: [
				{
					title: '朋友圈',
					icon: '../../static/shareIcon/pengyouquan.png'
				},
				{
					title: '微信好友',
					icon: '../../static/shareIcon/weixinhaoyou.png'
				}  

			]
		};
	},
	methods: {
		share() {
			this.value = true;
		},
		onConfirm(item) {
			console.log(item);
			let scene = ""
			switch (item.title) {
				case '微信好友':
					scene = 'WXSceneSession';
					break;
				case '朋友圈':
					scene = 'WXSenceTimeline';
					break;
			}
			uni.getProvider({
				service: 'share',
				success: res => {
					let provider = res.provider;
					uni.share({
						provider: provider,
						scene: scene,
						type: 2,
						title: '轻松一校',
						imageUrl: '../../static/shareIcon/pengyouquan.png',
						success: function(res) {
							console.log('success:' + JSON.stringify(res));
						},
						fail: function(err) {
							console.log('fail:' + JSON.stringify(err));
						}
					});
				}
			});
			console.log(item);
		}
	}
};
</script>

<style lang="scss" scoped>
.eosfont {
	font-size: 50upx !important;
}
</style>
