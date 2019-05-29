<!DOCTYPE html>
<template>
<div id="editor">
	<div class="editor-head-bar">
		<div>
			<input id="articleBtnGoList" class="btn btn-info" type="button" value="Back" @click="goTo('/list')">
			<transition name="fade"> 
				<div id="articleAlertMsg" class="alert alert-info" v-if="alertSuccess">{{ successMsg }}</div>
				<div id="articleAlertMsg" class="alert alert-danger" v-if="alertWarning">{{ wanrningMsg }}</div>
			</transition>
			<div class="editor-input col-md-2 col-5">
				<small>Title:</small>
				<input class="form-control" type="text" v-model="articleTitle" placeholder="Input title here...">
			</div>
		</div>
	</div>
	<!-- 编辑器组件与属性的配置，具体的api见mavon-editor的api说明，或者node_modules中插件源代码props与events部分 -->
	<mavon-editor style="height: 100%;width: 100%" :toolbars="toolbarsValue" @save="saveMavon" :value="editorText"></mavon-editor>
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
			wanrningMsg: ''
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
		}
	},
	methods: {
		// 保存编辑器内容
		saveMavon: function (value, render) {
			// console.log('this is render,' + render)
			// console.log('this is value,' + value)

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
						}
					})
				}
			   
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
	margin: auto;
	width: 100%;
	height: 580px;
}

.editor-head-bar {
	display: flex;
	height: 80px;
	flex-direction: column;
	justify-content: flex-end;
	align-items: center;
	margin-bottom: 20px;
}

.editor-head-bar > div {
	display: flex;
	height: 50px;
	width: 100%;
	align-items: flex-end;
	justify-content: space-between;
}

#articleAlertMsg {
	width: 30%;
	display: flex;
	justify-content: center;
}

#articleBtnGoList {
	height: 40px;
}

.alert {
	margin-bottom: 0px;
}

.editor-input {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
}

.fade-enter-active, .fade-leave-active {
	transition: opacity 1s;
}

.fade-enter, .fade-leave-to {
	opacity: 0;
}

</style>