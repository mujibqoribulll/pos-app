'use client';
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from 'react-icons/md';
import { RxDashboard } from 'react-icons/rx';

import { ISidebar } from '@/types/product';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiFillProduct } from 'react-icons/ai';
import { IoReceiptOutline } from 'react-icons/io5';
import { SlLogout } from 'react-icons/sl';
import ButtonIcon from '../buttons/button-icon';
import ButtonTextIcon from '../buttons/button-text-icon';

const Sidebar = (props: ISidebar) => {
  const { onPress, isMinimize, onPressLogout } = props;
  const pathname = usePathname();

  const DATA_SIDEBAR = [
    {
      title: 'Dashboard',
      key: '/dashboard',
      icon: <RxDashboard size={20} />,
    },
    {
      title: 'Product',
      key: '/home',
      icon: <AiFillProduct size={20} />,
    },
    {
      title: 'Order',
      key: '/order',
      icon: <IoReceiptOutline size={20} />,
    },
  ];
  return (
    <section
      className={`flex flex-col justify-between h-screen ${
        isMinimize ? 'min-w-20' : 'min-w-60'
      } p-4 bg-gray-200 border-r-2 border-neutral-300  transition-all duration-1000 overflow-y-auto overf scroll-auto`}
    >
      <div className="flex flex-1 flex-col gap-y-10 justify-center">
        <div className="flex justify-between items-center">
          {!isMinimize && <h2 className="text-2xl font-sans">Shoping</h2>}
          <ButtonIcon
            icon={
              isMinimize ? (
                <MdKeyboardDoubleArrowRight size={20} />
              ) : (
                <MdKeyboardDoubleArrowLeft size={20} />
              )
            }
            onPress={onPress}
          />
        </div>

        <ul className="flex flex-col flex-1 gap-y-3">
          {DATA_SIDEBAR?.map((sidebar, index) => (
            <li className="group" key={index}>
              <Link href={sidebar?.key}>
                <ButtonTextIcon
                  icon={sidebar?.icon}
                  isMinimize={isMinimize}
                  title={sidebar.title}
                  active={sidebar?.key === pathname}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <ButtonTextIcon
          icon={
            <SlLogout
              size={20}
              className="text-gray-600 group-hover:text-white "
            />
          }
          onPress={onPressLogout}
          isMinimize={isMinimize}
          title="Logout"
        />
      </div>
    </section>
  );
};

export default Sidebar;
