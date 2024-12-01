const nodemailer = require('nodemailer');
const xlsx = require('xlsx');
const path = require('path');
require('dotenv').config();

// Email credentials and transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail',  // For Gmail, change if using another provider
    auth: {
        user: process.env.EMAIL_ID,  // Use environment variables for sensitive data
        pass: process.env.PASSWORD  // Use app-specific password for Gmail or consider secure storage
    }
});

function loadEmailAddresses(filePath) {
    const workbook = xlsx.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]]; // Get the first sheet
    const emails = [];

    // Loop through cells from D2 to D101 (when row index 1 to 100 for column D)
    for (let row = process.env.LOWER_INDEX; row <= process.env.UPPER_INDEX; row++) {
        const cellAddress = `D${row}`;
        const email = sheet[cellAddress]?.v; // Get the value in cell D2 to D101
        if (email) {
            emails.push(email);
        }
    }
    //console.log(emails);
    return emails;

}

// Send email function
async function sendEmail(recipientEmail, subject, body) {
    const mailOptions = {
        from: process.env.EMAIL_ID,
        to: recipientEmail,
        subject: subject,
        html: body
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${recipientEmail}`);
    } catch (error) {
        console.error(`Failed to send email to ${recipientEmail}: ${error}`);
    }
}

// Main function to load emails and send them
async function main() {
    const emailList = loadEmailAddresses(path.join(__dirname, 'emails.xlsx'));

    if (emailList.length === 0) {
        console.log('No emails found in the provided range.');
        return;
    }

    const subject = `${process.env.EMAIL_TITLE}`;
    const body = `
    ${process.env.EMAIL_BODY_CONTENT}
    
    Best regards,<br>
    <b>${process.env.SENDER_NAME}</b><br>
    <b>Resume</b>: ${process.env.RESUME_URL} <br>
    <b>Phone</b>: ${process.env.PHONE_NUMBER}
    `;
    
    console.log(emailList);
    for (const email of emailList) {
        await sendEmail(email, subject, body);
    }
}

main().catch(console.error);