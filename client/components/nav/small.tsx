import {faNavicon} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useToggle} from '../../hooks';

export const SmallNav = () => {
  const {isOpen, toggle} = useToggle();
  return (
    <nav className="w-screen py-1 fixed bg-blue-900 px-5 py-5">
      <div className="max-w-screen-2xl m-auto flex items-center flex-row justify-between">
        <h3 className="text-white text-xl font-light">Abu Sayid Md Nowman</h3>
        <button onClick={toggle} className="text-white">
          <FontAwesomeIcon icon={faNavicon} />
        </button>
      </div>
      {isOpen && (
        <div className="w-screen h-screen absolute top-full text-2xl pt-10 px-[10%] w-full left-0 bg-white">
          <ul className="flex items-start flex-col gap-5 w-full">
            <li className="border-b border-grey-500 pb-2 w-full cursor-pointer">Home</li>
            <li className="border-b border-grey-500 pb-2 w-full cursor-pointer">Activity</li>
            <li className="border-b border-grey-500 pb-2 w-full cursor-pointer">Account</li>
          </ul>
        </div>
      )}
    </nav>
  );
};
