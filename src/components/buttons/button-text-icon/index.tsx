import { IButtonTextIconProps } from '@/types/button';

const ButtonTextIcon = (props: IButtonTextIconProps) => {
  const { icon, title, onPress, isMinimize, active } = props;
  return (
    <button
      className={`flex w-full ${
        isMinimize && 'justify-center'
      } items-center p-2  gap-x-5 cursor-pointer hover:bg-neutral-400 rounded-md group ${
        active && 'bg-neutral-600'
      }`}
      onClick={onPress}
    >
      <span
        className={`text-gray-600 group-hover:text-white ${
          active && 'text-white'
        }`}
      >
        {icon}
      </span>

      {!isMinimize && (
        <h2
          className={`${
            active ? 'text-white' : 'text-gray-600'
          } group-hover:text-white font-sans text-sm font-semibold`}
        >
          {title}
        </h2>
      )}
    </button>
  );
};

export default ButtonTextIcon;
