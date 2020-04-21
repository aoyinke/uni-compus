<template>
	<view class="cooperate">
		<uni-nav-bar left-icon="back" title="社团协作" @clickLeft="clickLeft"></uni-nav-bar>
		<view class="group">
			<groupCard title="我的" :myGroups="myGroups"></groupCard>
			
		</view>
		<view class="mytasks">
			<groupCard title="我参与的任务" >
				<slot>
					<view class="mytasks-Bar">
						<cardWidthImg :title="task.title" :partnersArray="task.partnersArray" :src="task.src" v-for="(task,index) in mytasks"
						:key="index">
						</cardWidthImg>
					</view>
				</slot>
				
			</groupCard>
		</view>
		
	</view>
</template>

<script>
	import groupCard from '@/components/uni-compus-components/uniCompus-card.vue'
	import cardWidthImg from '@/components/uni-compus-components/uniCompus-card-widthImg.vue'
	export default {
		data() {
			return {
				mytasks:[
					{partnersArray:['老王','老李','老黄'],title:"租借物资",src:"../../static/test/waterfull/1.jpg"}
				],
				
				myGroups:[
					{name:"轻松一校",src:"../../static/test/waterfull/1.jpg",circle:true},
					{name:"轻松一校",src:"../../static/test/waterfull/1.jpg",circle:true},
					{name:"轻松一校",src:"../../static/test/waterfull/1.jpg",circle:true},
					]
				}
			
		},
		components:{
			groupCard,
			cardWidthImg
		},
		methods:{
			clickLeft(){
				uni.navigateBack({
					animationDuration:300,
					animationType:'pop-out'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
