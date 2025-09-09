import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

  
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
        }
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
    }});
    }

   
var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "157287472fba3a",
    pass: "f036f6da4fee32"
  }
});

const verifyhtml = `<p>Click <a href="${process.env.DOMAIN}/
      verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email"
        : "reset your password"
      }
      or copy and paste the  link below in your browser.
      <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
      </p>`

const resetHtml = `<p>Click <a href="${process.env.DOMAIN}/
       forgotPassword?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email"
        : "reset your password"
      }
      or copy and paste the  link below in your browser.
      <br> ${process.env.DOMAIN}/Reset?token=${hashedToken}
      </p>`      

    const mailOptions = {
      from: "saurabh@mailOptions.ai",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: emailType === "VERIFY" ? verifyhtml : resetHtml,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
