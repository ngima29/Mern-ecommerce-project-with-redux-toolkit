require('dotenv').config() 
const nodemailer = require('nodemailer')

const sendEmail =  options=>{
   try {
    console.log('email calling')
    const transport = nodemailer.createTransport({
      // host: process.env.SMTP_HOST,
      // port: process.env.SMTP_PORT,
      // secure: true,
      service:"gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    console.log('createTransport celled')
    const mailoption={
      from:options.from,
      to:options.to,
      subject:options.subject,
      text:options.text,
      html:options.html
    }
    console.log('option fetced')
     transport.sendMail(mailoption)
     console.log('email end fron sendemail')
   } catch (error) {
    console.log(error.message)
   }
}

module.exports=sendEmail