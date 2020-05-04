<template>
	<view>
		<uni-nav-bar title="社团任务" left-icon="back" @clickLeft="clickLeft"></uni-nav-bar>
		<view style="">
			<lv-select
				@handleSearch="handleSearch"
				@change="change"
				placeholder="输入任务名称"
				:infoList="infoList"
				:showValue="showValue"
				v-model="searchValue"
				:loading="loading"
				type="primary"
				:uniShadow="true"
			></lv-select>
		</view>
		
		<view class="uni-tab-bar">
			<scroll-view scroll-y="true" class="list">
				<view class="taskCard" v-for="(task, idx) in mytasks" :key="idx">
					<view class="deadLine">
						<uni-countdown color="#FFFFFF" background-color="#00B26A" border-color="#00B26A" :day="task.deadLine.day" :hour="task.deadLine.hour" :minute="task.deadLine.minute" :second="task.deadLine.second"></uni-countdown>
					</view>
					<go-detail detailUrl="/pages/groupTaskDetail/groupTaskDetail">
						<uni-card :title="task.title" mode="style" :is-shadow="true" :thumbnail="task.coverImg" :extra="task.time" :note="task.note">
							<text class="text-line-2">{{ task.content }}</text>
						</uni-card>
					</go-detail>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>

import uniCard from '@/components/uni-card/uni-card.vue';
import lvSelect from '@/components/lv-select/lv-select.vue';
import uniCountdown from '@/components/uni-countdown/uni-countdown.vue'
import goDetail from '@/components/uni-compus-components/uniCompus-goDetail.vue'
export default {
	data() {
		return {
			mytasks: [
				{
					title: '完成页面的开发任务',
					deadLine:{day:1,hour:16,minute:45,second:0},
					coverImg: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg',
					content:
						'那是一个秋意盎然、金风送爽的日子，我和父母一起来到了位于上师大旁的康健园。一踏进公园，一股浓郁的桂香扑鼻而来，泌人心脾,让我心旷神怡，只见一朵朵开得正烈的金色桂花，迎风而立，仿佛在向我招手。我们追着这桂香，走进了清幽的公园。',
					time: 'Dcloud 2019-05-20 12:32:19',
					note: 'Tips'
				}
			],
			showValue: 'name', // 需要显示的数据，必须与infoList中的name对应
			searchValue: '',
			infoList: [],
			infoLists: [
				{
					name: '吕星辰1'
				},
				{
					name: '吕星辰2'
				},
				{
					name: '吕星辰3'
				},
				{
					name: '吕星辰4'
				}
			]
		};
	},
	methods: {
		clickLeft() {
			uni.navigateBack({
				animationDuration: 300,
				animationType: 'pop-out'
			});
		},
		handleSearch() {
			this.loading = true;
			setTimeout(() => {
				this.loading = false;
				this.infoList = this.infoLists;
			}, 2000);
		},
		change(val) {
			console.log(val);
		},
		
	},
	onLoad() {
		for (let i = 0; i < 4; i++) {
			this.mytasks.push(this.mytasks[0]);
		}
	},
	components: {
		uniCard,
		lvSelect,
		goDetail,
		uniCountdown
	}
};
</script>

<style lang="scss" scoped>
	.deadLine{
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 20upx;
	}
</style>
