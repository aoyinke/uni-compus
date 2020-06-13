<template>
	<view class="likeIcon">
		<template v-if="!isStore">
			<text class="eosfont like" @click="store">&#xe66c;</text>
		</template>
		<template v-else>
			<image src="../../../static/common/like.png" mode="" class="icon-active" @click="cancelStore"></image>
		</template>
	</view>
</template>

<script>
export default {
	
	data() {
		return {
			isStore: this.groupInfo.fav_status
		};
	},

	methods: {
		async store() {
			this.isStore = true;
			this.$emit('addSave')
			let {id} = this.groupInfo
			
			await this.request('v1/like/group', { groupId: id }, 'POST');
			uni.showToast({
				title:"收藏小组成功"
			})
		},
		async cancelStore() {
			this.isStore = false;
			let {id} = this.groupInfo
			this.$emit('cancelSave')
			
			await this.request('v1/like/cancelSaveGroup', { groupId: id }, 'POST');
			uni.showToast({
				title:"取消收藏小组"
			})
		}
	},
	props: {
		groupInfo:{
			type:Object
		}
	}
};
</script>

<style lang="scss" scoped>
.like {
	font-size: 50upx !important;
	transition: 1s;
}
.like:hover {
	width: 60upx;
	height: 60upx;
}

.icon-active {
	width: 50upx;
	height: 50upx;
	transform: scale3d(1.1);
}
</style>
