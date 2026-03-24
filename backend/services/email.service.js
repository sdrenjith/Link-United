const nodemailer = require("nodemailer");

// Create email transporter using environment variables
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
};

const sendEnquiryEmail = async (enquiry) => {
  try {
    const transporter = createTransporter();

    // Email to company
    const companyEmailContent = `
      <html>
        <body style="font-family: Arial, sans-serif; color: #333;">
          <h2>New Enquiry Received</h2>
          <p><strong>Name:</strong> ${enquiry.name}</p>
          <p><strong>Company:</strong> ${enquiry.company}</p>
          <p><strong>Email:</strong> ${enquiry.email}</p>
          <p><strong>Phone:</strong> ${enquiry.phone}</p>
          <p><strong>Message:</strong></p>
          <p>${enquiry.message}</p>
          <hr />
          <p style="font-size: 12px; color: #666;">This is an automated email from Link United website enquiry form.</p>
        </body>
      </html>
    `;

    // Email to user (confirmation)
    const userEmailContent = `
      <html>
        <body style="font-family: Arial, sans-serif; color: #333;">
          <h2>Thank You for Your Enquiry</h2>
          <p>Dear ${enquiry.name},</p>
          <p>We have received your enquiry and will get back to you shortly.</p>
          <p><strong>Your Details:</strong></p>
          <p>Name: ${enquiry.name}</p>
          <p>Company: ${enquiry.company}</p>
          <p>Email: ${enquiry.email}</p>
          <p>Phone: ${enquiry.phone}</p>
          <hr />
          <p>Our team will review your requirements and contact you within 24 business hours.</p>
          <p>Best regards,<br />Link United International Team</p>
        </body>
      </html>
    `;

    // Send email to company
    await transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL,
      to: process.env.COMPANY_EMAIL,
      subject: `New Enquiry from ${enquiry.name} - ${enquiry.company}`,
      html: companyEmailContent,
      replyTo: enquiry.email,
    });

    // Send confirmation email to user
    await transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL,
      to: enquiry.email,
      subject: "Enquiry Received - Link United International",
      html: userEmailContent,
    });

    console.log(`Enquiry emails sent successfully for ${enquiry.email}`);
  } catch (error) {
    console.error("Error sending enquiry emails:", error);
    // Don't throw error - we still want to save to DB even if email fails
  }
};

module.exports = {
  sendEnquiryEmail,
};
