import nodemailer from "nodemailer";

// Gmail SMTP with STARTTLS (port 587)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,            // ✅ use port 587 instead of 465
  secure: false,        // ✅ must be false for STARTTLS
  auth: {
    user: process.env.EMAIL_USER || "your-email@gmail.com",
    pass: process.env.EMAIL_PASS || "your-app-password",
  },
});

const sendBulkEmail = async (req, res) => {
  const { emails, subject, message } = req.body;

  console.log("📧 Incoming request:");
  console.log("Emails:", emails);
  console.log("Subject:", subject);
  console.log("Message:", message);

  if (!emails || !Array.isArray(emails) || emails.length === 0) {
    return res.status(400).json({ error: "No emails provided" });
  }

  const finalSubject = subject || "Notification from Admin";
  const finalMessage =
    message ||
    `Dear User,

This is an important notification from the Admin Dashboard.

Thank you,
Admin Team`;

  try {
    const toField = emails.join(",");
    const mailOptions = {
      from: process.env.EMAIL_USER || "your-email@gmail.com",
      to: toField,
      subject: finalSubject,
      text: finalMessage,
    };

    console.log("📦 Mail Options:", mailOptions);

    const result = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", result.response);

    res.json({ success: true, message: "Emails sent successfully" });
  } catch (error) {
    console.error("❌ Email send error:", error);
    res.status(500).json({
      error: "Failed to send emails",
      details: error.message,
      stack: error.stack,
    });
  }
};

export { sendBulkEmail };
