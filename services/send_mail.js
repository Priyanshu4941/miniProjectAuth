import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAILID,
        pass: process.env.PASSWORD,
    },
});
 
const sendAuthMail = (email, baseUrl, token) => {
    return new Promise((resolve, reject) => {

        const mailOptions = {
            from: process.env.EMAILID,
            to: email,
            subject: 'Welcome to Email-Verification-Service',
            html: `
                <html>
                <head>
                    <style>
                        /* Add your custom styles here */
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f2f2f2;
                            margin: 0;
                            padding: 0;
                        }
                        .container {
                            max-width: 600px;
                            margin: 0 auto;
                            background-color: #ffffff;
                            border-collapse: collapse;
                        }
                        .header {
                            padding: 20px 0;
                            text-align: center;
                            background-color: #007BFF;
                            color: #ffffff;
                        }
                        .content {
                            padding: 20px;
                        }
                        .footer {
                            padding: 10px 0;
                            text-align: center;
                            background-color: #007BFF;
                            color: #ffffff;
                        }
                        h1 {
                            font-size: 24px;
                            margin: 0;
                        }
                        h2 {
                            font-size: 18px;
                            margin: 0;
                        }
                        p {
                            font-size: 16px;
                            line-height: 1.5;
                            margin: 20px 0;
                        }
                        a {
                            color: #007BFF;
                            text-decoration: none;
                        }
                        a:hover {
                            text-decoration: underline;
                        }
                    </style>
                </head>
                <body>
                    <table class="container" role="presentation" width="100%" cellspacing="0" cellpadding="0">
                        <!-- Header -->
                        <tr>
                            <td class="header">
                                <h1>verification_service_dev</h1>
                            </td>
                        </tr>
                        <!-- Content -->
                        <tr>
                            <td class="content">
                                <h2>Welcome to verification_service-Dev</h2>
                                <p>Thank you for registering with our Portal. To complete your registration, please verify your email by clicking on the provided link:</p>
                                <p>Your Verification link: <strong style="color: #007BFF;">${baseUrl}/auth/verify?token=${token}</strong></p>
                            </td>
                        </tr>
                        <!-- Footer -->
                        <tr>
                            <td class="footer">
                                <p>&copy; ${new Date().getFullYear()} verification_service_Dev. All rights reserved.</p>
                            </td>
                        </tr>
                    </table>
                </body>
                </html>
            `,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject({ Email:email ,message: 'Error sending email', Error: error });
            } else {
                resolve({ Email:email,message: 'Email sent Successfully' });
            }
        });
    });
};

export default sendAuthMail;