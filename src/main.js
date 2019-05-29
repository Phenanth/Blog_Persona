// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.component('article-item', {
	props: ['id', 'title', 'createTime', 'modifyTime', 'editRoutes', 'readRoutes'],
	template: '<div id="articleItem" class="row" @mouseenter="active = true" @mouseleave="active = false"><div class="articleTimeText col-md-3"><small>{{ modifyTime }}</small></div><div @click="goTo(readRoutes)" class="articleTitleText col-md-5 offset-md-2">{{title}}</div><div class="col-md-1 col-2 offset-md-1 offset-8"><a class="badge badge-light" @click="goTo(editRoutes)">Edit</a></div></div>',
	data: function() {
		return {
			active: false
		}
	},
	computed: {
		isActive: function () {
			return this.active
		}
	},
	methods: {
		goTo: function (routes) {
			this.$router.push(routes)
		},
		mouseover: function () {
			this.active = !this.active
		}
	}
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
