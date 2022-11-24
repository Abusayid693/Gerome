import {Form, Formik, FormikHelpers} from 'formik';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import {useCookies} from 'react-cookie';
import {AuthServices} from '../../../packages/gerome-api';
import {ButtonDark, ButtonLight, FieldInput, PasswordInput} from '../../components';
import {useAuth} from '../../hooks/useAuth';
import {useToast} from '../../hooks/useToast';
import {ErrorFormat} from '../../util';
import {COOKIE} from '../../util/cookie';
import initialValues from './FormModal/initialValues';
import validationSchema from './FormModal/validationSchema';

const Index = () => {
  const api = new AuthServices();
  const toast = useToast();
  const auth = useAuth();
  const router = useRouter();
  const [_, __, removeCookie] = useCookies([COOKIE]);

  const __hanldeFormSubmit = async (values: typeof initialValues, actions: FormikHelpers<typeof initialValues>) => {
    try {
      const {data} = await api.login({
        email: values.email,
        password: values.password
      });
      auth.login({refreshToken: data.data.refreshToken, user: data.data.user});
      router.push('/');
    } catch (error: any) {
      if (error.response.status !== 500) {
        const errors = error.response.data.errors;
        actions.setErrors(ErrorFormat(errors));
      } else {
        toast('ERROR', 'Login error');
      }
    }
  };

  /**
   * Note: forcefully clear all session cookies
   */
  useEffect(() => {
    removeCookie(COOKIE, {path: '/'});
  }, []);

  return (
    <div className="border-2 border-slate-300 rounded max-w-lg display-block m-auto p-4">
      <h2 className="w-full text-center border-b-2 border-b-black pb-2">Sign Up</h2>
      <Formik onSubmit={__hanldeFormSubmit} validationSchema={validationSchema} initialValues={initialValues}>
        {({isSubmitting}) => {
          return (
            <Form>
              <div className="pt-5">
                <FieldInput name="email" />
                <PasswordInput name="password" />
                <ButtonDark isLoading={isSubmitting} type="submit">
                  Sign In
                </ButtonDark>
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
          );
        }}
      </Formik>
    </div>
  );
};

export default Index;
