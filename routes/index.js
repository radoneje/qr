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
  var result=await QRCode.toFile("/tmp/qr.png", JSON.stringify({userid:req.params.userid}), { errorCorrectionLevel: 'Q', width:300 });
  res.sendFile("/tmp/qr.png")
})
router.post( "/sentEmail", async (req, res, next)=>{
  await sentEmail(req.body.subj, req.body.html, req.body.to)
  res.json( 1)
})
async function sentEmail(subj,html, to){
  try {
    console.log("sentEmail 1 " , to)
    const nodemailer = require("nodemailer");
    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
       host: "smtp.yandex.ru",
      //host: "mail.nic.ru",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
          user: 'QR@sber.university', // generated ethereal user
          pass: 'e24-Pkb-73A-Hfy', // generated ethereal password
        //user: 'd@rustv.ru', // generated ethereal user
        //pass: "Gbplfgbplf13", // generated ethereal password
      },
    });
    console.log("sentEmail 2", transporter.host)
    let info = await transporter.sendMail({
      from: '"QR code" <qr@sber.university>', // sender address
      to: to, // list of receivers
      subject: subj, // Subject line
     // text: "html", // plain text body
       html: html, // html body
    });
    console.log("sentEmail 3")
  }
  catch (e) {
    console.log(e);
    console.log("sentEmail 4")
    return false;
  }
  return true

}
module.exports = router;
