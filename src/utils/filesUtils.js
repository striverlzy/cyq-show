const express = require('express');
const upload = require('multer')({ dest: 'static/uploads' });
const path = require('path');
const fs = require('fs');
const co = require('co');
const OSS = require('ali-oss');

const port = 3000;


let client = new OSS({
  endpoint: 'oss-cn-beijing.aliyuncs.com',
  accessKeyId: 'LTAI4Fcc7eXG3Mf9vTeVDwB7',
  accessKeySecret: 'wR7ZbF2uuItfLCMKtqYAOEP1HgbW0D',
  bucket: 'cyq-test'
});



let  app = express();

app.set('port', port);
app.use(express.static(path.join(__dirname, 'static/uploads')));

//处理跨域请求
app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.post('/upload', upload.single('img'), (req, res) => {
  // 没有附带文件
  if (!req.file) {
    res.json({ ok: false });
    return;
  }

  // 输出文件信息

  // console.log('====================================================');
  // console.log('fieldname: ' + req.file.fieldname);
  // console.log('originalname: ' + req.file.originalname);
  // console.log('encoding: ' + req.file.encoding);
  // console.log('mimetype: ' + req.file.mimetype);
  // console.log('size: ' + (req.file.size / 1024).toFixed(2) + 'KB');
  // console.log('destination: ' + req.file.destination);
  // console.log('filename: ' + req.file.filename);
  // console.log('path: ' + req.file.path);


  // 重命名文件
  /*
  let oldPath = path.join(__dirname, req.file.path);
  let newPath = path.join(__dirname, 'uploads/' + req.file.originalname);
  fs.rename(oldPath, newPath, (err) => {
    if (err) {
      res.json({ ok: false });
      console.log(err);
    } else {
      res.json({ ok: true ,info:'http://localhost:'+port+'/'+req.file.originalname});
    }
  });
  */

  co(function* () {

	  var stream = fs.createReadStream(req.file.path);
	  var result = yield client.putStream( req.file.originalname , stream);
	  // console.log(result);

	  res.json({ ok: true ,info: result.url  });

	}).catch(function (err) {
	  console.log(err);
   });

});

app.listen(port, () => {
  console.log("[Server] localhost:" + port);
});


