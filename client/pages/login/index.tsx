import {Form, Formik} from 'formik';
import Link from 'next/link';
import {ButtonDark, ButtonLight, FieldInput, PasswordInput} from '../../components';
import initialValues from './FormModal/initialValues';
import validationSchema from './FormModal/validationSchema';
// import {AuthServices} from "@abusayid693/gerome-api"

const Index = () => {
  return (
    <div className="border-2 border-slate-300 rounded max-w-lg display-block m-auto p-4">
      <h2 className="w-full text-center border-b-2 border-b-black pb-2">Sign Up</h2>
      <Formik onSubmit={() => {}} validationSchema={validationSchema} initialValues={initialValues}>
        <Form>
          <div className="pt-5">
            <FieldInput name="email" />
            <PasswordInput name="password" />
            <ButtonDark>Sign In</ButtonDark>
            <p className="pt-2 text-black text-xs opacity-7">By logging in, you agree to the Terms of Service and Privacy Policy</p>
            <div className="py-2 flex flex-row gap-2 items-center text-sm text-gray-700">
              <hr className="w-full" />
              OR
              <hr className="w-full" />
            </div>
            <Link href={'/signup'}>
              <ButtonLight>Sign Up</ButtonLight>
            </Link>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Index;
