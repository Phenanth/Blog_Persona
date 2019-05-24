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

	getArticleNumber ( data ) {
		return instance.post('/api/getFileNumber', data)
	},

	saveEditorText ( data ) {
		return instance.post('/api/saveFileContent', data)
	}

}
