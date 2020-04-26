<template>
	<view>
		<card :cardinfo="cardinfo"></card>
	</view>
</template>

<script>
	import card from '@/components/list-card/list-card.vue'
	export default {
		data() {
			return {
				cardinfo: {
					"authImg": '图片地址',
					"authName": "张三",
					"createTime": "2020-02-01",
					"content": " 内容",
					"goodNum": "100",
					"likeNum": "200",
					"commentNum": "500",
					"leave": 8,
					"tag": "每日随笔"
				}
			};
		},
		components: {
			card
		},
		methods:{
			onClick: function(e) {
				console.log('onClick');
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
