'use strict'
/*
文件系统相关模块
用于处理md文件系统的内容
暂时只有框架，还未完成
*/

const Express = require('express');
const router = Express.Router();
const db = require('../db/connect.js');

// 获取所有文件一览，带分页
// 文件的命名标准: id - title
// 返回由创建时间从新到旧的id和title组成的页内文章数个数的数组
const getFileList = (req, res) => {

	let queryString = {
		sql: 'SELECT article_id, article_title FROM articles',
		timeout: 40000
	};

	db.query(queryString, function(error, results, fields) {
		if (error) {
			console.log(error)
		}

		if (results) {
			if (!results[0]) {
				console.log('Operation: Article - Get List, State: 404, Message: No Article In DB.');
				res.json({
					info: 404,
					success: false,
					message: 'No Article In DB.'
				});
			} else {
				// console.log(results);

				res.json({
					info: 200,
					success: true,
					data: results
				})
			}
		}
	})

}

// 查询文章是否存在
// 如果是删除的文章需要提示错误信息
const getFileExistenceState = (req, res) => {

	let queryString = {
		sql: 'SELECT * FROM articles WHERE article_id=?',
		values: [req.body.articleId],
		timeout: 40000
	};

	db.query(queryString, function(error, results, fields) {
		if (error) {
			console.log(error)
		} else {
			if(results.length > 0) {
				res.json({
					info: 200,
					success: true,
					data: true
				});
			} else {
				res.json({
					info: 200,
					success: true,
					data: false
				});
			}
		}
	})

	
}

// 获取目前文章序号数
const getFileNumber = (req, res) => {

	let queryString = {
		sql: 'SELECT max(article_id) as solution FROM articles',
		timeout: 40000
	}

	db.query(queryString, function (error, results, fields) {
		if (error) {

		} else {
			res.json({
				info: 200,
				success: true,
				data: results[0].solution
			});
		}
	})
}

// 储存指定id与title文章的内容
const saveFileContent = (req, res) => {

}

// 更新指定title文章的内容
const updateFileContent = (req, res) => {

}

// 获取指定id文章的内容
const getFileContent = (req, res) => {

}

// 删除指定id的文章
const deleteFile = (req, res) => {

}


module.exports = (router) => {

	router.post('/getFileList', getFileList);

	router.post('/getFileExistenceState', getFileExistenceState);

	router.post('/getFileNumber', getFileNumber);

	router.post('/saveFileContent', saveFileContent);

	router.post('/updateFileContent', updateFileContent);

	router.post('/getFileContent', getFileContent);

	router.post('/deleteFile', deleteFile);
	
}