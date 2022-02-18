export function emailValidation(email) {
  // Found basic Regex online
  const regex = /\S+@\S+\.\S+/;
  if (!email) return "Please put in email";
  else if (!regex.test(email))
    return "This is not a valid email address. Please try again";
  else return "";
}
