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

}

// 添加标签
const addTag = (req, res) => {

}

// 删除标签
const deleteTag = (req, res) => {

}

module.exports = (router) => {

	router.post('/getTags', getTags);

	router.post('/addTag', addTag);

	router.post('/deleteTag', deleteTag);
	
}