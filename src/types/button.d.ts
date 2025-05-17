import { ReactNode } from "react";

type ButtonType = 'submit' | 'reset' | 'button'

interface IButtonTextIconProps {
    icon: ReactNode;
    title: string;
    onPress?: () => void;
    isMinimize: boolean;
    active?: boolean;
}

interface IButtonIconProps {
    icon: ReactNode;
    onPress: () => void
}

interface IButtonText {
    title: string;
    onPress: () => void;
    disable?: boolean;
    type: ButtonType;
    styleContainer?: string;
    styleText?: string;
}