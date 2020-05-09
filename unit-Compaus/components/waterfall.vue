<template>
	<view class="contaier">
		<view class="peopleFall" :style="{ height: peopleViewHeight }">
			<view
				class="peopleFall-item"
				v-for="(item, index) in peopleList"
				:key="index"
				ref="peopleItem"
				:style="{ top: peopleItemStyles[index].top, right: peopleItemStyles[index].right, left: peopleItemStyles[index].left }"
			>
				<go-detail detailUrl="/pages/groupDetail/groupDetail">
					<image class="peopleFall-item-img" :src="item.src" mode="" :style="{ height: imgStyle[index].height }"></image>
				</go-detail>
				<view class="peopleFall-item-desc">
					<go-detail detailUrl="/pages/groupDetail/groupDetail">
						<text class="peopleFall-item-groupName">{{ item.groupName }}</text>
						<text class="text-line-2">{{ item.introduction }}</text>
						<view class="peopleFall-item-tag"><random-color-tag :content="tag" v-for="(tag, idx) in item.tag" :key="idx"></random-color-tag></view>
					</go-detail>
					<view class="footer">
						<view class="footer-left">
							<like></like>
							<text>{{ item.loveNum }}</text>
						</view>
						<text class="eosfont">&#xe7e0;</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import randomColorTag from '@/components/common/randomColorTag.vue';
import goDetail from '@/components/uni-compus-components/uniCompus-goDetail.vue';
import like from '@/components/common/commonIcon/likeIcon.vue';
export default {
	data() {
		return {
			imgStyle: [],
			MIN_IMG_HEIGHT: 178,
			MAX_IMG_HEIGHT: 230,
			ITEM_MARIN_SIZE: 20,
			peopleItemStyles: [],
			peopleViewHeight: 0
		};
	},
	methods: {
		imgHeight() {
			let result = Math.floor(Math.random() * (this.MAX_IMG_HEIGHT - this.MIN_IMG_HEIGHT) + this.MIN_IMG_HEIGHT);
			return result;
		},
		initImgStyles() {
			this.peopleList.forEach(item => {
				let imgHeight = this.imgHeight() + 'px';
				this.imgStyle.push({
					height: imgHeight
				});
			});
		},
		initWaterfall() {
			let leftHeightTotal = 0;
			let rightHeightTotal = 0;

			const query = uni.createSelectorQuery().in(this);
			query
				.selectAll('.peopleFall-item')
				.boundingClientRect(data => {
					data.forEach(item => {
						let peopleItemStyle = {};
						let elHeight = Math.floor(item.height) + this.ITEM_MARIN_SIZE;
						if (leftHeightTotal <= rightHeightTotal) {
							peopleItemStyle = {
								left: '0px',
								top: leftHeightTotal + 'px'
							};
							leftHeightTotal += elHeight;
						} else {
							peopleItemStyle = {
								right: '0px',
								top: rightHeightTotal + 'px'
							};
							rightHeightTotal += elHeight;
						}
						this.peopleItemStyles.push(peopleItemStyle);
					});
					this.peopleViewHeight = Math.max(leftHeightTotal, rightHeightTotal) + 'px';
				})
				.exec();
		}
	},
	async mounted() {
		await this.initImgStyles();
		await this.initWaterfall();
	},
	components: {
		randomColorTag,
		goDetail,
		like
	},
	props: {
		peopleList: {
			type: Array,
			default: [],
			required: true
		}
	}
};
</script>

<style lang="scss" scoped>
.peopleFall {
	position: relative;

	&-item {
		position: absolute;
		width: 45%;
		border-radius: 20upx;
		box-sizing: border-box;
		box-shadow: 2upx 2upx 8upx 8upx #eeeeee;
		margin: 20upx;

		&-img {
			width: 100%;
		}

		&-tag {
			display: flex;
		}

		&-groupName {
			font-weight: bold;
			margin-bottom: 20upx;
		}
	}
}

.footer {
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-direction: row;
	border-bottom: 3px solid #eeeeee;
	&-left {
		display: flex;
		align-items: center;
		justify-content: center;
	}
}
</style>
