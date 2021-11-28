export const newArticleValidationSchema = {
  title: {
    required: {
      value: true,
      message: 'This field is required!',
    },
  },
  content: {
    required: {
      value: true,
      message: 'This field is required!',
    },
  },
};