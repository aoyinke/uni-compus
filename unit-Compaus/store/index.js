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
		port:"3000",
		groupAuth:{}
	},
	modules:{
		chatInfo,
		activity,
		group,
		user
	},
	mutations:{

		changeGroupAuth(state,payload){
			console.log(payload)
			state.groupAuth = payload
		}
	}
})
export default store