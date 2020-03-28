<template>
	<view class="goodIcon">
		<template v-if="!isGood">
			<text class="eosfont" @click="Good">&#xe605;</text>
		</template>
		<template v-else>
			<image src="../../../static/common/Good.png" mode="" class="isgood" @click="notgood"></image>
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isGood:false
			};
		},
		methods:{
			Good(){
				this.isGood = true
			},
			notgood(){
				this.isGood = false
			}
		}
	}
</script>

<style lang="scss" scoped>
.isgood{
	width: 60upx;
	height: 60upx;
}
.eosfont{
		font-size: 50upx !important;
	}
</style>
