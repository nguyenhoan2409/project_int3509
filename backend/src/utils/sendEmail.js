const nodemailer = require("nodemailer");
const dotenv = require('dotenv'); 
 

dotenv.config(); 
module.exports = async (email, subject, text) => {
	try {
		const transporter = nodemailer.createTransport({
			host: process.env.HOST,
            service: process.env.SERVICE,
			port: process.env.EMAIL_PORT,
			secure: process.env.SECURE,
			auth: {
				user: process.env.USER,
				pass: process.env.PASS,
			},
		});

		await transporter.sendMail({
			from: process.env.USER,
			to: email,
			subject: subject,
			html: '<p>Vui lòng nhấn vào link sau để xác thực tài khoản' + '<br>' + 
            `<a href=${text}>Click vào đây</a>`
		});
		console.log("email sent successfully");
	} catch (error) {
		console.log("email not sent!");
		console.log(error);
		return error;
	}
};