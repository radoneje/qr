var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendStatus(400);
});

router.get('/qrcode/:userid', async (req, res, next)=>{

  var QRCode = require('qrcode')
  var dataurl=await QRCode.toDataURL(JSON.stringify({userid:req.params.userid}), { errorCorrectionLevel: 'Q', width:300 });
  res.set('Content-Type', 'text/html');
  res.send(Buffer.from('<html><body><img src=\"'+dataurl+'\"/></body></html>'));
})
module.exports = router;
