import * as Yup from 'yup';

export default Yup.object().shape({
  username: Yup.string().min(5, 'Too short').max(15, 'Too long').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
  confirmPassword: Yup.string()
    .required('Required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
});
