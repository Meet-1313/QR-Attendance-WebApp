// server/utils/mailer.js
const nodemailer = require('nodemailer');

// This function will generate test credentials and a transporter
const setupTransporter = async () => {
    // Generate test SMTP service account from ethereal.email
    let testAccount = await nodemailer.createTestAccount();

    // Log the credentials and preview URL to the console
    console.log(`
    ***************************************************
    Ethereal Email Credentials:
    User: ${testAccount.user}
    Pass: ${testAccount.pass}
    Preview Sent Emails Here: ${nodemailer.getTestMessageUrl(null)}
    ***************************************************
    `);

    // Create a reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });

    return transporter;
};

const sendLowAttendanceEmail = async (parentEmail, studentName) => {
    const transporter = await setupTransporter();

    // Send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"QR Attendance System" <noreply@qrapps.com>',
        to: parentEmail,
        subject: `Low Attendance Warning for ${studentName}`,
        text: `Dear Parent/Guardian,\n\nThis is to inform you that the attendance for ${studentName} has fallen below the required threshold. Please contact the school for more details.\n\nSincerely,\nSchool Administration`,
        html: `<p>Dear Parent/Guardian,</p><p>This is to inform you that the attendance for <b>${studentName}</b> has fallen below the required threshold. Please contact the school for more details.</p><p>Sincerely,<br/>School Administration</p>`,
    });

    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
};

module.exports = { sendLowAttendanceEmail };