import { IButtonText } from '@/types/button';

const ButtonText = (props: IButtonText) => {
  const {
    title,
    onPress,
    disable,
    type = 'button',
    styleContainer,
    styleText,
    loading = false,
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
      <span
        className={`${
          styleText ? styleText : 'text-white'
        }  flex justify-center items-center gap-3`}
      >
        {loading && (
          <div className="w-5 h-5 border-3 border-x-white/40 rounded-full animate-spin" />
        )}
        {title}
      </span>
    </button>
  );
};

export default ButtonText;
