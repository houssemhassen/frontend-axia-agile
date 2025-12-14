export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

export const validateRequired = (...fields: string[]): boolean => {
  return fields.every(field => field.trim().length > 0);
};

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export const validateUserForm = (
  firstName: string,
  lastName: string,
  email: string,
  password?: string,
  requirePassword: boolean = false
): ValidationResult => {
  const fields = requirePassword 
    ? [firstName, lastName, email, password || ""]
    : [firstName, lastName, email];

  if (!validateRequired(...fields)) {
    return { isValid: false, error: "Please fill in all required fields" };
  }

  if (!validateEmail(email)) {
    return { isValid: false, error: "Please enter a valid email address" };
  }

  if (requirePassword && password && !validatePassword(password)) {
    return { isValid: false, error: "Password must be at least 6 characters long" };
  }

  return { isValid: true };
};