<template>
	<view class="groupNotification" v-for="(item,idx) in activitylist" :key="idx">
		<view class="groupTopBar">
			<view class="groupLogo">
				<image src="item.groupLogo" mode=""></image>
			</view>
			<view class="groupName">
				<text>{{item.groupName}}</text>
			</view>
			<view class="notiDetail">
				<image src="static/index/more.png" mode=""></image>
			</view>
		</view>
		<view class="mainBar">
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item v-for="(img,index) in {{item.activityPropagate}}" :key="index">
					<view class="swiper-item">
						<image src="img" mode=""></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="footer">
			<view class="mutation">
				<view class="like">
					<image src="static/index/" mode=""></image>
				</view>
				<view class="comment">
					<image src="static/index/" mode=""></image>
				</view>
				v<view class="good">
					<image src="static/index/" mode=""></image>
				</view>
				<view class="share">
					<image src="static/index/" mode=""></image>
				</view>
			</view>
			<view class="commentDetail">
				<view class="commentDetail-P">
					<text>{{item.commentDetail.commentor}}</text>
					<text>{{item.commentDetail.commentContent}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style>
</style>
