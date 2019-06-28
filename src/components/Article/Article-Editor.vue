<!DOCTYPE html>
<template>
<div id="editor">
	<div class="editor-head-bar row">
		<div class="col-md-11 col-lg-10 row">
			<input id="articleBtnGoList" class="btn btn-outline-info col-xl-1 col-md-2 col-3" type="button" v-model:value="comleteBtnText" @click="saveAndGoRead()">
			<transition name="fade"> 
				<div id="articleAlertMsg" class="alert alert-info offset-1" v-if="alertSuccess">{{ successMsg }}</div>
				<div id="articleAlertMsg" class="alert alert-danger offset-1" v-if="alertWarning">{{ wanrningMsg }}</div>
			</transition>
			<!-- Spinner -->
		  <div v-if="!isLoaded" id="editor-spinner" class="spinner-border text-info offset-md-1" role="status">
		    <span class="sr-only">Loading...</span>
		  </div>
			<div class="editor-input col-md-3 col-4">
				<small>Title:</small>
				<input class="form-control" type="text" v-model="articleTitle" placeholder="Input title here...">
			</div>
		</div>
	</div>
	<!-- 编辑器组件与属性的配置，具体的api见mavon-editor的api说明，或者node_modules中插件源代码props与events部分 -->
	<mavon-editor class="col-lg-10 col-12 offset-lg-1" style="height: 90%; " :toolbars="toolbarsValue" @save="saveMavon" :value="editorText" ref="vNoteEdit"></mavon-editor>
</div>
</template>
<script>
// Local Registration
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import api from '../../api.js'
export default {
	name: 'editor',
	components: {
		mavonEditor
		// or 'mavon-editor': mavonEditor
	},
	props: {
		subfield: true
	},
	data: function () {
		return {
			// 编辑器工具栏的配置
			// 代码优化时应该抽成一个config文件
			// 并通过mounted函数对参数进行初始化
			toolbarsValue: {
				bold: true, // 粗体
				italic: true, // 斜体
				header: true, // 标题
				underline: true, // 下划线
				strikethrough: true, // 中划线
				mark: true, // 标记
				superscript: true, // 上角标
				subscript: true, // 下角标
				quote: true, // 引用
				ol: true, // 有序列表
				ul: true, // 无序列表
				link: true, // 链接
				imagelink: true, // 图片链接
				code: true, // code
				table: true, // 表格
				fullscreen: true, // 全屏编辑
				readmodel: true, // 沉浸式阅读
				htmlcode: true, // 展示html源码
				help: true, // 帮助
				/* 1.3.5 */
				undo: true, // 上一步
				redo: true, // 下一步
				trash: true, // 清空
				save: true, // 保存（触发events中的save事件）
				/* 1.4.2 */
				navigation: true, // 导航目录
				/* 2.1.8 */
				alignleft: true, // 左对齐
				aligncenter: true, // 居中
				alignright: true, // 右对齐
				/* 2.2.1 */
				subfield: true, // 单双栏模式
				preview: true, // 预览
			},
			articleTitle: '',
			articleId: 0,
			firstEdit: false,
			editorText: '',
			documentCreateTime: '',
			successMsg: '',
			wanrningMsg: '',
			isLoaded: false
		}
	},
	computed: {
		alertSuccess: function () {
			if (this.successMsg != '' ) {
				return true
			} else {
				return false
			}
		},
		alertWarning: function () {
			if (this.wanrningMsg != '') {
				return true
			} else {
				return false
			}
		},
		comleteBtnText: function () {
			if (this.articleTitle == '') {
				return 'Return'
			} else {
				return 'Complete'
			}
		}
	},
	methods: {
		// 保存编辑器内容
		saveMavon: function (value, render) {
			// console.log('this is render,' + render)
			// console.log('this is value,' + value)
			// let child = this.$refs.vNoteEdit
			// console.log('keys, ' + Object.keys(child)) // 查看对象的key都有哪些
			// console.log('d_value, ' + child['d_value']) // si都没想到是这样获取值的

			if (this.articleTitle == '') {
				this.setWarningMsg('You haven\'t input the title!')
			} else {
				if (this.firstEdit) {
					let opt = {
						id: this.articleId,
						text: value,
						title: this.articleTitle,
						createTime: this.documentCreateTime,
						modifyTime: this.documentCreateTime
					}
					api.saveEditorText(opt).then(({
						 data
					}) => {
						if (data.success) {
							this.firstEdit = false
							this.setSuccessMsg('Saved.')
						}
					})
				} else {
					let opt = {
						text: value,
						id: this.articleId,
						title: this.articleTitle,
						modifyTime: this.formattedTimeString()
					}
					// console.log(opt)
					api.updateEditorText(opt).then(({
						data
					}) => {
						if (data.success) {
							this.setSuccessMsg('Updated.')
						} else {
							// console.log(data)
							this.setWarningMsg(data.message)
						}
					})
				}
			   
			}
			
		},
		saveAndGoRead: function () {
			// 使用refs调用mavon-editor组件内方法和获取data
			let textAreaObj = this.$refs.vNoteEdit
			if (this.articleTitle == '') {
				this.goTo('/list')
			} else {
				textAreaObj.save(textAreaObj['d_value'], '')
				this.goTo(/article/ + this.articleId.toString() + '/read')
			}
		},
		formattedTimeString : function () {
			let d = new Date()
			let year = (d.getYear() + 1900).toString()
			let month = (d.getMonth() + 1).toString()
			let day = d.getDate().toString()
			let hour = d.getHours().toString()
			let minute = d.getMinutes().toString()

			return year+'-'+month+'-'+day+' '+hour+':'+minute

		},
		splitRoute: function () {
			let indexs = this.$route.path.split('/')
			this.articleId = parseInt(indexs[2])
		},
		// 在Vue中用settimeout的正确方法
		setSuccessMsg: function ( msg ){
			this.successMsg = msg
			setTimeout(function() {this.successMsg = ''}.bind(this), 3000)
		},
		setWarningMsg: function ( msg ) {
			this.wanrningMsg = msg
			setTimeout(function() {this.wanrningMsg = ''}.bind(this), 3000)
		},
		goTo: function (routes) {
			this.$router.push(routes)
		}
	},
	mounted: function () {
		// 查询本文章是否是存在的文章
		// 是则加载文章内容并初始化编辑关系
		this.splitRoute()

		let opt = {
			articleId: this.articleId
		}

		api.getArticleState(opt).then(({
			data
		}) => {
			// console.log(data)
			if (data.success) {
				if (data.data) {
					// 如果已经存在文章
					api.getArticleContent(opt).then(({
						data
					}) => {
						if (data.success) {
							// console.log('Process getFileContent succeeded.')
							this.editorText = data.data
							this.articleTitle = data.title
						}
					})
				} else {
					// 如果是新建文章
					this.firstEdit = true
					this.documentCreateTime = this.formattedTimeString();
				}
				this.isLoaded = true
				// 在完成了编辑器的保存和读取功能后需要添加这里的逻辑
				// 比如文章存在的情况下就读取文件系统，系统编辑状态
				// 文章不存在的情况下，系统处于编辑新建文件状态
				// console.log(data.data)
			}
			// 继续编辑的情况，初始化Editor的编辑栏的value
			// this.editorText = '# 示例标准内容(read failed)'
		})
		
	}
}
</script>
<style>
	
#editor {
	width: 100%;
	height: 90vh;
}

.editor-head-bar {
	display: flex;
	margin: 20px 0px 20px 0px;
	flex-direction: column;
	justify-content: flex-end;
	align-items: center;
}

.editor-head-bar > div {
	display: flex;
	width: 100%;
	align-items: flex-end;
	justify-content: space-between;
}

#editor-spinner {
	position: fixed;
}

#articleAlertMsg {
	width: 30%;
	display: flex;
	justify-content: center;
}

#articleBtnGoList {
	/*height: 40px;*/
}

.alert {
	margin-bottom: 0px;
}

.editor-input {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding-right: 0px;
}

.editor-input > small {
	color: #17a2b8;
	font-weight: bold;
}

.fade-enter-active, .fade-leave-active {
	transition: opacity 1s;
}

.fade-enter, .fade-leave-to {
	opacity: 0;
}

</style>