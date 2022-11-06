import {AuthServices} from '@abusayid693/gerome-api';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {Form, Formik, FormikHelpers} from 'formik';
import _ from 'lodash';
import Link from 'next/link';
import {ButtonDark, ButtonLight, FieldInput, PasswordInput} from '../../components';
import type initialValue from './FormModal/initialValues';
import initialValues from './FormModal/initialValues';
import validationSchema from './FormModal/validationSchema';

const Index = () => {
  const api = new AuthServices();

  const __hanldeFormSubmit = async (values: typeof initialValue, actions: FormikHelpers<typeof initialValue>) => {
    try {
      await api.register(_.omit(values, 'confirmPassword'));
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };

  return (
    <div className="border-2 border-slate-300 rounded max-w-lg display-block m-auto p-4">
      <h2 className="w-full text-center border-b-2 border-b-black pb-2">Sign Up</h2>
      <Formik onSubmit={__hanldeFormSubmit} validationSchema={validationSchema} initialValues={initialValues}>
        <Form>
          <div className="pt-5">
            <FieldInput name="username" placeholder="Username" iconRight={faUser} />
            <FieldInput name="email" placeholder="Email" />
            <PasswordInput name="password" placeholder="Password" />
            <PasswordInput name="confirmPassword" placeholder="Confirm Password" />
            <ButtonDark>Sign Up</ButtonDark>
            <p className="pt-2 text-black text-xs opacity-7">By signing up, you agree to the Terms of Service and Privacy Policy</p>
            <div className="py-2 flex flex-row gap-2 items-center text-sm text-gray-700">
              <hr className="w-full" />
              OR
              <hr className="w-full" />
            </div>
            <Link href={'/login'}>
              <ButtonLight>Sign In</ButtonLight>
            </Link>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Index;
