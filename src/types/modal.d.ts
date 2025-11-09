type Datatypes = {
    id: string | number
}

type Modaltype = 'add-product' | 'update-product' | undefined | ''


type ImageTypes = string | null

interface IModalFormProps {
    onPress: () => void;
    onCancel: () => void;
    visible: boolean;
    data: Datatypes;
    imagePreview: ImageTypes;
}

interface IModalDataProps {
    type: Modaltype;
    visible: boolean;
    data?: Datatypes;
}

// Dropdowm

type TypeDropdown = 'delete' | 'update' | undefined

interface IDropdown {
    active: boolean,
    id: string;
}


interface IModalAlertProps {
    onPress: () => void;
    onCancel: () => void;
    visible: boolean;
}