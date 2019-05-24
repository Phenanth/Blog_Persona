<!DOCTYPE html>
<template>
<div id="list">
	<input type="button" value="New Article" @click="createNewArticle()"></input>
    <h1>List</h1>
    <ul>
    	<li v-for="data in datas" @click="goTo(data.editRoutes)">
    		{{data.article_id}} - {{data.article_title}}
    	</li>
    </ul>
</div>
</template>
<script>
import api from '../../api.js'
export default {
	name: 'list',
	data: function () {
		return {
			datas: []
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
				let obj = []
				for (let i = 0; i < data.data.length; i++) {
					data.data[i]["editRoutes"] = '/article/' + data.data[i].article_id.toString() + '/edit'
					data.data[i]["readRoutes"] = '/article/' + data.data[i].article_id.toString() + '/read'
					obj.push(data.data[i])
					// console.log(obj)
					this.datas = obj
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
#list {
    margin: auto;
    width: 80%;
    height: 580px;
}
</style>