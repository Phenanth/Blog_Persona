import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

axios.default.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/json'

const instance = axios.create()
instance.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.request.use = instance.interceptors.request.use
instance.interceptors.request.use(config => {
	if (localStorage.getItem('token')) {
		config.headers.Authorization = `token ${localStorage.getItem('token')}`
			.replace(/(^\")|(\"$)/g, '')
	}
	return config
}, err => {
	return Promise.reject(err)
})

instance.interceptors.response.use(response => {
	return response
}, err => {
	return Promise.reject(err)
})

export default {
	
	// 这里开始是Login相关api
	// 尚未集成

	doLogin ( data ) {
		return instance.post('/api/login', data)
	},

	doRegister ( data ) {
		return instance.post('/api/register', data)
	},

	getData ( data ) {
		return instance.post('/api/getUserData', data)
	},

	sendVerify ( data ) {
		return instance.post('/api/sendVerify', data)
	},

	verify ( data ) {
		return instance.post('/api/verify', data)
	},

	removeVerify ( data ) {
		return instance.post('/api/removeverify', data)
	},

	// 这里开始是FileSystem相关api

	getArticleList ( data ) {
		return instance.post('/api/getFileList', data)
	},

	getArticleState ( data ) {
		return instance.post('/api/getFileExistenceState', data)
	},

	getArticleContent ( data ) {
		return instance.post('/api/getFileContent', data)
	},

	getArticleNumber ( data ) {
		return instance.post('/api/getFileNumber', data)
	},

	getArticleMinNumber ( data ) {
		return instance.post('/api/getFileMinNumber', data)
	},

	saveEditorText ( data ) {
		return instance.post('/api/saveFileContent', data)
	},

	updateEditorText ( data ) {
		return instance.post('/api/updateFileContent', data)
	},

	deleteArticle ( data ) {
		return instance.post('/api/deleteFile', data)
	},

	nextArticle ( data ) {
		return instance.post('/api/nextFile', data)
	},

	lastArticle ( data ) {
		return instance.post('/api/lastFile', data)
	},

	// 这里开始是tag相关api
	getTags (data) {
		return instance.post('/api/getTags', data)
	},

	getArticleNumOfTag (data) {
		return instance.post('/api/getArticleNumOfTag', data)
	},

	addTag (data) {
		return instance.post('/api/addTag', data)
	},

	deleteTag (data) {
		return instance.post('/api/deleteTag', data)
	},

	getTagArticlelist (data) {
		return instance.post('/api/getTagArticlelist', data)
	},

	showTagofArticle (data) {
		return instance.post('/api/showTagofArticle', data)
	},

	getTagNumber (data) {
		return instance.post('/api/getTagNumber', data)
	},

	getTagReExistenceState (data) {
		return instance.post('/api/getTagReExistenceState', data)
	},

	getTagExistenceState (data) {
		return instance.post('/api/getTagExistenceState', data)
	},

	addTagByName (data) {
		return instance.post('/api/addTagByName', data)
	},

	getTagIDByName (data) {
		return instance.post('/api/getTagIDByName', data)
	}

}
