
import { createTransport } from "nodemailer";


export function sendEmailForVerify({to,subject,message}) {
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
            to:to, // list of receivers
            subject:subject, // Subject line
            html:message // html body
        });
        console.log("Message sent: %s", info.messageId);
    }

    main().catch(console.error);
}