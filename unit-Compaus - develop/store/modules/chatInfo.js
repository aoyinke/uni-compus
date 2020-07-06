export default {
	state: {
		chatList: [{
				userAvatar: "../../static/test/waterfull/1.jpg",
				sendTime: "09:56",
				userName: "老王",
				latestInfo: "哈哈哈",
				messageNum: "1"
			},
			{
				userAvatar: "../../static/test/waterfull/1.jpg",
				sendTime: "09:56",
				userName: "老王",
				latestInfo: "哈哈哈",
				messageNum: "1"
			},
			{
				userAvatar: "../../static/test/waterfull/1.jpg",
				sendTime: "09:56",
				userName: "老王",
				latestInfo: "哈哈哈",
				messageNum: "1"
			}
		]
	},
	getter:{
		getMessNum: state =>{
			return state.chatList.map(itme=>{
				return item.messageNum
			})
		}
	}
}
