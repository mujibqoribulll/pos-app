import * as yup from 'yup';


export const schemaProduct = yup.object({
    name: yup.string().required("Name product is required"),
    description: yup.string().nullable(),
    purchasePrice: yup
        .number()
        .transform((value, originalValue) => {
            if (typeof originalValue === "string") {
                const cleaned = originalValue.replace(/[^\d.-]/g, ""); // Menghapus "Rp", koma, dan karakter non-numerik lainnya
                return cleaned === "" ? undefined : Number(cleaned); // Mengonversi menjadi number
            }
            return value; // Jika sudah angka, langsung lanjut
        })
        .required("Purchase price is required")
        .positive("Purchase price must be a positive number")
        .typeError("Purchase price must be a valid number"),
    sellingPrice: yup.number()
        .transform((value, originalValue) => {
            if (typeof originalValue === "string") {
                const cleaned = originalValue.replace(/[^\d.-]/g, ""); // Menghapus "Rp", koma, dan karakter non-numerik lainnya
                return cleaned === "" ? undefined : Number(cleaned); // Mengonversi menjadi number
            }
            return value; // Jika sudah angka, langsung lanjut
        })
        .required("Selling price is required")
        .test(
            "is-greater",
            "Selling price must be greater than or equal to purchase price",
            function (value) {
                const { purchasePrice } = this.parent; // Mendapatkan purchasePrice dari context parent
                return value >= purchasePrice; // Validasi jika sellingPrice >= purchasePrice
            }
        ),
    // variants: yup.array().of(yup.string().required("Variant is required")),
    productImage: yup.mixed().required('Image file is required').test('fileType', 'Unsupported File Format', (value: any) => {
        return value && value?.type && value?.type.startsWith('image/');
    }).test('fileSize', 'File size is too large', (value: any) => {
        return value && value?.size <= 5 * 1024 * 1024; // Maksimal 5MB
    }),
    stock: yup.number().required(),
    search: yup.string().nullable(),
})