export default {
	state: {
		concernedPersonList:[
			{id:1,name:"天堂屠夫",avatar:"https://images.mepai.me/app/works/38224/2019-10-09/w_5d9d69b4f2acd/05d9d69b53cf12.jpg!1200w.jpg",intro:"666666666"},
			{id:1,name:"天堂屠夫",avatar:"https://images.mepai.me/app/works/38224/2019-10-09/w_5d9d69b4f2acd/05d9d69b53cf12.jpg!1200w.jpg",intro:"666666666"},
			{id:1,name:"天堂屠夫",avatar:"https://images.mepai.me/app/works/38224/2019-10-09/w_5d9d69b4f2acd/05d9d69b53cf12.jpg!1200w.jpg",intro:"666666666"}
		],
		userInfo: {
			hasLogin:false,
			nickName: "仓鼠",
			sex: "女",
			job: "学生汪",
			birthday: "无",
			love: "恋爱中",
			homeTown: "无",
			likeNums:0,
			concernNum:0,
			publishedNum:0,
			description:"哪怕是一条咸鱼也要有所介绍啊！",
			achievement:"哪怕是一条咸鱼也要有所成就啊！",
			activity:"哪怕是一条咸鱼也要参加活动啊！",
			college:"未知的大学",
			tags:"帅气,漂亮,精神",
			
		},
		
	},
	mutations:{
		storeLogin(state,payload){
			console.log("storeLogin-payload",payload)
			const temp = {
				hasLogin:true,
				token:payload.token,
				uid:payload.uid

			}
			
			state.userInfo = Object.assign(state.userInfo,temp)
			
			//将用户信息保存到本地
			uni.setStorageSync('userInfo',JSON.stringify(state.userInfo))
			
		},
		updateUserInfo(state,payload){
			const userInfo = payload
			console.log("this is in the store",payload)
			state.userInfo = Object.assign({},state.userInfo,userInfo)
		},
		storeLogout(state){
			const temp = {
				hasLogin:false,
				token:""
			}
			state.userInfo = Object.assign({},state.userInfo,temp)
			
			uni.removeStorageSync('userInfo')
		}
	}
}
