var express = require('express');
var router = express.Router();
var PassThrough=require("stream")
var QRCode = require('qrcode')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendStatus(400);
});

router.get('/qrcode/:userid', async (req, res, next)=>{
  var dataurl=await QRCode.toDataURL(JSON.stringify({userid:req.params.userid}), { errorCorrectionLevel: 'Q', width:300 });
  res.set('Content-Type', 'text/html');
  res.send(Buffer.from('<html><body><img src=\"'+dataurl+'\"/></body></html>'));
})
router.get('/qrcodeimage/:userid', async (req, res, next)=>{
  const qrStream = new PassThrough();
  var result=await QRCode.toFileStream(JSON.stringify({userid:req.params.userid}), { errorCorrectionLevel: 'Q', width:300 });
  qrStream.pipe(res);
})
module.exports = router;
