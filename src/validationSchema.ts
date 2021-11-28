export const newArticleValidationSchema = {
  title: {
    required: {
      value: true,
      message: 'This field is required!',
    },
    pattern: {
      value: '^[A-Za-z]*$',
      message: "You're not allowed to use special characters!",
    },
  },
  content: {
    required: {
      value: true,
      message: 'This field is required!',
    },
  },
};