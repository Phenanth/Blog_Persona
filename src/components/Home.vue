<!DOCTYPE html>
<template>
<div id="persona-home" class="row">
	<div id="personaBar" class="col-md-2 offset-md-1 offset-lg-2 col-12">
		<!-- 网站信息卡片 -->
		<div id="personaBar-card" class="card text-right text-white bg-info mb-3">
			
			<div class="card-body">
				<!-- 路径下还有一些别的图片可以供展示，还没写好根据日期自动换首页图片的功能...想想而已 -->
				<img v-if="isWid" src="../assets/cardPic7.png" class="card-img-top" alt="Card Pic.">
				<h3 class="card-title">Persona</h3>
				<p class="card-text">基于md文档系统与Vue的文章管理系统</p>

			</div>
			<ul class="list-group list-group-flush">
	          <li class="list-group-item" v-bind:class="{activeTag: isListActive}" @click="goTo('/list')"><a class="card-link">首页</a><span v-if="isListActive" style="color:#ffc107;">●</span></li>
	          <li class="list-group-item" v-bind:class="{activeTag: isTagActive}" @click="goTo('/tags')"><a class="card-link">标签一览</a><span v-if="isTagActive" style="color:#ffc107;">●</span></li>
	       </ul>
			<div class="card-body">
				<!-- 登录与不登录显示不同内容 -->
				<a v-if="isLogin" @click="doLogout()" class="badge badge-warning">Logout</a>
				<a v-else @click="goTo('/login')" class="badge badge-warning">Login</a>
				<a href="https://github.com/Phenanth/Blog_Persona" class="badge badge-light">Git</a>
			</div>
		</div>
	</div>
    <router-view></router-view>
</div>
</template>
<script>
import store from '../store'
export default {
	name: 'persona-home',
	computed: {
		isLogin: function () {
			let isLoginState = JSON.parse(store.getters.getEditorText)
			return isLoginState

		},
		isListActive: function () {
			let pageCheck = new RegExp('/list', 'g')
			let arr = pageCheck.exec(this.$route.path)
			if (arr) {
				return true
			} else {
				return false
			}
		},
		isTagActive: function () {
			let pageCheck = new RegExp('/tags', 'g')
			let arr = pageCheck.exec(this.$route.path)
			if (arr) {
				return true
			} else {
				return false
			}
		},
		isWid: function () {
			let w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
			if (w > 772) {
				return true
			} else {
				return false
			}
		}
	},
	methods: {
		doLogout: function () {
			store.dispatch('removeEditorText')
			this.$router.go(0)
		},
		goTo: function (routes) {
			this.$router.push(routes)
		}
	}
}
</script>
<style>
html, body {
    background-color: #EEE;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
}

/*留这句话会导致有序列表也变成空心圆*/
li {
	/*list-style: circle;*/
}

#list, #tags, #reader, #personaBar, #editTag {
	padding-left: 0px;
	padding-right: 0px;
}

#article-index, #tag-index {
    padding-left: 0px;
    padding-right: 0px;
    background-color: #EEE;
}

#tag-index, #editTag {
	height: 100%;
	background-color: white;
	padding: 0px 0px 130px 0px;
}

#articleList {
	height: 100%;
	padding: 48px 24px 130px 24px;
    background-color: white;
}

.list-group > li, .nav > ul > li {
	list-style: none;
}

.list-group > li {
  color: black;
  display: flex;
  justify-content: space-between;
}

.list-group > li:hover {
	color: orange;
}

#personaBar {
  position: relative;
  margin-right: 0px;
  /*margin-bottom: 10px;*/
}

#personaBar-card {
	margin-bottom: 0px;
}

.card-body > a {
  font-size: 8px;
  line-height: 16px;
}

.badge {
  width: 40px;
  height: 20px;
}

div, li, .btn, .btn-hover {
  transition: color .1s;
  -moz-transition: color .1s; /* Firefox 4 */
  -webkit-transition: color .1s;  /* Safari 和 Chrome */
  -o-transition: color .1s; /* Opera */
}

#persona-home {
    background-color: #EEE;
}
</style>