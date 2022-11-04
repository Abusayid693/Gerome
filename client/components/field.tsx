import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import {useField} from 'formik';
import React, {useState} from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  label?: string;
  name: string;
  validate?: any;
  disabled?: boolean;
  iconRight?: any;
}

export const PasswordInput: React.FC<Omit<InputProps, 'iconRight'>> = ({name, ...any}) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [field, {error, touched}] = useField(name);

  return (
    <div className="px-0">
      <div className="relative mb-3 w-full flex flex-wrap items-stretch">
        <input
          type={passwordShown ? 'password' : 'text'}
          className={clsx(
            'relative py-3 px-2 pr-10 w-full bg-white rounded shadow outline-none text-sm text-gray-700 placeholder-gray-400 focus:outline focus:outline-2 focus:outline-blue-200 focus:shadow-outline',
            error && touched && 'outline-red-500'
          )}
          placeholder="Password"
          {...any}
          {...field}
        />
        {error && touched && <span className="text-sm text-red-500">{error}</span>}
        <button
          onClick={() => setPasswordShown(prev => !prev)}
          className="absolute right-0 z-10 py-1 pr-2 w-8 h-full leading-snug bg-transparent rounded text-base font-normal text-gray-400 text-center flex items-center justify-center"
        >
          <FontAwesomeIcon icon={passwordShown ? faEyeSlash : faEye} />
        </button>
      </div>
    </div>
  );
};

export const FieldInput: React.FC<InputProps> = ({name, iconRight, ...any}) => {
  const [field, {error, touched}] = useField(name);

  return (
    <div className="px-0">
      <div className="relative mb-3 w-full flex flex-wrap items-stretch items-center">
        <input
          type={'text'}
          className={clsx(
            'relative py-3 px-2 pr-10 w-full bg-white rounded shadow outline-none text-sm text-gray-700 placeholder-gray-400 focus:outline focus:outline-2 focus:outline-blue-200 focus:shadow-outline',
            error && touched && 'outline-red-500'
          )}
          placeholder="Password"
          {...any}
          {...field}
        />
        {error && touched && <span className="text-sm text-red-500">{error}</span>}
        {iconRight && (
          <span className="absolute right-0 z-10 py-1 pr-2 w-8 h-full leading-snug bg-transparent rounded text-base font-normal text-gray-400 text-center flex items-center justify-center">
            <FontAwesomeIcon icon={iconRight} />
          </span>
        )}
      </div>
    </div>
  );
};
