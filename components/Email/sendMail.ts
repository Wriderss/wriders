import { useQuery } from "@tanstack/react-query";
import nodemailer from "nodemailer";

function sendMailNotification(authorId: string) {
  const fetchAllEmailsById = async () => {
    const response = await fetch("/api/getEmails", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(authorId),
    });
    return response.json();
  };

  const {
    data: emails,
    isSuccess,
    isError,
    isLoading,
  } = useQuery(["mail-list"], fetchAllEmailsById);

  const smtpTransport = nodemailer.createTransport("SMTP", {
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      // user: "adityapainuli2004@gmail.com",
      // pass: "aditya7838",
      user: process.env.EMAIL,
      pass: process.env.EMAILPASS,
    },
  });

  // emails_list.forEach(function(to,i,array){
  //   msg.to = to;
  //   smtpTransport.sendMail(msg,function(err){
  //     if(err) {
  //       console.log('Sending to ' + to + ' failed: ' + err);
  //       return
  //     }
  //     else {
  //       console.log('Sent to ' + to);
  //     }
  //     if (i === emails_list.length - 1) { msg.transport.close();
  //   })
  // })
  emails.forEach(function (email: string) {
    const msg = {
      to: email,
      from: "adityapainuli2004@gmail.com",
      subject: "Checking for sending mails",
      text: "Checking mail Functionality if you see this mail please ignore or kindly contact the developer for further more info",
    };
    smtpTransport.sendMail(msg, function (error, data) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + data.response);
      }
    });
  });
}

export default sendMailNotification;
