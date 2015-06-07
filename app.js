var express = require('express');
var path = require('path');
var fs = require('fs');

var photo = require('./routes/photo');

var app = express();

// view engine setup
app.set('views', __dirname +'/views');
app.set('view engine', 'ejs');
// 上传照片的存储地址
app.set('photos', __dirname + '/public/photos');
app.use(express.static(__dirname + '/public'));

// 路由
app.get('/', photo.list);
app.get('/upload', photo.form);
app.post('/upload', photo.submit(app.get('photos')));
app.get('/photo/:id/download', photo.download(app.get('photos')));


app.listen(3000, function () {
  console.log('server listening on port 3000');
});
