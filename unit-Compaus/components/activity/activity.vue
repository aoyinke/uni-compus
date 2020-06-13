<template>
	<view>
		<block v-for="(item,idx) in activityInfo" :key="idx">
			
			<activity-item :item="item" :contentIndex="contentIndex"></activity-item>
		</block>
	</view>
</template>

<script>
	
	import activityItem from '@/components/activity/activity-item.vue'
	
	export default {

		watch:{
			activityInfo:{
				deep: true,
				handler(newValue, oldValue) {
					
				　　for (let i = 0; i < newValue.length; i++) {  
				　　　　if (oldValue[i] != newValue[i]) {  
				　　　　　　this.activityInfo = newValue
						
				　　　　}  
				　　}  
				}　　　　
			}
		},

		data() {
			return {
				tapIndex:0
			}
		},
		props: {
			activityInfo: {
				type:Array,
				default:[]
			},
			contentIndex:{
				type:Number,
				default:0
			}
		},
		mounted() {
			

		},
		updated(){
			// console.log("updated",this.activityInfo)
		},
		components: {
			activityItem
		},
		methods: {
			
		},

	}
</script>

<style lang="scss" scoped>

	
</style>
