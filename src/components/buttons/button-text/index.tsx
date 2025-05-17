import { IButtonText } from '@/types/button';

const ButtonText = (props: IButtonText) => {
  const {
    title,
    onPress,
    disable,
    type = 'button',
    styleContainer,
    styleText,
  } = props;

  return (
    <button
      type={type}
      disabled={disable}
      className={`text-sm font-semibold font-sans ${
        disable ? 'bg-gray-500' : 'bg-black/70  cursor-pointer'
      }  py-2 px-5 rounded-lg ${
        styleContainer ? styleContainer : 'hover:bg-black/80'
      }`}
      onClick={onPress}
    >
      <span className={`${styleText ? styleText : 'text-white'}  `}>
        {title}
      </span>
    </button>
  );
};

export default ButtonText;
