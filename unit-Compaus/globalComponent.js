import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"

	
function plugin(Vue){
	if(plugin.installed){
		return
	}
	Vue.component('uniNavBar',uniNavBar)
}

export default plugin
