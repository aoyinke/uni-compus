import Vue from 'vue'
import Vuex from 'vuex'

import chatInfo from './modules/chatInfo.js'
import activity from './modules/activity/index.js'
import group from './modules/group/index.js'
import user from './modules/user/index.js'

import {STORE_LEAVE_TIME} from './mutation_type.js'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
		leaveTime: 0,
		host:"http://localhost",
		port:"3000"
	},
	modules:{
		chatInfo,
		activity,
		group,
		user
	},
	mutations:{
		[STORE_LEAVE_TIME](state, payload) { // 记录离开时间
			let date = new Date()
			state.leaveTime = date.getTime()
		},
	}
})
export default store