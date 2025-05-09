import { ReactNode } from "react";

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
}