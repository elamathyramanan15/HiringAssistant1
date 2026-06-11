export const validateEmail = (email) => {
  if (!email) return "Email is required";

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    return "Enter a valid email address";
  }

  return "";
};

export const validatePassword = (password) => {
  if (!password) return "Password is required";
  return "";
};
export const validatePhone = (phone) => {
  if (!phone) return "Phone number is required";

  const phonePattern = /^[0-9]{10}$/;

  if (!phonePattern.test(phone)) {
    return "Enter a valid 10-digit phone number";
  }

  return "";
};

export const validateStrongPassword = (password) => {
  if (!password) return "Password is required";

  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

  if (!passwordPattern.test(password)) {
    return "Password must contain uppercase, lowercase, number and special character";
  }

  return "";
};

export const validateName = (name, fieldName) => {
  if (!name.trim()) return `${fieldName} is required`;

  const namePattern = /^[A-Za-z ]+$/;

  if (!namePattern.test(name)) {
    return `${fieldName} should contain only letters`;
  }

  return "";
};
