import {useState} from 'react';
import {MenuSelector} from '../components/menuSelector';

export const Cid = () => {
  const [selectorIndex, setSelectorIndex] = useState(0);
  return (
    <div>
      <div className="cid-menu bg-white py-5 shadow">
        <div className="max-w-screen-2xl m-auto">
          <MenuSelector activeIndex={selectorIndex} setActiveIndex={(index: number) => setSelectorIndex(index)} />
        </div>
      </div>
    </div>
  );
};
