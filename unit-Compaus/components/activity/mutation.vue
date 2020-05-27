<template>
	<view class="mutation">
		<view class="mutation-left">
			<view class="like tag">
				<like-icon :activityId="activityId"></like-icon>
			</view>

			<view class="good tag">
				<good-icon></good-icon>
			</view>
		</view>
		<view class="mutation-right">
			<view class="share tag">
				<share-icon></share-icon>
			</view>
		</view>
	</view>
</template>

<script>
	import likeIcon from '@/components/common/commonIcon/likeIcon.vue'
	import chatIcon from '@/components/common/commonIcon/chatIcon.vue'
	import goodIcon from '@/components/common/commonIcon/goodIcon.vue'
	import shareIcon from'@/components/common/commonIcon/shareIcon.vue'
	export default {
		data() {
			return {
				activityId: 1
			};
		},
		components: {
			likeIcon,
			chatIcon,
			goodIcon,
			shareIcon
		},
		props: {

		}
	}
</script>

<style lang="scss" scoped>
	.mutation {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 10upx;

		.mutation-left {
			display: flex;
			justify-content: space-evenly;
			align-items: center;
			width: 30%;

		}

		.mutation-right {
			.share {
				margin-right: 30upx;
			}
		}

	}
</style>
