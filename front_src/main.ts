import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './less/index.less';
import StatsManager from './utils/StatsManager';
import { Route } from 'vue-router';

Vue.config.productionTip = false;

router.beforeEach((to:Route, from:Route, next:Function) => {
	//If first route, wait for data to be loaded
	if (!store.state.initComplete) {
		store.dispatch("startApp", { route: to }).then(_ => {
			if(!store.state.loggedin && to.matched[0].meta.needAuth === true) {
				router.push({name:"home", params:{from:document.location.href}});
			}else{
				nextStep(next, to);
			}
		});
	}else{
		nextStep(next, to);
	}
});

function nextStep(next:Function, to:Route):void {
	let meta = to.matched? to.matched[0].meta : null;
	if(meta && meta.tag) {
		console.log("send")
		StatsManager.instance.pageView(meta.tag.path, meta.tag.title);
	}
	next();
}


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
