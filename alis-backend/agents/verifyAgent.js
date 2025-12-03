export async function verifyAgent(text) {
  const pan = (text || "").match(/[A-Z]{5}[0-9]{4}[A-Z]/i);
  if (pan) {
    return { status: "verified", pan: pan[0].toUpperCase(), message: "PAN looks valid (format check only)." };
  }
  return { status: "manual_check", message: "PAN not detected. Provide PAN in format ABCDE1234F." };
}
