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
				console.log('Operation: Tags - Get Tags, State: 200');
				res.json({
					info: 200,
					success: true,
					data: results
				})
			}
		}
	})
}

// 添加文章的标签
const addTag = (req, res) => {
	let queryString = {
		sql: 'INSERT INTO tag_relationship(tag_id, article_id) VALUES(?,?) ',
		values: [req.body.tagId,req.body.articleId],
		timeout: 40000
	};

	db.query(queryString, function(error, results, fields) {
		if (error) {
			console.log(error)
		}
		else {			
			console.log('Operation: Tags - Add Tags, State: 200');
			res.json({
				info: 200,
				success: true,
				data: true
			})
		}
	})
}

// 添加标签
const addTagByName = (req, res) => {
	let queryString = {
		sql: 'INSERT INTO tags(tag_name) VALUES(?) ',
		values: [req.body.tag_name],
		timeout: 40000
	};

	db.query(queryString, function(error, results, fields) {
		if (error) {
			console.log(error)
		}
		else {			
			console.log('Operation: Tags - Add Tag By Name, State: 200');
			res.json({
				info: 200,
				success: true,
				data: true
			})
		}
	})
}

// 通过标签名获取标签id
const getTagIDByName = (req, res) => {
	let queryString = {
		sql: 'select * from tags where tag_name=?',
		values: [req.body.tag_name],
		timeout: 40000
	};

	db.query(queryString, function(error, results, fields) {
		if (error) {
			console.log(error)
		}
		else {			
			console.log('Operation: Tags - Get Tag ID By Name, State: 200');
			res.json({
				info: 200,
				success: true,
				data: results[0]
			})
		}
	})
}

// 确认文章的某个标签是否存在
const getTagReExistenceState = (req, res) => {
	let queryString = {
		sql: 'SELECT * FROM tag_relationship WHERE tag_id=? AND article_id=?',
		values: [req.body.tagId,req.body.articleId],
		timeout: 40000
	};

	db.query(queryString, function(error, results, fields) {
		if (error) {
			console.log(error)
		}
		else{
			console.log('Operation: Get tag_relationship Existence State, State: 200.')
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

// 确认某个标签是否存在
const getTagExistenceState = (req, res) => {
	let queryString = {
		sql: 'SELECT * FROM tags WHERE tag_name=?',
		values: [req.body.tag_name],
		timeout: 40000
	};

	db.query(queryString, function(error, results, fields) {
		if (error) {
			console.log(error)
		}
		else{
			console.log('Operation: Get tag Existence State, State: 200.')
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

// 删除标签
const deleteTag = (req, res) => {
	let queryString = {
		sql: 'delete from tag_relationship where tag_id=? and article_id=?',
		values: [req.body.tagId,req.body.articleId],
		timeout: 40000
	};

	db.query(queryString, function(error, results, fields) {
		if (error) {
			console.log(error)
		}
		else {
			console.log(req.body.tagId,req.body.articleId)			
			console.log('Operation: Tags - Delete Tags, State: 200');
			res.json({
				info: 200,
				success: true,
				data: true
			})
		}
	})
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
				console.log('Operation: Tag - Calculate the number of articles that belong to a tag, State: 200, Message: No article that belong to any tag In DB.');
				res.json({
					info: 200,
					success: true,
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
				console.log('Operation: Tag - List articles that belong to a tag, State: 200, Message: No article that belong to a tag In DB.');
				res.json({
					info: 200,
					success: true,
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
		sql: 'select tag_name,tag_id from tags where tag_id in (select tag_id from tag_relationship where article_id =?)',
		values: [req.body.articleId],
		timeout: 40000
	};

	db.query(queryString, function(error, results, fields) {
		if (error) {
			console.log(error)
		}

		if (results) {
			if (!results[0]) {
				console.log('Operation: Tag - show tags belong to a article, State: 200, Message: No tag that belongs to the article In DB.');
				res.json({
					info: 200,
					success: true,
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

//获取目前的标签数
const getTagNumber = (req, res) => {

	let queryString = {
		sql: 'SELECT max(id) as num FROM tags',
		timeout: 40000
	}

	db.query(queryString, function (error, results, fields) {
		if (error) {

		} else {
			res.json({
				info: 200,
				success: true,
				data: results[0].num
			});
		}
	})
}

module.exports = (router) => {

	router.post('/getTags', getTags);

	router.post('/addTag', addTag);

	router.post('/addTagByName', addTagByName);

	router.post('/deleteTag', deleteTag);

	router.post('/getArticleNumOfTag', getArticleNumOfTag);

	router.post('/getTagArticlelist', getTagArticlelist);

	router.post('/showTagofArticle', showTagofArticle);

	router.post('/getTagNumber', getTagNumber);

	router.post('/getTagReExistenceState', getTagReExistenceState);

	router.post('/getTagExistenceState', getTagExistenceState);

	router.post('/getTagIDByName', getTagIDByName);
}