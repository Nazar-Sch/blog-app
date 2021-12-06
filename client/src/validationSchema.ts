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
    custom: {
      isValid: (value: string) => value.length > 25,
      message: 'Your story is too short. Min characters length 25'
    }
  },
};