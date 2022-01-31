import { Request, Response, NextFunction } from "express";
import nodemailer from "nodemailer";
import { env } from "process";

export const sendToken = (user: any, statusCode: number, res: Response) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({
    success: true,
    token,
  });
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
