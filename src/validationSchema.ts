export const validationShcema = {
  nickname: {
    required: {
      value: true,
      message: 'This field is required!',
    },
    pattern: {
      value: '^[A-Za-z]*$',
      message: "You're not allowed to use special characters!",
    },
  },
  short_description: {
    required: {
      value: true,
      message: 'This field is required!',
    },
    pattern: {
      value: '^[A-Za-z]*$',
      message: "You're not allowed to use special characters!",
    },
  },
};