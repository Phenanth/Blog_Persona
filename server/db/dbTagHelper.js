'use strict'
/*
标签相关模块
暂时只有框架，还未完成
*/


const Express = require('express');
const router = Express.Router();
const db = require('./connect.js');

// 返回标签一览
// 标签个数，标签内容
const getTags = (req, res) => {
	let queryString = {
		sql: 'SELECT tag_id, tag_name FROM tags ',
		timeout: 40000
	};

	db.query(queryString, function(error, results, fields) {
		if (error) {
			console.log(error)
		}

		if (results) {
			if (!results[0]) {
				console.log('Operation: Tag - Get Tags, State: 404, Message: No Tag In DB.');
				res.json({
					info: 404,
					success: false,
					message: 'No Tag In DB.'
				});
			} else {
				console.log('Operation: Article - Get Tags, State: 200');
				res.json({
					info: 200,
					success: true,
					data: results
				})
			}
		}
	})
}

// 添加标签
const addTag = (req, res) => {

}

// 删除标签
const deleteTag = (req, res) => {

}

// 统计属于每个标签的文章数
const getArticleNumOfTag = (req, res) => {
	let queryString = {
		sql: 'select count(tag_relationship.tag_id) num from tags left join tag_relationship on tags.tag_id=tag_relationship.tag_id group by tags.tag_id; ',
		timeout: 40000
	};

	db.query(queryString, function(error, results, fields) {
		if (error) {
			console.log(error)
		}

		if (results) {
			if (!results[0]) {
				console.log('Operation: Tag - Calculate the number of articles that belong to a tag, State: 404, Message: No article that belong to any tag In DB.');
				res.json({
					info: 404,
					success: false,
					message: 'No article that belong to any tag In DB.'
				});
			} else {
				console.log('Operation: Tag - Calculate the number of articles that belong to a tag, State: 200');
				res.json({
					info: 200,
					success: true,
					data: results
				})
			}
		}
	})
}

const getTagArticlelist = (req, res) => {
	let queryString = {
		sql: 'select * from articles where article_id in (select article_id from tag_relationship where tag_id=?)',
		values: [req.body.articleId],
		timeout: 40000
	};

	db.query(queryString, function(error, results, fields) {
		if (error) {
			console.log(error)
		}

		if (results) {
			if (!results[0]) {
				console.log('Operation: Tag - List articles that belong to a tag, State: 404, Message: No article that belong to a tag In DB.');
				res.json({
					info: 404,
					success: false,
					message: 'No article that belong to a tag In DB.'
				});
			} else {
				console.log('Operation: Tag - List articles that belong to a tag, State: 200');
				res.json({
					info: 200,
					success: true,
					data: results
				})
			}
		}
	})
}

const showTagofArticle = (req, res) => {
	let queryString = {
		sql: 'select tag_name from tags where tag_id in (select tag_id from tag_relationship where article_id =?)',
		values: [req.body.articleId],
		timeout: 40000
	};

	db.query(queryString, function(error, results, fields) {
		if (error) {
			console.log(error)
		}

		if (results) {
			if (!results[0]) {
				console.log('Operation: Tag - show tags belong to a article, State: 404, Message: No tag that belongs to the article In DB.');
				res.json({
					info: 404,
					success: false,
					message: 'No tag that belongs to the article In DB.'
				});
			} else {
				console.log('Operation: Tag - show tags belong to a article, State: 200');
				res.json({
					info: 200,
					success: true,
					data: results
				})
			}
		}
	})
}

module.exports = (router) => {

	router.post('/getTags', getTags);

	router.post('/addTag', addTag);

	router.post('/deleteTag', deleteTag);

	router.post('/getArticleNumOfTag', getArticleNumOfTag);

	router.post('/getTagArticlelist', getTagArticlelist);

	router.post('/showTagofArticle', showTagofArticle);
}