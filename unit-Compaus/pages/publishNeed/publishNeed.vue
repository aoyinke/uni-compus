<template>
	<view>
		<uni-nav-bar left-icon="back" title="发布需求" @clickLeft="clickLeft"></uni-nav-bar>
		<view class="uni-list-cell uni-list-cell-pd" >
			<view class="uni-list-cell-db" style="font-weight: 500;">需求的名称</view>
			<input type="text" v-model="needInfo.title" style="text-align: right;" />
		</view>
		<view class="uni-list-cell uni-list-cell-pd" @click="chooseCategory">
			<view class="uni-list-cell-db" style="font-weight: 500;">需求的类别</view>
			<input type="text" v-model="needInfo.category" />
		</view>

		<view class="uni-list-cell uni-list-cell-pd"><view class="uni-list-cell-db" style="font-weight: 500;">编辑需求</view></view>
		<view class="uni-textarea"><textarea v-model="needInfo.content" placeholder="内容" style="height: 400rpx;" /></view>

		<uni-popup ref="CategoryPopup" type="bottom">
			<slot>
				<view class="CategoryPopup">
					<view class="uni-tab-bar">
						<scroll-view scroll-y="true" style="height:200px;" class="list">
							<view class="category-list">
								<view class="category-list-item" v-for="(category, idx) in categoryList" :key="idx" @click="finishChooseCategory(category)">
									<text>{{ category }}</text>
								</view>
							</view>
						</scroll-view>
					</view>
				</view>
			</slot>
		</uni-popup>

		<view class="bottomBar" @click="publishNeed"><uniCompusButton background="#FFC312" content="提交" width="100"></uniCompusButton></view>
		<chunLei-modal v-model="showErr" type="default" :mData="errData" navMask></chunLei-modal>
	</view>
</template>

<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue';
import { publishNeedValidator } from '@/utils/validator.js';
export default {
	data() {
		return {
			needInfo: {},
			categoryList: ['众投活动', '大佬赞助', '技能需求'],
			showErr: false,
			errData: { title: '提示', content: '这是一个模态弹窗', cancelText: '取消', confirmColor: '#3CC51F' }
		};
	},
	methods: {
		publishNeed() {
			let errMsg = publishNeedValidator(this.needInfo);
			if (!errMsg) {
				this.request('v1/needWall/addNeed',this.needInfo,'POST')
			} else {
				let obj = this.errData;
				obj.content = errMsg;
				this.errData = obj;
				this.showErr = true;
			}
			console.log(this.needInfo);
		},
		clickLeft() {
			uni.navigateBack({
				animationDuration: 300,
				animationType: 'pop-out'
			});
		},
		chooseCategory() {
			this.$refs.CategoryPopup.open();
		},
		finishChooseCategory(item) {
			this.needInfo.category = item;

			this.$refs.CategoryPopup.close();
		}
	},
	components: {
		uniPopup
	}
};
</script>

<style lang="scss" scoped>
.CategoryPopup {
	background-color: #fff;
	height: 80vh;
}
.category-list {
	&-item {
		font: {
			weight: 500;
			size: 30upx;
		}
		border-bottom: 1px solid #eee;
		padding-bottom: 15upx;
		margin: 15upx;
	}
}
</style>
