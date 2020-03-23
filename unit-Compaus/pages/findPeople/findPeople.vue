<template>
	<view class="contaier">
		<uni-nav-bar left-icon="back" title="人脉检索" @clickLeft="clickLeft"></uni-nav-bar>
		<tap-bar :tap-bars="tarBars" :tap-index="tapIndex" @taptab="tabtap"></tap-bar>
		<water-fall></water-fall>
	</view>
</template>

<script>
	import waterFall from '@/components/waterfall.vue'
	import tapBar from '@/components/tapBar.vue'
	export default {
		data() {
			return {
				tapIndex: 0,
				tarBars: [{
						name: "关注",
						id: "guanzhu"
					},
					{
						name: "舞蹈",
						id: "wudao"
					},
					{
						name: "电竞",
						id: "dianjing"
					},
					{
						name: "书法",
						id: "shufa"
					},
					{
						name: "电影",
						id: "dianying"
					},
					{
						name: "编程",
						id: "biancheng"
					}
				]
			};
		},
		components: {
			waterFall,
			tapBar
		},
		methods: {
			tabChange(e) {
				this.tapIndex = e.detail.current
			},
			tabtap(index) {
				this.tapIndex = index
			}
		},
		onLoad() {
			
		}
	}
</script>

<style lang="scss" scoped>

</style>
