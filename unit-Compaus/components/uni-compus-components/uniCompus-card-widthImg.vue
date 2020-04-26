<template>
	<view class="contaier">
		<view class="coverImg">
			<image :src="src" mode=""></image>
			<view class="pic-cover">

			</view>
		</view>
		<view class="content">
			<view class="title">
				<text>{{title}}</text>
			</view>
			<view class="partners">
				<text>参与人员 :{{partners}}</text>
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
		computed: {
			partners() {
				return this.partnersArray.join('、')
			}
		},
		props: {
			src: {
				type: String,
				required: true
			},
			partnersArray: {
				type: Array,
				required: true
			},
			title: {
				type: String,
				required: true
			}
		}
	}
</script>

<style lang="scss" scoped>
	$normal-font-size:22upx;

	.contaier {
		margin: 20upx;
		border: 1px solid #f1f2f6;
		box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
		box-sizing: border-box;
		height: 300upx;
		margin-left: 40upx;
		.coverImg {
			image {
				width: 100%;
				height: 150upx;

			}

			position: relative;

			.pic-cover {
				width: 100%;
				height: 150upx;
				top: 0px;
				left: 0px;
				background-color: black;
				opacity: 0.4;
				position: absolute;

			}

		}
		.content {
			.title {
				font-weight: 700;
				font-size: 1em;
				letter-spacing: 2px;
			}
			.partners {
				font-size: $normal-font-size;
			}
		}
	}
</style>
