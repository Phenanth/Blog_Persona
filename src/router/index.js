import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import Login from '@/components/Login'
import Tags from '@/components/Tags'

import Article from '@/components/Article/Article'
import List from '@/components/Article/Article-List'
import Reader from '@/components/Article/Article-Reader'
import Editor from '@/components/Article/Article-Editor'

Vue.use(Router)

export default new Router({
  routes: [
	{
	  path: '/',
	  name: 'Home',
	  redirect: '/list'
	},
	{
		path: '/list',
		name: 'List',
		component: List
	},
	{
		path: '/login',
		name: 'Login',
		component: Login
	},
	{
	path: '/article/:articleId',
	name: 'Article',
	component: Article,
	children: [
		{
			path: 'edit',
			name: 'Editor',
			component: Editor,
			beforeEnter: (to, from, next) => {
				// 需要检验文章是否存在+登录token
				// 登录功能完成后，再完成本路由守护部分
				next()
			}
		},
		{
			path: 'read',
			name: 'Reader',
			component: Reader,
			beforeEnter: (to, from, next) => {
				// 需要检验文章是否存在
				// 文章读取功能完成后，再完成本路由守护部分
				next()
			}
		}
		]
	},
	{
		path: '/tags',
		component: Tags
	}
  ]
})
