<!DOCTYPE html>
<template>
<div id="tags" class="row">
	<div id="personaBar" class="col-md-2 offset-md-2 col-12">
    <!-- 网站信息卡片 -->
    <div class="card text-right text-white bg-info mb-3">
      <div class="card-body">
        <!-- 路径下还有一些别的图片可以供展示，还没写好根据日期自动换首页图片的功能...想想而已 -->
        <img src="../assets/cardPic7.png" class="card-img-top" alt="Card Pic.">
        <h3 class="card-title">Persona</h3>
        <p class="card-text">基于md文档系统与Vue的文章管理系统</p>

      </div>
      <ul class="list-group list-group-flush">
          <li class="list-group-item" @click="goTo('/list')"><a class="card-link">List</a></li>
          <li class="list-group-item" @click="goTo('/tags')"><a class="card-link">Tag</a></li>
       </ul>
      <div class="card-body">
        <!-- 登录与不登录显示不同内容 -->
		<a v-if="isLogin" @click="doLogout()" class="badge badge-warning">Logout</a>
		<a v-else @click="goTo('/login')" class="badge badge-warning">Login</a>
		<a href="https://github.com/Phenanth/Blog_Persona" class="badge badge-light">Git</a>
      </div>
    </div>
  </div>
	<div id="tags-content" class="col-md-6 col-12">
		<!--标签列表-->
		<div id="tags-list">
			<h2>Tags</h2><hr>
			<h4>共计{{taglength}}个标签</h4>
			<ul>
			    <li v-for="data in tempDatas" id="tag" :num="data.num" :ArticleListRoutes="data.ArticleListRoutes" :key="data.tag_id" @click="showArticle(data.tag_id,data.tag_name,data.num)">{{ data.tag_name}}<div>{{ data.num}}</div></li>
		    </ul>
 		</div><br>
 		<!--属于该标签的文章列表(暂时不做)-->
 		<!--
 		<div id="Article-list" v-if="tag_id != 0">
 			<hr>
			<h2>{{tag_name}}</h2>
			<div v-if="articlenum == 0" id="msg">该标签下没有文章</div>
			<ul v-if="articlenum != 0">
			    <li v-for="data in tempDatas" id="tag" :num="data.num" :ArticleListRoutes="data.ArticleListRoutes" :name="data.tag_name" :key="data.tag_id" @click="showArticle(data.tag_id,data.tag_name)">{{ data.tag_name}}<div>{{ data.num}}</div></li>
		    </ul>
 		</div>
 	-->
	</div>
</div>
</template>
<script>
import api from '../api.js'
import store from '../store'
export default {
name: 'tags',
data: function () {
	return {
		tempDatas: [],
		num: [],
		taglength: 0,
		tag_id: 0,
		tag_name: '',
		articlenum: 0
	}
},
computed: {
	isLogin: function () {
		let isLoginState = JSON.parse(store.getters.getEditorText)
		return isLoginState
	}
},
methods: {
	goTo: function (routes) {
  		this.$router.push(routes)
  	},
  	showArticle: function(id, name, num){
  		this.ArticleListVisible = true;
  		this.tag_id = id;
  		this.tag_name = name;
  		this.articlenum = num;
  		if (num !=0){
  			api.getTagArticlelist().then(({
				data
			}) => {
				if (data.success) {
					for (let i = 0; i < data.data.length; i++) {
						num.push(data.data[i].num)
						this.num=num
					}
				}	
			})
  		}
  	},
  	// 登出函数
	doLogout: function () {
		store.dispatch('removeEditorText')
		this.$router.go(0)
	},
	sortRule: function (a, b) {
			let timeA = a["num"]
			let timeB = b["num"]
			if (timeA < timeB) {
				return 1
			} else if (timeA > timeB) {
				return -1
			} else {
				return 0
			}
	},
},
mounted: function () {
	let num = []
	api.getArticleNumOfTag().then(({
		data
	}) => {
		if (data.success) {
			for (let i = 0; i < data.data.length; i++) {
				num.push(data.data[i].num)
				this.num=num
			}
		}
	})
	api.getTags().then(({
		data
	}) => {
		if (data.success) {
			let obj = []
			for (let i = 0; i < data.data.length; i++) {
				data.data[i]["num"] = num[i]
				obj.push(data.data[i])
			}
			//console.log(obj)
			obj = obj.sort(this.sortRule)
			this.tempDatas = obj
			this.taglength = data.data.length;
		}
	})
}
}
</script>
<style>
html, body {
    background-color: #EEE;
    width: 100%;
    height: 100%;
}
li {
  list-style: none;
}

.btn, .btn-hover {
  transition: color .1s;
  -moz-transition: color .1s; /* Firefox 4 */
  -webkit-transition: color .1s;  /* Safari 和 Chrome */
  -o-transition: color .1s; /* Opera */
}

.list-group > li {
  color: black;
}

.list-group > li:hover {
  color: orange;
}

#personaBar {
  position: relative;
  margin-right: 10px;
  margin-bottom: 10px;
}

.badge {
  width: 50px;
  height: 20px;
}

.btn-warning {
  color: white;
}

.btn-warning:hover {
  color: white;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

#tags-content {
	background-color: white;
	height: 100%;
}
#tags {
    margin: 0px 20px 0px 20px;
    background-color: #EEE;
    height: 100%;
}
#tags h2{
	margin: auto;
	padding:30px 0px 15px 0px;
	width: 80%;
	color: #17A2B8;
}
#tags hr{
	color: lightgray;
	height: 1px;
	width: 85%;
}
#tags #tags-list ul{
	text-align:left;
	padding-left: 80px;
	padding-right: 50px;
}
#tags #tag{
	margin-top: 40px;
	background-color: #d1ecf1;
	margin-left: 15px;
	line-height: 50px;
	text-align: center;
	display: inline-block;
	list-style: none;
	font-size: 22px;
	font-weight: 450;
	padding: 5px 5px 5px 40px;
	border-radius: 5px;
}

#tags #tag:hover{
	background-color: #17a2b8;
	cursor: pointer;
}

#tags #tag div{
	display: inline-block;
	font-size: 18px;
	line-height: inherit;
	width: 50px;
}
#tags #msg {
	width: 800px;
	height: 210px;
	margin: auto;
	margin-top: 20px;
	line-height: 210px;
	font-size: 22px;
}
</style>