import {faEyeSlash, faUser} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Link from 'next/link';

const Index = () => {
  return (
    <div className="border-2 border-slate-300 rounded max-w-lg display-block m-auto p-4">
      <h2 className="w-full text-center border-b-2 border-b-black pb-2">Sign Up</h2>
      <div className="pt-5">
        <div className="px-0">
          <div className="relative mb-3 w-full flex flex-wrap items-stretch">
            <input
              type="text"
              className="relative py-3 px-2 pr-10 w-full bg-white rounded shadow outline-none text-sm text-gray-700 placeholder-gray-400 focus:outline focus:outline-2 focus:outline-blue-200 focus:shadow-outline"
              placeholder="Username"
            />
            <span className="absolute right-0 z-10 py-1 pr-2 w-8 h-full leading-snug bg-transparent rounded text-base font-normal text-gray-400 text-center flex items-center justify-center">
              <FontAwesomeIcon icon={faUser} />
            </span>
          </div>
        </div>

        <div className="px-0">
          <div className="relative mb-3 w-full flex flex-wrap items-stretch">
            <input
              type="text"
              className="relative py-3 px-2 pr-10 w-full bg-white rounded shadow outline-none text-sm text-gray-700 placeholder-gray-400 focus:outline focus:outline-2 focus:outline-blue-200 focus:shadow-outline"
              placeholder="Email"
            />
          </div>
        </div>

        <div className="px-0">
          <div className="relative mb-3 w-full flex flex-wrap items-stretch">
            <input
              type="text"
              className="relative py-3 px-2 pr-10 w-full bg-white rounded shadow outline-none text-sm text-gray-700 placeholder-gray-400 focus:outline focus:outline-2 focus:outline-blue-200 focus:shadow-outline"
              placeholder="Password"
            />
            <span className="absolute right-0 z-10 py-1 pr-2 w-8 h-full leading-snug bg-transparent rounded text-base font-normal text-gray-400 text-center flex items-center justify-center">
              <FontAwesomeIcon icon={faEyeSlash} />
            </span>
          </div>
        </div>

        <div className="px-0">
          <div className="relative mb-3 w-full flex flex-wrap items-stretch">
            <input
              type="text"
              className="relative py-3 px-2 pr-10 w-full bg-white rounded shadow outline-none text-sm text-gray-700 placeholder-gray-400 focus:outline focus:outline-2 focus:outline-blue-200 focus:shadow-outline"
              placeholder="Confirm Password"
            />
            <span className="absolute right-0 z-10 py-1 pr-2 w-8 h-full leading-snug bg-transparent rounded text-base font-normal text-gray-400 text-center flex items-center justify-center">
              <FontAwesomeIcon icon={faEyeSlash} />
            </span>
          </div>
        </div>

        <button className="bg-blue-800 w-full py-3 rounded text-white">Sign Up</button>
        <p className="pt-2 text-black text-xs opacity-7">By signing up, you agree to the Terms of Service and Privacy Policy</p>

        <div className="py-2 flex flex-row gap-2 items-center text-sm text-gray-700">
          <hr className="w-full" />
          OR
          <hr className="w-full" />
        </div>

        <Link href={'/login'}>
          <button className="w-full py-3 rounded text-blue-800 border border-blue-800">Sign In</button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
