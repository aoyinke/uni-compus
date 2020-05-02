<template>
	<view class="content">
		<view class="group-logo">
			<image :src="groupLogo" mode=""></image>
		</view>
		<view class="group-info">
			<view class="group-username">
				<text>{{groupName}}</text>
			</view>
			<view class="group-intro">
				<text>{{intro}}</text>
				<view class="group-intro-tag">
					<random-color-tag :content="tag" v-for="(tag,idx) in tag"  :key="idx"></random-color-tag>
				</view>

			</view>
			
		</view>
		<view class="group-chat" v-if="needChat">
			<random-color-tag content="和他们聊聊" width="200upx"></random-color-tag>
		</view>
	</view>
</template>

<script>
	import randomColorTag from '@/components/common/randomColorTag.vue'
	export default {
		data() {
			return {
			
			}
		},
			
		components:{
			randomColorTag
		},
		props:{
			needChat:{
				type:Boolean,
				default:true
			},
			groupLogo:{
				type:String,
				required:true
			},
			groupName:{
				type:String,
				required:true
			},
			intro:{
				type:String,
				required:true
			},
			tag:{
				type:Array,
				required:true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {

		display: flex;
		justify-content: space-between;
		margin: 30upx 10upx;
		width: 100%;
		flex-wrap: wrap;

		.group-logo {
			
			background-color: #fff;
			padding-right: 30upx;
			image {
				width: 100upx;
				height: 100upx;
				border-radius: 50%;
			}
		}

		.group-info {
			flex: 1;
			width: 60%;
			border-bottom: 1px solid #eee;
			padding-bottom: 20upx;
			.group-username {
				font-weight: bold;
				font-size: 30upx;
			}

			.group-intro {
				.group-intro-tag {
					display: flex;
					flex-direction: row;
				}

				text {
					color: darkgray;
				}
			}

			
		}

	}
</style>
