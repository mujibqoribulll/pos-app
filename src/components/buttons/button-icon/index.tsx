import { IButtonIconProps } from '@/types/button';

const ButtonIcon = (props: IButtonIconProps) => {
  const { icon, onPress } = props;
  return (
    <button onClick={onPress} className="cursor-pointer p-2">
      {icon}
    </button>
  );
};
export default ButtonIcon;
