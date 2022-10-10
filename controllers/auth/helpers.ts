import nodemailer from "nodemailer";
import { env } from "process";


export const checkIsUserExists = (error:any)=>{
    return  (error.code === 11000) ? true : false;
}

export const getToken = (user: any) => {
  const token = user.getSignedToken();
 return token
};

export const sendMail = async (mailBody: any) => {
  const trans = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: env.MAIL_USER,
      pass: env.MAIL_PASS,
    },
  });

  const options = {
    from: env.TEST_FROM_EMAIL,
    to: mailBody.to,
    subject: mailBody.subject,
    html: mailBody.html,
  };

  trans.sendMail(options, (err, info)=>{
    if(err)
     console.log(err)
    else
     console.log(info) 
  })
};
