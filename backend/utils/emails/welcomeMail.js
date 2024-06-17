// // Import the necessary modules here
// import dotenv from 'dotenv'
// dotenv.config();
// import nodemailer from 'nodemailer';

// export const sendWelcomeEmail = async (user) => {
//   // Write your code here
//   try{
//   console.log(process.env.STORFLEET_SMPT_MAIL);
//   console.log(process.env.STORFLEET_SMPT_MAIL_PASSWORD);
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user:  process.env.STORFLEET_SMPT_MAIL,
//       pass:  process.env.STORFLEET_SMPT_MAIL_PASSWORD,
//     },
//   });
  

// const mailOptions = {
//     from: process.env.STORFLEET_SMPT_MAIL,
//     to: user.email,
//     subject: 'WelCome to StoreFleet',
//     html: `
//     <div style="text-align: center;">
//       <img src="cid:logo" alt="Logo" style="width: 100px; height: auto;"/>
//       <h1 style="color: purple;">WelCome to StoreFleet</h1>
//       <p style="color: purple;">Hello ${user.name}</p>
//       <p style="color: purple;">Thank you for registering in storefleet! We are excited to have you with us. Click the button below to get started.</p>
//       <a href="/api/storefleet/signup" style="display: inline-block; padding: 10px 20px; color: white; background-color: #007BFF; text-decoration: none; border-radius: 5px;">Get Started</a>
//     </div>
//   `,
//   attachments: [{
//     filename: 'logo1-32230.png',
//     path: 'uploads/logo1-32230.png',
//     cid: 'logo'
//   }]
//   };

//    transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log(error);
//       return {status: 500, 'message': 'Error sending OTP'}
//     }
//   });
// }catch(err){
//   console.log(err);
// }
// };

import dotenv from 'dotenv';
dotenv.config();
import nodemailer from 'nodemailer';

export const sendWelcomeEmail = async (users) => {
  try {

    const user = process.env.STORFLEET_SMPT_MAIL;
    const pass = process.env.STORFLEET_SMPT_MAIL_PASSWORD;
    
    // Create a transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user,
        pass
      },
    });

    // Define the email options
    const mailOptions = {
      from: process.env.STORFLEET_SMPT_MAIL,
      to: users.email,
      subject: 'Welcome to StoreFleet',
      html: `
      <div style="text-align: center;">
        <img src="cid:logo" alt="Logo" style="width: 100px; height: auto;"/>
        <h1 style="color: purple;">Welcome to StoreFleet</h1>
        <p style="color: purple;">Hello ${users.name},</p>
        <p style="color: purple;">Thank you for registering with StoreFleet! We are excited to have you with us. Click the button below to get started.</p>
        <a href="/api/storefleet/signup" style="display: inline-block; padding: 10px 20px; color: white; background-color: #007BFF; text-decoration: none; border-radius: 5px;">Get Started</a>
      </div>
      `,
      attachments: [{
        filename: 'logo1-32230.png',
        path: 'uploads/logo1-32230.png',
        cid: 'logo'
      }]
    };

    // Send the email using the transporter
    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent: ' + info.response);
    return { status: 200, message: 'Welcome email sent' };
  } catch (error) {
    console.error('Error sending email:', error);
    return { status: 500, message: 'Error sending welcome email' };
  }
};