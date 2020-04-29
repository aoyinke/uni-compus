<template>
	<view class="cooperate">
		<uni-nav-bar title="社团协作"></uni-nav-bar>
		<view class="group">

			<groupCard title="我的社团" scrollHeight="100px">
				<slot>
					<block v-for="(group,idx) in myGroups" :key="idx">
						<goDetail detailUrl="/pages/chatPages/chatPages">
							<avatar :imgSrc="group.src" :name="group.name" :circle="group.circle"></avatar>
							
						</goDetail>
					</block>
				</slot>

			</groupCard>

		</view>
		<view class="mytasks">
			<view class="mytasks-head">
				<text>我要做的事情</text>
			</view>

			<swiper class="swiper-box">

				<swiper-item v-for="(task,idx) in mytasks" :key="idx">
					<goDetail detailUrl="/pages/coopertateDetail/coopertateDetail">
						<view class="task-item">
							<uni-card :title="task.title" mode="style" :is-shadow="true" :thumbnail="task.coverImg" :extra="task.time" :note="task.note">
								<text class="text-line-2">
									{{task.content}}
								</text>
							</uni-card>
						</view>
					</goDetail>
				</swiper-item>

			</swiper>




		</view>


	</view>
</template>

<script>
	import chatTag from '@/components/uni-compus-components/uniCompus-chatTag.vue'
	import groupCard from '@/components/uni-compus-components/uniCompus-card.vue'
	import goDetail from '@/components/uni-compus-components/uniCompus-goDetail.vue'
	import avatar from '@/components/uni-compus-components/uniCompus-avatar.vue'
	import uniCard from '@/components/uni-card/uni-card.vue'
	export default {
		data() {
			return {
				messageNum:1,
				mytasks: [{
					title: "完成页面的开发任务",
					coverImg: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg",
					content: "那是一个秋意盎然、金风送爽的日子，我和父母一起来到了位于上师大旁的康健园。一踏进公园，一股浓郁的桂香扑鼻而来，泌人心脾,让我心旷神怡，只见一朵朵开得正烈的金色桂花，迎风而立，仿佛在向我招手。我们追着这桂香，走进了清幽的公园。",
					time: "Dcloud 2019-05-20 12:32:19",
					note: "Tips"

				}, {
					title: "完成页面的开发任务",
					coverImg: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg",
					content: "那是一个秋意盎然、金风送爽的日子，我和父母一起来到了位于上师大旁的康健园。一踏进公园，一股浓郁的桂香扑鼻而来，泌人心脾,让我心旷神怡，只见一朵朵开得正烈的金色桂花，迎风而立，仿佛在向我招手。我们追着这桂香，走进了清幽的公园。",
					time: "Dcloud 2019-05-20 12:32:19",
					note: "Tips"

				}],

				myGroups: [{
						name: "轻松一校",
						src: "../../static/test/waterfull/1.jpg",
						circle: true
					},
					{
						name: "轻松一校",
						src: "../../static/test/waterfull/1.jpg",
						circle: true
					},
					{
						name: "轻松一校",
						src: "../../static/test/waterfull/1.jpg",
						circle: true
					},
				]
			}

		},
		onLoad() {
			setTimeout(function() {
				console.log('start pulldown');
			}, 1000);
			uni.startPullDownRefresh();
		},
		onPullDownRefresh() {
			console.log('refresh');
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		components: {
			groupCard,
			avatar,
			uniCard,
			goDetail,
			chatTag
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.mytasks-head {
		border-bottom: 1px solid #ecf0f1;

		text {
			margin-left: 20upx;
			font-size: 40upx;
			font-weight: 500;
		}
	}

	.scrolltask {

		white-space: nowrap;
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;

		.task-item {
			width: 50%;
		}
	}

	.swiper-box {
		height: 310px;
	}
</style>
