// This file contains the API utility for register and donate
export async function registerAndDonateAPI(formData) {
  const response = await fetch("/api/user/register-and-donate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error("Server returned an invalid response.");
  }
  if (!response.ok) {
    throw new Error(data?.message || "Failed to register and donate");
  }
  return data;
}
