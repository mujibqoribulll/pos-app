import { IButtonText } from '@/types/button';

const ButtonText = (props: IButtonText) => {
  const { title, onPress, disable } = props;
  console.log('disable', disable);
  return (
    <button
      disabled={disable}
      className={`text-sm font-semibold font-sans ${
        disable ? 'bg-gray-500' : 'bg-black/70 hover:bg-black/80 cursor-pointer'
      } text-white py-2 px-5 rounded-lg `}
      onClick={onPress}
    >
      {title}
    </button>
  );
};

export default ButtonText;
