import nodemailer from 'nodemailer';

const sendEmail = async(email, generatePassword) => {

    // create an email transporter

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASS
        }
    });

    // Configure email content

    const mailOptions = {
        from: process.env.USER_EMAIL,
        to: email,
        subject: 'Account Created',
        text: `Thank you for creating an account. Your password is: ${generatePassword}`
    };

    // send email

    try{
        const result = await transporter.sendMail(mailOptions);
        // console.log(result);
    }catch(err) {
        // console.log("Email sending failed " + err);
    }

}

export default sendEmail;