// Date Helpers
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatTime = (time) => {
  return new Date(time).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

// String Helpers
export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const truncate = (str, length) => {
  return str.length > length ? str.substring(0, length) + '...' : str;
};

// Array Helpers
export const removeDuplicates = (arr) => {
  return [...new Set(arr)];
};

// Object Helpers
export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};
