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
				<view class="taskCard" v-for="(task, idx) in groupTasks" :key="idx">
					<!-- <view class="deadLine">
						<uni-countdown
							color="#FFFFFF"
							background-color="#00B26A"
							border-color="#00B26A"
							:day="task.deadLine.day"
							:hour="task.deadLine.hour"
							:minute="task.deadLine.minute"
							:second="task.deadLine.second"
						></uni-countdown>
					</view> -->

					<uni-card :title="task.taskName" mode="style" :is-shadow="true" :thumbnail="task.coverImg" :extra="task.deadLine" :note="task.belongActivity" @click.native="gotoDetail(task)">
						<text class="text-line-2">{{ task.content }}</text>
					</uni-card>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import uniCard from '../components/uni-card/uni-card.vue';
import lvSelect from '@/components/lv-select/lv-select.vue';
import uniCountdown from '@/components/uni-countdown/uni-countdown.vue';
import goDetail from '@/components/uni-compus-components/uniCompus-goDetail.vue';
export default {
	async onLoad(item) {
		let { groupId,groupAuth } = item;
		let raw_tasks = await this.request('v1/task/taskList?groupId=' + groupId);
		this.groupAuth = groupAuth
		let tasks = raw_tasks[1].data;
		this.groupTasks = tasks;
		console.log(raw_tasks);
	},
	data() {
		return {
			groupAuth:"",
			groupTasks: [],
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
		gotoDetail(task){
			uni.navigateTo({
				url:`/pages/groupTaskDetail/groupTaskDetail?taskId=${task.id}&groupAuth=${this.groupAuth}`
			})
		},
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
.deadLine {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 20upx;
}
</style>
