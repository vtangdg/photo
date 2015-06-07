var express = require('express');
var router = express.Router();
var Photo = require('../models/Photo');
var path = require('path');
var fs = require('fs');
var Busboy = require('busboy');

// 列表路由
exports.list = function (req, res, next) {
	Photo.find({}, function (err, photos) {
		if (err) return next(err);
		res.render('photos', {
			title: 'Photos',
			photos: photos
		});
	});
};
// 表单路由
exports.form = function (req, res) {
	res.render('photos/upload', {
		title: 'Photo upload'
	});
};

// 照片提交路由
exports.submit = function (dir) {
	return function (req, res, next) {
		var busboy = new Busboy({ headers: req.headers });
		busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
		  var absPath = path.join(dir, filename);
		  file.pipe(fs.createWriteStream(absPath));
		  // 存入数据库
		  Photo.create({
		  	name:filename,
		  	path:filename
		  }, function (err) {
		  	if (err) return next(err);
		  	// 重定向
		  	res.redirect('/');
		  });
		});
		busboy.on('finish', function() {
			console.log('upload success');
    });
		return req.pipe(busboy);
	};
};

// 下载路由
exports.download = function (dir) {
	return function (req, res, next) {
		var id = req.params.id;
		Photo.findById(id, function (err, photo) {
			if (err) return next(err);
			var absPath = path.join(dir, photo.path);
			// 传输文件
			res.download(absPath);
		});
	};
};