'use client';
import ButtonText from '@/components/buttons/button-text';
import CardProduct from '@/components/cards/card-product';
import ModalAlert from '@/components/modals/modal-alert';
import ModalForm from '@/components/modals/modal-form';
import { IProductStateProps } from '@/types/product';
import { CiSearch } from 'react-icons/ci';
import { GiShoppingCart } from 'react-icons/gi';
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
    imagePreview,
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
      setImagePreview,
    },
  } = useHooksProduct();

  const onPressModal = (type: any, data: Datatypes) => {
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
      <div className="flex flex-1 flex-col gap-3 bg-gray-200 h-full">
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
              <div className="flex items-center gap-3 border border-black/25 p-[5px] bg-white rounded-xl">
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
                  onPress={() => onPressModal('add-product', { id: '' })}
                  type="button"
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
              {/* dummy */}
              <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-8 gap-[16px]">
                {product?.data?.map((product, index) => (
                  <CardProduct
                    image={product?.image}
                    key={index}
                    description={product?.description}
                    sellingPrice={product?.sellingPrice}
                    name={product?.name}
                    purchasePrice={product?.purchasePrice}
                    stock={product?.stock}
                  />
                ))}
              </div>
              {/* dummy */}

              <div className="flex justify-end items-center my-3 gap-x-4">
                <ButtonText
                  title="Prev"
                  disable={!pagination?.has_prev_page}
                  onPress={handlePrev}
                  type="button"
                />
                <span className="font-sans font-semibold">
                  {pagination?.page}
                </span>
                <ButtonText
                  title="Next"
                  onPress={handleNext}
                  disable={!pagination?.has_next_page}
                  type="button"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalForm
        visible={modalProduct.visible}
        data={modalProduct?.data}
        onCancel={() => onPressModal('', { id: '' })}
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
