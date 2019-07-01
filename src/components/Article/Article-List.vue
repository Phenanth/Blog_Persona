<!DOCTYPE html>
<template>
<div id="list" class="col-md-6 col-12">
	<!-- 文章列表 -->
	<div id="articleList">
    	<!-- 留言用 -->
 		<!-- <div class="personaSticker alert alert-info" role="alert">
	  		<h4 class="alert-heading">留言条</h4>
	  		<hr>
	  		<p>页面UI优化：</p>
	  		<p>1. 文章数过多导致的List页面元素的位置偏移</p>
	  		<p>2. CARD页提成上一层逻辑</p>
	  		<p>3. 回到顶端按钮的UI美化</p>
	  		<p>4. 阅读器在内容未加载完成时对页面文档位置留空</p>
	  		<p>有待添加功能：</p>
	  		<p>1. 登录采用Google Authentication</p>
	  		<p>2. 标签实现文章分类</p>
	  		<p>3. 根据创建时间/更改时间进行文章排序</p>
	  		<p>之后还需要对程序进行服务器部署。</p>
		</div> -->
		<div class="row">
			<!-- 登录后才显示新建文章按钮 -->
			<input v-if="isLogin" id="" class="btn btn-outline-warning col-2 offset-9" type="button" value="New" @click="createNewArticle()"></input>
		</div>
    	<!-- 绑定key标签可以去掉框架的警告 -->
   		<div class="col-md-10 offset-md-1">
    		<article-item v-for="data in datas" :id="data.article_id" :title="data.article_title" :createTime="data.create_time" :modifyTime="data.modify_time" :editRoutes="data.editRoutes" :readRoutes="data.readRoutes" :key="data.article_id"></article-item>
    	</div>
			<!-- Spinner -->
	    <div v-if="!isLoaded" id="list-spinner" class="spinner-border text-warning offset-md-9" role="status">
	      <span class="sr-only">Loading...</span>
	    </div>
 	</div>
</div>
</template>
<script>
import api from '../../api.js'
import store from '../../store'
export default {
	name: 'list',
	data: function () {
		return {
			tempDatas: [{'article_title': 'Title One', 'modify_time': '2019-xx-xx xx:xx'},
						{'article_title': 'Title Two', 'modify_time': '2019-xx-xx xx:xx'},
						{'article_title': 'Title Three', 'modify_time': '2019-xx-xx xx:xx'}
			],
			active: false,
			sortBy: 'createTime',
			isLoaded: false
		}
	},
	computed: {
		datas: function () {
			if (this.sortBy == 'createTime') {
				return this.sortByCreateTime(this.tempDatas)
			}
		},
		isLogin: function () {
			let isLoginState = JSON.parse(store.getters.getEditorText)
			return isLoginState

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
					this.isLoaded = true
				}
			}
		})
	}
}
</script>
<style>
#list small {
	color: #17A2B8;
	font-weight: bold;
}


#list-spinner {
	margin-top: 30px;
}

.activeTag {
	background-color: #EEE;
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

.card-body > a {
	font-size: 8px;
	line-height: 16px;
}

.btn-newArticle {
	margin-right: 10px;
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