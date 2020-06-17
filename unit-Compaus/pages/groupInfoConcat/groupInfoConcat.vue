<template>
	<view>
		<uni-nav-bar title="信息交流" left-icon="back" @clickLeft="clickLeft"></uni-nav-bar>
		<!-- 手风琴效果 -->
		<uni-collapse :accordion="true">
			<uni-collapse-item :title="task.title" :showAnimation="true" v-for="(task,index) in tasks" :key="index">
				<view style="padding: 30rpx;" @click="goDetail"><card :cardinfo="task.cardinfo"></card></view>
			</uni-collapse-item>
			
		</uni-collapse>
	</view>
</template>

<script>
import uniCollapse from '@/components/uni-collapse/uni-collapse.vue';
import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue';
import card from '@/components/list-card/list-card.vue';
export default {
	data() {
		return {
			
			tasks: [
				{title:"物资租借",
				cardinfo: {
				authImg: "https://img.pixbe.com/p47810601/E8BCC804399741B681F59D78537BA572_640.jpg",
				authName: '张三',
				createTime: '2020-02-01',
				content: '已经从校团委那边借了十个话筒，十个手榴弹',
				leave: 8,
				tag: '最新进度'
			}},
			] 
		};
	},
	onLoad() {
		
		for(let i = 0;i<4;i++){
			this.tasks.push(this.tasks[0])
		}
	},
	methods: {
		clickLeft() {
			uni.navigateBack({
				animationDuration: 300,
				animationType: 'pop-out'
			});
		},
		goDetail(){
			uni.navigateTo({
				url:"/pages/groupInfoDetail/groupInfoDetail"
			})
		}
	},
	components: {
		uniCollapse,
		uniCollapseItem,
		card
	}
};
</script>

<style lang="scss"></style>
