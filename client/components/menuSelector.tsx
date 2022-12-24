import clsx from 'clsx';
const selectors = ['Recent', 'Money in', 'Money out'];

export const MenuSelector: React.FC<{
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}> = ({activeIndex, setActiveIndex}) => {
  return (
    <div>
      <ul className="flex flex-row items-center w-full justify-between">
        {selectors.map((selector, i) => (
          <li onClick={() => setActiveIndex(i)} className={clsx("w-full border bg-white mb-3 rounded shadow border-grey-2 p-5 cursor-pointer", i===activeIndex && "border-blue-900")} key={selector}>
            {selector} : {activeIndex}
          </li>
        ))}
      </ul>
    </div>
  );
};
