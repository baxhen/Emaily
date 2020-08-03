const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const validateEmail = (emails: string) => {
  const invalidEmails = emails
    .split(',')
    .map((email) => email.trim())
    .filter((email) => {
      if (email === '') {
        return false;
      }
      return re.test(email) === false;
    });

  if (invalidEmails.length) {
    return `These emails are invalid ${invalidEmails}`;
  }
  return;
};
