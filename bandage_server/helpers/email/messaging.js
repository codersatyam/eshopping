const nodemailer = require("nodemailer");
const sendgridTransporter = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport(sendgridTransporter(
    {
        auth : {
            api_key : "csd"
        }
    }
));

const sendEmail = async ({email}) => {
    transporter.sendMail({
        to:email,
        from : "yourmarts99@gmail.com",
        subject:"Welcome to YourMarts",
        html:"<h1>Successfully register to YourMarts. Please enjoy your shopping.</h1>"

    }).then((result) => {
        console.log("email done")
          return result;
    }).catch((error) => {
        console.log("unable to send email",error);
        return error;
    })
}

module.exports = sendEmail;