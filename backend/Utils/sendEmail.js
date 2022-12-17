require('dotenv').config() 
const nodemailer = require('nodemailer')

const sendEmail = async (options)=>{
    const transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false, 
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });
      const mailoption={
        from:process.env.SMTP_USER,
        to:options.to,
        subject:options.subject,
        html:options.html
      }
      await transport.sendMail(mailoption)
}

module.exports=sendEmail