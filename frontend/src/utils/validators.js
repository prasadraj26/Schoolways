// Email Validation
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password Validation
export const isValidPassword = (password) => {
  return password.length >= 8;
};

// Phone Validation
export const isValidPhone = (phone) => {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

// Name Validation
export const isValidName = (name) => {
  return name.trim().length >= 2;
};

// Form Validation
export const validateForm = (formData, rules) => {
  const errors = {};
  
  Object.keys(rules).forEach(field => {
    const validator = rules[field];
    if (!validator(formData[field])) {
      errors[field] = `${field} is invalid`;
    }
  });

  return errors;
};
