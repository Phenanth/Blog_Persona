<!DOCTYPE html>
<template>
<div id="list" class="row">
	<div id="personaBar" class="col-md-2 offset-md-1 offset-lg-2 col-12">
		<!-- 网站信息卡片 -->
		<div class="card text-right text-white bg-info mb-3">
			
			<div class="card-body">
				<!-- 路径下还有一些别的图片可以供展示，还没写好根据日期自动换首页图片的功能...想想而已 -->
				<img src="../../assets/cardPic7.png" class="card-img-top" alt="Card Pic.">
				<h3 class="card-title">Persona</h3>
				<p class="card-text">基于md文档系统与Vue的文章管理系统</p>

			</div>
			<ul class="list-group list-group-flush">
			    <li class="list-group-item" @click="goTo('/list')"><a class="card-link">List</a></li>
			    <li class="list-group-item" @click="goTo('/tags')"><a class="card-link">Tag</a></li>
			 </ul>
			<div class="card-body">
				<a @click="goTo('/login')" class="badge badge-warning">Login</a>
				<a href="https://github.com/Phenanth/Blog_Persona" class="badge badge-light">Git</a>
			</div>
		</div>
	</div>
	<!-- 文章列表 -->
	<div id="articleList" class="col-md-6 col-12">
    	<!-- 留言用 -->
 		<!-- <div class="personaSticker alert alert-info" role="alert">
	  		<h4 class="alert-heading">留言条（将来会被删掉）</h4>
	  		<hr>
	  		<p>阅读功能还没完成的情况下，点Edit就能看到每篇md的内容。推荐看看备忘录那篇。</p>
	  		<p>Tag和Login的入口都在左边的卡片里，文章的阅读是直接点文章题目即可。</p>
	  		<p>卡片的代码在上面，复制到每个新的页面里面就可以了。</p>
		</div> -->
		<div class="row">
			<input id="" class="btn btn-warning col-2 offset-9" type="button" value="New" @click="createNewArticle()"></input>
		</div>
    	<!-- 绑定key标签可以去掉框架的警告 -->
   		<div class="col-md-10 offset-md-1">
    		<article-item v-for="data in datas" :id="data.article_id" :title="data.article_title" :createTime="data.create_time" :modifyTime="data.modify_time" :editRoutes="data.editRoutes" :readRoutes="data.readRoutes" :key="data.article_id"></article-item>
    	</div>
 	</div>
</div>
</template>
<script>
import api from '../../api.js'
export default {
	name: 'list',
	data: function () {
		return {
			tempDatas: [],
			active: false,
			sortBy: 'createTime'
		}
	},
	computed: {
		datas: function () {
			if (this.sortBy == 'createTime') {
				return this.sortByCreateTime(this.tempDatas)
			}
		}
	},
	methods: {
		createNewArticle: function () {
			api.getArticleNumber().then(({
				data
			}) => {
				if (data.success) {
					let index = data.data + 1
					this.goTo('/article/' + index.toString() + '/edit')
				}
			})
		},
		sortModifyTimeRule: function (a, b) {
			let timeA = a["modify_time"]
			let timeB = b["modify_time"]
			if (timeA < timeB) {
				return -1
			} else if (timeA > timeB) {
				return 1
			} else {
				return 0
			}
		},
		sortCreateTimeRule: function (a, b) {
			return a - b
		},
		sortByModifyTime: function ( datas ) {
			return datas.sort(this.sortModifyTimeRule)
		},
		sortByCreateTime: function ( datas ) {
			return datas.sort(this.sortCreateTimeRule)
		},
		goTo: function (routes) {
			this.$router.push(routes)
		}
	},
	mounted: function () {

		// 文章一览
		// 后续需要修改文章基本信息表
		// 添加是否已删除标签
		api.getArticleList().then(({
			data
		}) => {
			if (data.success) {
				// console.log(data.data)
				let obj = []
				for (let i = 0; i < data.data.length; i++) {
					data.data[i]["editRoutes"] = '/article/' + data.data[i].article_id.toString() + '/edit'
					data.data[i]["readRoutes"] = '/article/' + data.data[i].article_id.toString() + '/read'
					obj.push(data.data[i])
					this.tempDatas = obj
				}
			}
		})
	}
}
</script>
<style>
li {
	list-style: none;
}
html, body {
    background-color: #EEE;
    width: 100%;
    height: 100%;
}

small {
	color: #17A2B8;
	font-weight: bold;
}

div, li, .btn, .btn-hover {
	transition: color .1s;
	-moz-transition: color .1s;	/* Firefox 4 */
	-webkit-transition: color .1s;	/* Safari 和 Chrome */
	-o-transition: color .1s;	/* Opera */
}

.list-group > li {
	color: black;
}

.list-group > li:hover {
	color: orange;
}

#list {
    margin: 0px 20px 0px 20px;
    background-color: #EEE;
}

#personaBar {
	position: relative;
	margin-right: 10px;
	margin-bottom: 10px;
	min-width: 220px;
}

#personaTitle {
	width: 100%;
	background-color: #17A2B8;
	height: 100px;
}

#personaTitle > h2 {
	line-height: 100px;
	color: white;
}

#personaNav {
	background-color: white;
	padding: 10px;
}

.parsonaNavItem {
	height: 30px;
	padding: 10px;
	margin: 10px;
	color: #17A2B8;
}

.personaNavItem > span {
	line-height: 30px;
}

.parsonaNavItem:hover {
	color: orange;
}

.btn-newArticle {
	margin-right: 10px;
}

#articleList {
	height: 100%;
	padding: 48px 24px 48px 24px;
    background-color: white;
}


#articleItem {
	/*background-color: lightblue;*/
	padding: 12px;
	border-bottom: 1px dashed black;
	font-weight: bold;
	min-height: 100px;
	display: flex;
	direction: row;
	align-items: center;
	/*border-radius: 15px;*/
}


#articleItem > div:hover {
	/*background-color: lightblue;*/
	color: orange;
	/*font-weight: bold;*/
}

#articleItemCtlBar {
}

.articleTitleText {
	max-height: 50px;
	overflow: auto;

}

.articleTimeText {
	font-weight: bold;
}

.articleTitleText, .articleTimeText {
	display: flex;
	justify-content: flex-start;
	align-items: center;
}

.personaSticker {
	margin-top: 20px;
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
</style>