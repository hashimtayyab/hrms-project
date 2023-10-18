const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const message = {
    to: "hashimtayyab78@gmail.com",
    from: {
        name: "HRMS Verification",
        email: process.env.FROM_EMAIL
    },
    templateId: process.env.TEMPLATE_ID,
    DynamicTemplateData :{
    name: "HRMS",
    }
}

const sendMail = () => {
    try {
        sgMail.send(message)
        .then(() => console.log("Email sent successfully"))
        .catch((err) => console.log(err));
    } catch (error) {
        console.log(error);
    }
}

sendMail();