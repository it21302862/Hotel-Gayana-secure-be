const ejs = require("ejs");
const fs = require("fs");
const nodemailer = require("nodemailer");
const path = require("path");

const sendEmailService = async (type, data, to, subject, file) => {
    try {
        // Construct the path to the email template
        const filePath = path.join(__dirname, `../html-templates/${type}`);
        
        // Read and render the template
        const html = fs.readFileSync(filePath, "utf8");
        const parsed = ejs.render(html, data);
        
        // Create a transporter for sending emails
        const transporter = nodemailer.createTransport({
            service: "Outlook365",
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT),
            secure: false,
            requireTLS: true,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
        
        // Set up attachments if provided
        const attachments = [];
        if (file) {
            attachments.push({
                filename: file.fileName,
                content: file.stream,
            });
        }
        
        // Send the email
        await transporter.sendMail({
            from: process.env.EMAIL_USERNAME,
            to, // List of receivers
            subject, // Subject line
            html: parsed,
            attachments,
        });
    } catch (e) {
        // Handle errors
        throw e;
    }
};

module.exports = { sendEmailService };
