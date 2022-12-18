import {HoverDropdown} from '../';

export const LargeNav = () => {
  return (
    <nav className="w-screen py-1 bg-blue-900 px-2 py-5">
      <div className="max-w-screen-xl m-auto flex items-center flex-row justify-between">
        <h3 className="text-white text-md font-light">Abu Sayid Md Nowman</h3>
        <HoverDropdown />
      </div>
    </nav>
  );
};
