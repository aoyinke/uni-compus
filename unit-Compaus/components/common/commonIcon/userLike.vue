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
			isStore: this.userInfo.favor_status
		};
	},
	mounted() {
		this.isStore = this.userInfo.favor_status
		console.log(this.isStore)
	},
	methods: {
		async store() {
			this.isStore = true;
			this.$emit('addSave')
			console.log(this.userInfo)
			
			await this.request('v1/like/likeUser', { favor_uid: this.userInfo.id }, 'POST');
			uni.showToast({
				title:"收藏成功"
			})
		},
		async cancelStore() {
			this.isStore = false;
			
			this.$emit('cancelSave')
			await this.request('v1/like/dislikeUser', { favor_uid: this.userInfo.id }, 'POST');
			uni.showToast({
				title:"取消仓鼠"
			})
		}
	},
	props: {
		userInfo:{
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
