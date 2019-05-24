/* Vuex for token management. */
import api from '../../api.js'

const state = {
	editorText: null
}

const getters = {
	getEditorText: function (state) {
		return localStorage.getItem('token')
	}
}

const actions = {
	saveEditorText: function ({ commit }, data) {
		commit('SAVEEDITORTEXT', data)
	},
	removeEditorText: function ({ commit }) {
		commit('REMOVEEDITORTEXT')
	},
	updateEditorText: function ({ commit }, data) {
		commit('REMOVEEDITORTEXT')
		commit('SAVEEDITORTEXT', data)
	}
}

const mutations = {
	SAVEEDITORTEXT: function (state, data) {
		localStorage.setItem('editorText', data)
		state.token = data
	},
	REMOVEEDITORTEXT: function (state) {
		localStorage.removeItem('editorText')
		state.token = null
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}
