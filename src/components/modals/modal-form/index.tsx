import ButtonText from '@/components/buttons/button-text';
import { IModalFormProps } from '@/types/modal';

import Image from 'next/image';
import { Controller } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';

const ModalForm = (props: IModalFormProps) => {
  const {
    visible,
    onCancel,
    onPress,
    data,
    imagePreview,
    handleSubmit,
    register,
    errors,
    onSubmit,
    control,
    handleChangeImage,
    state,
  } = props;

  if (!visible) {
    document.body.classList.remove('overflow-hidden');
    return null;
  } else {
    document.body.classList.add('overflow-hidden');
  }

  return (
    <div
      className="fixed bg-black/35 inset-0 flex justify-center items-center"
      onClick={onCancel}
    >
      <div
        className="bg-white min-w-lg rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4">
          <h2 className="text-base font-sans font-semibold">Add Product</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-3 mt-3"
          >
            <div className="flex flex-col gap-y-3 items-center justify-center ">
              {imagePreview && (
                <Image
                  alt="image blob"
                  src={imagePreview}
                  width={200}
                  height={150}
                  className="rounded-lg"
                />
              )}

              <Controller
                name="productImage"
                control={control}
                render={({ field }) => (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleChangeImage(file);
                      }
                      field.onChange(e.target.files?.[0]); // ← penting untuk validasi!
                    }}
                    className={`w-52 border border-dashed cursor-pointer  border-black/30 p-2 rounded-lg placeholder:text-gray-300 text-gray-700 font-sans text-base`}
                  />
                )}
              />
              {errors?.productImage?.message && (
                <p className="text-sm text-red-500 italic font-sans">
                  {errors?.productImage?.message}
                </p>
              )}
            </div>
            <label htmlFor="name" className="flex flex-1 flex-col">
              <span className="text-base font-sans">Product</span>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Input name"
                className="outline-none border border-black/30 p-2 rounded-lg placeholder:text-gray-300 text-gray-700 font-sans text-base"
                {...register('name')}
              />
              {errors?.name?.message && (
                <p className="text-sm text-red-500 italic font-sans">
                  {errors?.name?.message}
                </p>
              )}
            </label>

            <label htmlFor="purchasePrice" className="flex flex-1 flex-col">
              <span className="text-base font-sans">Purchase Price</span>
              <Controller
                name="purchasePrice"
                control={control}
                render={({ field }) => {
                  return (
                    <NumericFormat
                      {...field}
                      placeholder="Purchase Price"
                      prefix="Rp"
                      thousandSeparator="."
                      decimalSeparator=","
                      allowNegative={false}
                      className={`outline-none border ${
                        errors?.purchasePrice?.message && 'border-red-500'
                      } p-2 rounded-lg placeholder:text-gray-300 text-gray-700 border-black/30 font-sans text-base`}
                      onValueChange={(values) => {
                        field.onChange(values.floatValue); // Hanya ambil angka-nya
                      }}
                      value={field.value}
                    />
                  );
                }}
              />
              {errors?.purchasePrice?.message && (
                <p className="text-sm text-red-500 italic font-sans">
                  {errors?.purchasePrice?.message}
                </p>
              )}
            </label>

            <label htmlFor="sellingPrice" className="flex flex-1 flex-col">
              <span className="text-base font-sans">Selling Price</span>
              <Controller
                name="sellingPrice"
                control={control}
                render={({ field }) => {
                  return (
                    <NumericFormat
                      {...field}
                      placeholder="Selling Price"
                      prefix="Rp"
                      thousandSeparator="."
                      decimalSeparator=","
                      allowNegative={false}
                      className={`outline-none border ${
                        errors?.sellingPrice?.message && 'border-red-500'
                      } p-2 rounded-lg placeholder:text-gray-300 border-black/30 text-gray-700 font-sans text-base`}
                      onValueChange={(values) => {
                        field.onChange(values.floatValue); // Hanya ambil angka-nya
                      }}
                      value={field.value}
                    />
                  );
                }}
              />
              {errors?.sellingPrice?.message && (
                <p className="text-sm text-red-500 italic font-sans">
                  {errors?.sellingPrice?.message}
                </p>
              )}
            </label>
            {/* <label htmlFor="variants" className="flex flex-1 flex-col">
              <span className="text-base font-sans">Variants</span>
              <input
                type="text"
                name="variants"
                id="variants"
                placeholder="Variants"
                className="outline-none border border-black/30 p-2 rounded-lg placeholder:text-gray-300 text-gray-700 font-sans text-base"
                {...register('variants')}
              />
              {errors?.variants?.message && (
                <p className="text-sm text-red-500 italic font-sans">
                  {errors?.variants?.message}
                </p>
              )}
            </label> */}
            <label htmlFor="stock" className="flex flex-1 flex-col">
              <span className="text-base font-sans">Quantity</span>
              <input
                type="text"
                name="stock"
                id="stock"
                placeholder="Quantity"
                className="outline-none border border-black/30 p-2 rounded-lg placeholder:text-gray-300 text-gray-700 font-sans text-base"
                {...register('stock')}
              />
              {errors?.stock?.message && (
                <p className="text-sm text-red-500 italic font-sans">
                  {errors?.stock?.message}
                </p>
              )}
            </label>
            <label htmlFor="description" className="flex flex-1 flex-col">
              <span className="text-base font-sans">Description</span>
              <textarea
                name="description"
                id="description"
                placeholder="Description"
                className="outline-none border border-black/30 p-2 rounded-lg placeholder:text-gray-300 text-gray-700 font-sans text-base"
                {...register('description')}
              />
              {errors?.description?.message && (
                <p className="text-sm text-red-500 italic font-sans">
                  {errors?.description?.message}
                </p>
              )}
            </label>
            <div className="flex flex-1 justify-end items-center gap-x-3">
              <ButtonText
                type="reset"
                title="Cancel"
                onPress={onCancel}
                styleContainer="bg-transparent outline-black/70 outline-1"
                styleText="text-black/70"
              />
              <ButtonText
                type="submit"
                title="Submit"
                onPress={onPress}
                loading={state.loading === 'pending'}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalForm;
