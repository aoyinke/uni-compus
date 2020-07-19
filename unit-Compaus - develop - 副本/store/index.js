import Vue from 'vue'
import Vuex from 'vuex'

import chatInfo from './modules/chatInfo.js'
import activity from './modules/activity/index.js'
import group from './modules/group/index.js'
import user from './modules/user/index.js'
import {baseConfig} from '@/config/index.js'
import {STORE_LEAVE_TIME} from './mutation_type.js'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
		leaveTime: 0,
		host:baseConfig.host,
		port:baseConfig.port,
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