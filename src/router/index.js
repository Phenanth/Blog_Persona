import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import api from '../api.js'

import Home from '@/components/Home'
import Login from '@/components/Login'
import Tags from '@/components/Tags'

import Tag from '@/components/Tag/Tag'
import Classes from '@/components/Tag/Tag-classes'

import Article from '@/components/Article/Article'
import List from '@/components/Article/Article-List'
import Reader from '@/components/Article/Article-Reader'
import Editor from '@/components/Article/Article-Editor'
import EditTag from '@/components/Article/Article-EditTag'


Vue.use(Router)

export default new Router({
  routes: [
	{
	  path: '/',
	  name: 'Home',
	  component: Home,
	  redirect: '/list',
	  children: [
	  	{
			path: '/list',
			name: 'List',
			component: List
		},
		{
		path: '/article/:articleId',
		name: 'Article',
		component: Article,
		children: [
			{
				path: 'read',
				name: 'Reader',
				component: Reader,
				beforeEnter: (to, from, next) => {
					// 需要检验文章是否存在
					let opt = {
						articleId: to.params.articleId
					}
					api.getArticleState(opt).then(({
						data
					}) => {
						if (data.data) {
							next()
						} else {
							next('/list')
						}
					})
				}
			},
			{
				path: 'editTag',
				name: 'EditTag',
				component: EditTag,
				beforeEnter: (to, from, next) => {
					// 需要检验文章是否存在
					let opt = {
						articleId: to.params.articleId
					}
					api.getArticleState(opt).then(({
						data
					}) => {
						if (data.data) {
							next()
						} else {
							next('/read')
						}
					})
				}
			}
			]
		},
		{
			path: '/tags',
			component: Tags
		},
		{
			path: '/tag/:tagId',
			component: Tag,
			children: [
				{
					path: 'classes',
					component: Classes
				}
			]
		}
	  ]
	},
	{
		path: '/login',
		name: 'Login',
		component: Login,
		beforeEnter: (to, from, next) => {
			let ifLoginState = JSON.parse(store.getters.getEditorText)
			if (ifLoginState) {
				next('/list')
			} else {
				next()
			}
		}
	},
	{
		path: '/article/:articleId/edit',
		name: 'Editor',
		component: Editor,
		beforeEnter: (to, from, next) => {
			// 需要检验文章序号是否可用+登录token
			let ifLoginState = JSON.parse(store.getters.getEditorText)
			if (ifLoginState) {
				api.getArticleNumber().then(({
					data
				}) => {
					if (data.success) {
						let index = data.data + 1
						if (to.params.articleId <= index) {
							next()
						} else {
									next('/list')
						}
					}
				})
			}
		},
		beforeLeave: (to, from, next) => {
			const Answer = window.confirm('Be sure you\'ve saved before you leave!')
			if (Answer) {
				next()
			} else {
				next(false)
			}
		}
	}
  ]
})
