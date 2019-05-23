'use strict'
/*
文件系统相关模块
用于处理md文件系统的内容
暂时只有框架，还未完成
*/

const Express = require('express');
const router = Express.Router();

// 获取所有文件一览，带分页
// 文件的命名标准: id - title
// 返回由创建时间从新到旧的id和title组成的页内文章数个数的数组
const getFileList = (req, res) => {

}

// 储存指定id与title文章的内容
const saveFileContent = (req, res) => {

}

// 获取指定id文章的内容
const getFileContent = (req, res) => {

}

// 删除指定id的文章
const deleteFile = (req, res) => {

}


module.exports = (router) => {

	router.post('/getFileList', getFileList);

	router.post('/saveFileContent', saveFileContent);

	router.post('/getFileContent', getFileContent);

	router.post('/deleteFile', deleteFile);
	
}