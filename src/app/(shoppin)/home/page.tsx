'use client';
import ButtonText from '@/components/buttons/button-text';
import ModalAlert from '@/components/modals/modal-alert';
import ModalForm from '@/components/modals/modal-form';
import { IProductStateProps } from '@/types/product';
import { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { GiShoppingCart } from 'react-icons/gi';
import { LuEllipsisVertical } from 'react-icons/lu';
import { useHooksProduct } from './store/useHooksProduct';

const HomePage = () => {
  const {
    state: stateProduct,
    modal: modalProduct,
    pagination,
    product,
    formState: { errors, isLoading },
    control,
    isOpenModalAlert,
    isDropdown,
    func: {
      submitForm,
      toggleSetModal,
      handleNext,
      handlePrev,
      register,
      handleSubmit,
      setIsDropdown,
      setIsOpenModalAlert,
      handleDelete,
    },
  } = useHooksProduct();

  const [imagePreview, setImagePreview] = useState<string | null>('');

  const onPressModal = (type: string, data: IModalDataProps) => {
    toggleSetModal(type, data);
  };

  const handleChangeImage = (file: any) => {
    setImagePreview(URL.createObjectURL(file));
  };

  const onSubmit = (data: IProductStateProps) => {
    submitForm(data);
  };

  const toggleDropdown = ({ active, id }: IDropdown) => {
    setIsDropdown({ active, id });
  };

  return (
    <section className="">
      <div className="flex flex-1 flex-col gap-3 bg-gray-200 h-screen">
        {/* main content */}
        <div className="px-3 my-6">
          <div className="flex flex-row items-center">
            <div className="flex flex-1/2 flex-col mb-3">
              <h2 className="font-semibold font-sans">Product List</h2>
              <p className="text-sm font-sans text-black/70">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
                itaque ex incidunt eligendi id harum magnam delectus iste sint
                omnis! At dolor tempora debitis illum in, animi officiis quia
                nihil.
              </p>
            </div>
            <div className="flex items-center gap-x-3">
              <div className="flex items-center gap-3 border border-black/25 p-[5px] bg-white rounded-lg">
                <CiSearch size={20} />
                <input
                  {...register('search')}
                  name="search"
                  type="search"
                  placeholder="Search"
                  className="outline-none"
                  id="search"
                />
              </div>
              <div>
                <ButtonText
                  title="Add Product"
                  onPress={() => onPressModal('add-product')}
                />
              </div>
            </div>
          </div>
          <div className="flex-1 bg-white rounded-md px-5 pt-5 border border-black/25 font-sans">
            <div className="flex flex-1 justify-between items-center">
              <div className="flex items-center gap-3">
                <GiShoppingCart size={20} className="font-semibold" />
                <h3 className="font-semibold font-sans">Sales Recap</h3>
              </div>
              <div>filter</div>
            </div>

            <div className="my-7">
              <table className="w-full">
                <thead className="bg-black/70">
                  <tr className="text-left text-white">
                    <th className="p-3">Product</th>
                    <th className="p-3">Description</th>
                    <th className="p-3">Quantity</th>
                    <th className="p-3">Purchase price</th>
                    <th className="p-3">Sell price</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y-1 divide-gray-200">
                  {product?.data?.map((product: any, index: number) => (
                    <tr key={index}>
                      <td className="p-3">{product?.name || '-'}</td>
                      <td className="p-3">{product?.description || '-'}</td>
                      <td className="p-3">{product?.stock || '-'}</td>
                      <td className="p-3">{product?.purchasePrice}</td>
                      <td className="p-3">{product?.sellingPrice}</td>
                      <td className=" place-items-center">
                        <div
                          className="relative p-3"
                          onMouseEnter={() =>
                            toggleDropdown({ active: true, id: product?.id })
                          }
                          onMouseLeave={() =>
                            toggleDropdown({ active: false, id: product?.id })
                          }
                        >
                          <LuEllipsisVertical className="cursor-pointer" />

                          <div
                            className={`absolute ${
                              isDropdown?.id === product?.id &&
                              isDropdown?.active
                                ? 'flex flex-col'
                                : 'hidden'
                            }  gap-x-2 -left-24 top-3  bg-neutral-700 w-24 rounded-lg p-2`}
                          >
                            <div className="text-sm font-sans  text-white p-[5px] hover:bg-green-500 rounded-md cursor-pointer">
                              Update
                            </div>
                            <div
                              className="text-sm font-sans  text-white hover:bg-red-500  p-[5px] rounded-md cursor-pointer"
                              onMouseDown={() => setIsOpenModalAlert(true)}
                            >
                              Delete
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-end items-center my-3 gap-x-4">
                <ButtonText
                  title="Prev"
                  disable={!pagination?.has_prev_page}
                  onPress={handlePrev}
                />
                <span className="font-sans font-semibold">
                  {pagination?.page}
                </span>
                <ButtonText
                  title="Next"
                  onPress={handleNext}
                  disable={!pagination?.has_next_page}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalForm
        visible={modalProduct.visible}
        data={modalProduct?.data}
        onCancel={() => onPressModal('', {})}
        imagePreview={imagePreview}
        handleSubmit={handleSubmit}
        register={register}
        errors={errors}
        onSubmit={onSubmit}
        control={control}
        handleChangeImage={handleChangeImage}
        state={stateProduct}
      />
      <ModalAlert
        visible={isOpenModalAlert}
        onCancel={() => setIsOpenModalAlert(false)}
        onPress={handleDelete}
      />
    </section>
  );
};

export default HomePage;
