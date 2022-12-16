import {faUser} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import {useToggle} from '../hooks';

export const HoverDropdown = () => {
  const {isOpen, setClose, setOpen} = useToggle();
  return (
    <div onMouseLeave={setClose}>
      <div className="dropdown relative">
        <button
          onMouseEnter={setOpen}
          className={clsx(
            'bg-blue-900 text-white font-semibold text-lg font-light py-2 px-4 rounded flex gap-2 items-center',
            isOpen && 'bg-blue-800'
          )}
        >
          <FontAwesomeIcon icon={faUser} />
          <span className="mr-1 font-light">Abu Sayid Md Nowman</span>
        </button>
        {isOpen && (
          <ul className="dropdown-menu bg-blue-800 absolute top-full left-0 text-white pt-1">
            <li className="">
              <a className="rounded-t  py-2 px-4 block hover:underline whitespace-no-wrap" href="#">
                One
              </a>
            </li>
            <li className="">
              <a className=" py-2 px-4 block whitespace-no-wrap hover:underline" href="#">
                Two
              </a>
            </li>
            <li className="">
              <a className="rounded-b  py-2 px-4 block whitespace-no-wrap hover:underline" href="#">
                Three is the magic number
              </a>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};
