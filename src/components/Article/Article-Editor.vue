<!DOCTYPE html>
<template>
<div id="editor">

	<div class="editor-head-bar">
		<input type="button" value="Back" @click="goTo('/list')">
		<input type="text" v-model="articleTitle">
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
        	firstEdit: true,
        	editorText: ''
    	}
    },
    methods: {
    	// 保存编辑器内容
    	saveMavon: function (value, render) {
    		console.log('this is render,' + render)
    		console.log('this is value,' + value)

    		if (firstEdit) {
    			let opt = {
    				text: value,
    				title: this.articleTitle,
    				createTime: formattedTimeString(),
    				modifyTime: formattedTimeString()
    			}
    			api.saveEditorText(opt).then(({
	    			data
	    		}) => {
	    			if (data.success) {
	    				goTo('/list')
	    			}
	    		})
    		}
    		
    	},
    	formattedTimeString : function () {
    		let d = new Date()
    		let year = (d.getYear() + 1900).toString()
    		let month = (d.getMonth() + 1).toString()
    		let day = d.getDay().toString()
    		let hour = d.getHours().toString()
    		let minute = d.getMinutes().toString()

    		return year+'-'+month+'-'+day+' '+hour+':'+minute

    	},
    	goTo: function (routes) {
    		this.$router.push(routes)
    	}
    },
    mounted: function () {
    	// 查询本文章是否是存在的文章
    	// 是则加载文章内容并初始化编辑关系
    	let indexs = this.$route.path.split('/')

    	let opt = {
    		articleId: parseInt(indexs[2])
    	}

    	api.getArticleState(opt).then(({
    		data
    	}) => {
    		// console.log(data)
    		if (data.success) {
                // 在完成了编辑器的保存和读取功能后需要添加这里的逻辑
                // 比如文章存在的情况下就读取文件系统，系统编辑状态
                // 文章不存在的情况下，系统处于编辑新建文件状态
    			// console.log(data.data)
    		}
    	})
    	// 继续编辑的情况，初始化Editor的编辑栏的value
    	this.editorText = '# 一级标题'
    }
}
</script>
<style>
#editor {
    margin: auto;
    width: 80%;
    height: 580px;
}
</style>