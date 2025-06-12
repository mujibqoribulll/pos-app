import { ICardProduct } from '@/types/product';
import Image from 'next/image';

const CardProduct = (props: ICardProduct) => {
  const { image, description, purchasePrice, sellingPrice, stock, name } =
    props;
  return (
    <div className="border border-neutral-200 from-neutral-200 to-white bg-gradient-to-b rounded-md shadow-sm">
      <div className="flex flex-col justify-center items-center my-5">
        {image ? (
          <Image
            src={image}
            alt="image-product"
            width={200}
            height={200}
            className="rounded-sm"
          />
        ) : (
          <Image
            src="/images/product-default.png"
            alt="image-product"
            width={200}
            height={200}
            className="rounded-sm"
          />
        )}
      </div>
      <div className="px-5">
        <h2 className="text-gray-800 font-semibold text-[16px] capitalize">
          {name || '-'}
        </h2>
        <div className="">
          <p className="text-gray-500 text-[14px] font-normal text-justify">
            {description || '-'}
          </p>
        </div>
        <div className="flex flex-row items-center space-x-3 my-5 border-t border-neutral-200 pt-3">
          <div>
            <h3 className="text-gray-500 text-[14px] font-normal">
              Purchase Price
            </h3>
            <p className="text-[14px] font-semibold text-gray-500">
              Rp.{purchasePrice || '-'}
            </p>
          </div>
          <div>
            <h3 className="text-gray-500 text-[14px] font-normal">
              Selling Price
            </h3>
            <p className="text-[14px] font-semibold text-gray-500">
              Rp.{sellingPrice || '-'}
            </p>
          </div>
          <div>
            <h3 className="text-gray-500 text-[14px] font-normal">Stock</h3>
            <p className="text-[14px] font-semibold text-gray-500">
              {stock || '-'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
