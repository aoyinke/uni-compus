import Vue from 'vue'
import Vuex from 'vuex'

import chatInfo from './modules/chatInfo.js'
import activity from './modules/activity/index.js'
import group from './modules/group/index.js'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
	modules:{
		chatInfo,
		activity,
		group
	}
})
export default store