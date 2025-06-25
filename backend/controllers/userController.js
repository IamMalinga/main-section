const User = require('../models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
require('dotenv').config();


const createToken = (_id) => {
  if (!process.env.SECRET) {
    throw new Error('JWT Secret not set in environment variables');
  }
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '1d' });
};



const getEmailTemplate = (title, message, verificationCode) => {
  return `
  <html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        padding: 20px;
      }
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      .header {
        text-align: center;
        background-color: #007bff;
        padding: 15px 0;
        color: #ffffff;
        border-radius: 8px 8px 0 0;
        font-size: 24px;
        font-weight: bold;
      }
      .content {
        margin: 20px 0;
        font-size: 16px;
        line-height: 1.5;
        color: #333333;
        text-align: center;
      }
      .code {
        display: inline-block;
        font-size: 22px;
        font-weight: bold;
        color: #007bff;
        margin: 10px 0;
        background-color: #f1f1f1;
        padding: 10px 20px;
        border-radius: 8px;
      }
      .footer {
        text-align: center;
        margin-top: 20px;
        font-size: 12px;
        color: #888888;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">
        ${title}
      </div>
      <div class="content">
        <p>${message}</p>
        <p class="code">${verificationCode}</p>
      </div>
      <div class="footer">
        <p>If you didn’t request this email, you can ignore this message.</p>
      </div>
    </div>
  </body>
  </html>`;
};




const forgotEmailTemplate = (title, message, resetURL) => {
  return `
  <html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        padding: 20px;
      }
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      .header {
        text-align: center;
        background-color: #007bff;
        padding: 15px 0;
        color: #ffffff;
        border-radius: 8px 8px 0 0;
        font-size: 24px;
        font-weight: bold;
      }
      .content {
        margin: 20px 0;
        font-size: 16px;
        line-height: 1.5;
        color: #333333;
        text-align: center;
      }
      .code {
        display: inline-block;
        font-size: 16px;
        font-weight: bold;
        color: #007bff;
        margin: 10px 0;
        padding: 10px 20px;
        border-radius: 8px;
        text-decoration: none;
        background-color: #f1f1f1;
      }
      .footer {
        text-align: center;
        margin-top: 20px;
        font-size: 12px;
        color: #888888;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">
        ${title}
      </div>
      <div class="content">
        <p>${message}</p>
        <a href="${resetURL}" class="code">Reset Password</a>
      </div>
      <div class="footer">
        <p>If you didn’t request this email, you can ignore this message.</p>
      </div>
    </div>
  </body>
  </html>`;
};




const sendVerificationEmail = async (user, req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false
    }
    });

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: 'Email Verification for Travel Sri',
      text: `Your verification code is: ${user.verificationCode}`,
      html: getEmailTemplate(
        "Verify Your Email",
        "Please verify your email by entering the following code:",
        user.verificationCode
      ),
    };

    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${user.email}`);
  } catch (error) {
    console.error('Error sending verification email:', error.message);
    throw new Error('Failed to send verification email');
  }
};




const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password -verificationToken -verificationTokenExpires');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const updateUserDetails = async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true }).select('-password -verificationToken -verificationTokenExpires');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const sendInviteEmail = async (email, req) => {
  try {
    const registrationUrl = `${req.protocol}://${req.get('host')}/register`;
    const transporter = nodemailer.createTransport({
      host: 'smtp-relay.brevo.com',
      port: 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false
    }
    });

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: 'Invitation to Join Our Platform',
      text: `You have been invited to join our platform. Register using the following link: ${registrationUrl}`,
      html: `<p>You have been invited to join our platform. Register using the following link: <a href="${registrationUrl}">Register Here</a></p>`,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending invite email:', error);
    throw new Error('Failed to send invite email');
  }
};


const register = async (req, res) => {
  const { firstName, lastName, email, address, bod, gender, password, profilePicUrl } = req.body;

  try {
    const user = await User.signup(firstName, lastName, email, address, bod, gender, password, profilePicUrl);
    

    console.log('User created:', user);

    await sendVerificationEmail(user, req, res);

    res.status(200).json({ 
      email, 
      message: 'Verification email sent. Please check your email.',
    });
  } catch (error) {
    console.error('Error during registration:', error); 
    res.status(400).json({ error: error.message });
  }
};



const verifyEmail = async (req, res) => {
  try {
    const user = await User.findOne({
      verificationToken: req.params.token,
      verificationTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: 'Token is invalid or has expired.' });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Email verified successfully!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

  
    if (!user.isVerified) {
      const currentTime = Date.now();

      const isVerificationCodeExpired = (verificationCodeExpires) => {
        return new Date(verificationCodeExpires) < Date.now();
      };

      const expired = isVerificationCodeExpired(user.verificationCodeExpires);

      if (expired) {
            console.log("Verification code has expired");
      } else {
            console.log("Verification code is still valid");
      }

      if (!user.verificationCodeExpires || user.verificationCodeExpires < currentTime) {
        return res.status(403).json({
          error: "Verification code has expired. Please request a new code.",
          redirectTo: "/verify", 
          expired: true,
        });
      }

      return res.status(403).json({
        error: "Email is not verified yet.",
        redirectTo: "/verify",
        expired: false,
      });
    }


    const token = createToken(user._id);

    res.status(200).json({
      _id: user._id,
      email: user.email,
      token,
      isVerified: user.isVerified,
      profilePic: user.profilePic,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};




const checkFriend = async (req, res) => {
  try {
    const { email } = req.body;
    const friend = await User.findOne({ email });
    res.status(200).json({ exists: !!friend });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const inviteFriend = async (req, res) => {
  const { email } = req.body;

  try {
    const friend = await User.findOne({ email });
    if (friend) {
      return res.status(200).json({ message: 'Friend is already registered.' });
    } else {
      await sendInviteEmail(email, req);
      return res.status(200).json({ message: 'Invite sent successfully.' });
    }
  } catch (error) {
    console.error('Error sending invite:', error);
    return res.status(500).json({ error: 'Failed to send invite.' });
  }
};


const searchUsers = async (req, res) => {
  try {
    const { query } = req.body; 
    console.log("Search query received:", query); 

    if (!query) return res.status(400).json({ error: 'Search query is required' });

    const regex = new RegExp(query, 'i'); 
    const users = await User.find({
      $or: [
        { email: regex },
        { firstName: regex },
        { lastName: regex }
      ]
    }).select('-password'); 

    console.log("Users found:", users);
    res.status(200).json(users);
  } catch (error) {
    console.error("Error occurred in searchUsers function:", error); 
    res.status(500).json({ error: error.message });
  }
};



const addContact = async (req, res) => {
  try {
    const { contactId } = req.body;
    if (!mongoose.Types.ObjectId.isValid(contactId)) {
      return res.status(400).json({ error: 'Invalid contact ID' });
    }

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    await user.addContact(contactId);
    res.status(200).json({ message: 'Contact added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const verifyCode = async (req, res) => {
  const { email, code } = req.body;
  console.log(email)

  try {
    const user = await User.verifyCode(email, code);
    res.status(200).json({ message: 'Email verified successfully!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const resendVerificationCode = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found');
    if (user.isVerified) throw new Error('Email is already verified');

    user.verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.verificationCodeExpires = Date.now() + 3 * 60 * 1000; // 3 minutes
    await user.save();

    await sendVerificationEmail(user);
    res.status(200).json({ message: 'Verification code resent' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'No user found with this email address.' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpires = Date.now() + 3600000; 

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpires;
    await user.save();

    const transporter = nodemailer.createTransport({
      host: 'smtp-relay.brevo.com',
      port: 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false
    }
    });

    const resetURL = `${req.protocol}://localhost:3000/reset-password/${resetToken}`;

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: 'Password Reset Request',
      html: forgotEmailTemplate('Password Reset Request', 'You are receiving this email because you (or someone else) have requested to reset the password for your account.Please click on the following link, or paste it into your browser, to complete the process within one hour of receiving it.', resetURL),
    };

    await transporter.sendMail(mailOptions);

    transporter.verify((error, success) => {
      if (error) {
        console.error('SMTP Configuration Error:', error);
      } else {
        console.log('SMTP Configuration is correct:', success);
      }
    });

    res.status(200).json({ message: 'Password reset email sent successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Error while sending the reset password email.' });
  }
};


const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }, 
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired token.' });
    }

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

  
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ message: 'Password reset successfully!' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ error: 'Error while resetting the password.' });
  }
};


const contact = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: "malinga_samarakoon@outlook.com",
      subject: `Contact Form: ${subject}`,
      html: `
        <h2>Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.error("sending email successfully:");
    res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send the message." });
  }
};



module.exports = {
  register,
  login,
  verifyEmail,
  checkFriend,
  inviteFriend,
  getUserDetails,
  updateUserDetails,
  searchUsers,
  addContact,
  verifyCode,
  resendVerificationCode,
  forgotPassword, 
  resetPassword,
  contact
};
