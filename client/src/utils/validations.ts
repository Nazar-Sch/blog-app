import * as Yup from 'yup';

// at least one uppercase
const upperCasePart = "(?=.*[A-Z])";
// at least one lowercase
const lowerCasePart = "(?=.*[a-z])";
// at least one digit
const digitPart = "(?=.*[0-9])";
// at least one special chart
const specialChrPart = "(?=.*[^A-Za-z0-9])";
const strongPswPattern = new RegExp(
  `^${upperCasePart}${lowerCasePart}${digitPart}${specialChrPart}`
);

export const validationSignIn = Yup.object().shape({
  email: Yup.string().email().required('Email field is required.'),
  password: Yup.string()
    .matches(strongPswPattern)
    .required(
      'Please valid password. One uppercase, one lowercase, one special character and no spaces'
    ),
});

export const validationSignUp = Yup.object().shape({
  email: Yup.string().email().required('Email field is required.'),
  firstName: Yup.string().required('First name field is required'),
  lastName: Yup.string().required('Last name field is required'),
  password: Yup.string()
    .matches(strongPswPattern)
    .required(
      'Please valid password. One uppercase, one lowercase, one special character and no spaces'
    ),
});