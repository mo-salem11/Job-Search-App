
import { createTransport } from "nodemailer";


export function sendEmail(resetCode,email) {
    const transporter = createTransport({
        service: 'gmail',
        auth: {
            user:process.env.USER_EMAIL,
            pass: process.env.USER_PASS
        },
    });
    async function main() {
        const info = await transporter.sendMail({
            from:process.env.USER_EMAIL, // sender address
            to: email, // list of receivers
            subject: "Job Search App", // Subject line
            html: `
              <h3>To verify your password</h3>
             <h3>Submit this reset password code: </h3>
             <h2 style="background-color:red;color:white;text-align:center;font-size:20px">${resetCode}</h2>
            `, // html body
        });
        console.log("Message sent: %s", info.messageId);
    }

    main().catch(console.error);
}