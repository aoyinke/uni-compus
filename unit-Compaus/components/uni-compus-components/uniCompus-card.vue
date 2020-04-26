<template>
	<view class="container">
		<view class="title">
			<text>{{title}}</text>
		</view>
		<view class="showBar">
			<scroll-view scroll-x="true" scroll-left="120" :style="{height:scrollHeight}" class="scrollCard" enable-flex="true">
				<view class="showBar-cards">
					<slot></slot>
					<slot name="card"></slot>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {

			};
		},
		props: {
			title:{
				type:String,
				required:true
			},
			scrollHeight:{
				type:String,
				default:"175px"
			}

		},
		components: {
			
		}
	}
</script>

<style lang="scss">
	.container {
		.title {
			border-bottom: 1px solid #ecf0f1;

			text {
				margin-left: 20upx;
				font-size: 40upx;
				font-weight: 500;
			}
		}

		.showBar {
			margin-top: 20upx;
			.scrollCard{
				white-space: nowrap;
				width: 100%;
				.showBar-cards {
					width: 100%;
					display: flex;
					justify-content: space-evenly;
					align-items: center;
					flex-direction: row;
				}
			}
		}
		
		
	}
</style>
