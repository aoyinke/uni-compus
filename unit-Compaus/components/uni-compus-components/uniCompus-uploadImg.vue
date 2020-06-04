<template>
	<view class="feedback-body feedback-uploader">
		<view class="uni-uploader">
			<view class="uni-uploader-head">
				<view class="uni-uploader-title">{{title}}</view>
				<view class="uni-uploader-info">{{ imageList.length }}/{{imgNumber}}</view>
			</view>
			<view class="uni-uploader-body">
				<view class="uni-uploader__files">
					<block v-for="(image, index) in imageList" :key="index">
						<view class="uni-uploader__file" style="position: relative: ;;">
							<image class="uni-uploader__img" :src="image" @tap="previewImage"></image>
							<view class="close-view" @click="close(index)">x</view>
						</view>
					</block>
					<view class="uni-uploader__input-box" v-show="imageList.length < 8"><view class="uni-uploader__input" @tap="chooseImg"></view></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			
		};
	},
	computed:{
		
	},
	methods:{
		previewImage() { //预览图片
		    uni.previewImage({
		        urls: this.imageList
		    });
		},
		close(e){
		    
			this.$emit("close",e)
		},
		chooseImg() { //选择图片
		    
			this.$emit("chooseImg")
		},
	},
	props:{
		imageList:{
			type:Array
			
		},
		title:{
			type:String
		},
		imgNumber:{
			type:Number,
			default:8
		}
	}
};
</script>

<style lang="scss" scoped>
.feedback-body {
	background: #fff;
}

.feedback-uploader {
	padding: 22upx 20upx;
}
.close-view {
	text-align: center;
	line-height: 14px;
	height: 16px;
	width: 16px;
	border-radius: 50%;
	background: #ff5053;
	color: #ffffff;
	position: absolute;
	top: -6px;
	right: -4px;
	font-size: 12px;
}
/* 上传 */
.uni-uploader {
	flex: 1;
	flex-direction: column;
}
.uni-uploader-head {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
.uni-uploader-info {
	color: #b2b2b2;
}
.uni-uploader-body {
	margin-top: 16upx;
}
.uni-uploader__files {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
}
.uni-uploader__file {
	margin: 10upx;
	width: 210upx;
	height: 210upx;
	position: relative;
}
.uni-uploader__img {
	display: block;
	width: 210upx;
	height: 210upx;
}
.uni-uploader__input-box {
	position: relative;
	margin: 10upx;
	width: 208upx;
	height: 208upx;
	border: 2upx solid #d9d9d9;
}
.uni-uploader__input-box:before,
.uni-uploader__input-box:after {
	content: ' ';
	position: absolute;
	top: 50%;
	left: 50%;
	-webkit-transform: translate(-50%, -50%);
	transform: translate(-50%, -50%);
	background-color: #d9d9d9;
}
.uni-uploader__input-box:before {
	width: 4upx;
	height: 79upx;
}
.uni-uploader__input-box:after {
	width: 79upx;
	height: 4upx;
}
.uni-uploader__input-box:active {
	border-color: #999999;
}
.uni-uploader__input-box:active:before,
.uni-uploader__input-box:active:after {
	background-color: #999999;
}
.uni-uploader__input {
	position: absolute;
	z-index: 1;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	opacity: 0;
}
</style>
