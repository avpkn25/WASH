// Utility for sending emails from frontend
export async function sendBulkEmails({ emails, subject, message }) {
  const response = await fetch("http://localhost:5000/api/send-emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ emails, subject, message }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to send emails");
  }
  return response.json();
}
