<!DOCTYPE html>
<template>
<div id="tag-classes" class="">
	<div id="tag-head" class="">
		<button type="button" class="btn btn-outline-info col-xl-1 col-md-2 col-3" @click="goTo('/tags')">Back</button>
	</div>
		<!-- Tag id: {{ tagId }} -->
		<!-- 绑定key标签可以去掉框架的警告 -->
   	<div class="col-10 offset-1">
    	<article-item v-for="data in datas" :id="data.article_id" :title="data.article_title" :createTime="data.create_time" :modifyTime="data.modify_time" :editRoutes="data.editRoutes" :readRoutes="data.readRoutes" :key="data.article_id"></article-item>
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
	padding-top: 20px;
}

#tag-head {
	padding-left: 20px;
	display: flex;
	justify-content: flex-start;
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