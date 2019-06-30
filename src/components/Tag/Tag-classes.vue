<!DOCTYPE html>
<template>
<div id="tag-classes" class="row">
	<div id="personaBar" class="col-md-2 offset-md-2 col-12">
    <!-- 网站信息卡片 -->
    <div class="card text-right text-white bg-info mb-3">
      <div class="card-body">
        <!-- 路径下还有一些别的图片可以供展示，还没写好根据日期自动换首页图片的功能...想想而已 -->
        <img src="../../assets/cardPic7.png" class="card-img-top" alt="Card Pic.">
        <h3 class="card-title">Persona</h3>
        <p class="card-text">基于md文档系统与Vue的文章管理系统</p>

      </div>
      <ul class="list-group list-group-flush">
          <li class="list-group-item" @click="goTo('/list')"><a class="card-link">首页</a></li>
          <li class="list-group-item" @click="goTo('/tags')"><a class="card-link">标签一览</a><span style="color:#ffc107;">●</span></li>
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
		<button type="button" class="btn btn-info" @click="goTo('/tags')">Back</button>
		Tag id: {{ tagId }}
		<!-- 绑定key标签可以去掉框架的警告 -->
   	<div class="col-md-10 offset-md-1">
    	<article-item v-for="data in datas" :id="data.article_id" :title="data.article_title" :createTime="data.create_time" :modifyTime="data.modify_time" :editRoutes="data.editRoutes" :readRoutes="data.readRoutes" :key="data.article_id"></article-item>
    </div>
	</div>
</div>
</template>
<script>
import store from '../../store'
import api from '../../api'
export default {
	name: 'Classes',
	data: function () {
		return {
			tagId: '',
			tempDatas: [{'article_title': 'Title One', 'modify_time': '2019-xx-xx xx:xx'},
						{'article_title': 'Title Two', 'modify_time': '2019-xx-xx xx:xx'},
						{'article_title': 'Title Three', 'modify_time': '2019-xx-xx xx:xx'}
			],
			sortBy: 'createTime',
			isLoaded: false
		}
	},
	methods: {
		goTo: function (routes) {
			this.$router.push(routes)
		},
		sortCreateTimeRule: function (a, b) {
			return a - b
		},
		sortByCreateTime: function ( datas ) {
			return datas.sort(this.sortCreateTimeRule)
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
	mounted: function () {
		this.tagId = this.$route.params.tagId
		let opt = {
			tagId: this.tagId
		}
		api.getTagArticlelist(opt).then(({
			data
		}) => {
			if (data.success) {
				let obj = []
				for (let i = 0; i < data.data.length; i++) {
					data.data[i]["editRoutes"] = '/article/' + data.data[i].article_id.toString() + '/edit'
					data.data[i]["readRoutes"] = '/article/' + data.data[i].article_id.toString() + '/read'
					obj.push(data.data[i])
					this.tempDatas = obj
					this.isLoaded = true
				}
			} else {
				console.log(data.message)
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
/*li {
  list-style: none;
}*/

#tag-classes {
	width: 100%;
}

.btn, .btn-hover {
  transition: color .1s;
  -moz-transition: color .1s; /* Firefox 4 */
  -webkit-transition: color .1s;  /* Safari 和 Chrome */
  -o-transition: color .1s; /* Opera */
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
  margin-right: 10px;
  margin-bottom: 10px;
}

.activeTag {
	background-color: #EEE;
}

.badge {
  width: 40px;
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


</style>