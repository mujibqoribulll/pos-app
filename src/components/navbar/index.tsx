import { AiFillProduct } from 'react-icons/ai';
import { MdOutlineMessage, MdOutlineNotificationsActive } from 'react-icons/md';
const Navbar = () => {
  return (
    <section className=" p-4  border-b-2 bg-gray-200 border-neutral-300">
      <div className="flex flex-1 flex-row justify-between ">
        <div className="flex items-center gap-3">
          <AiFillProduct size={20} />
          <h2>Product</h2>
        </div>
        <div className="flex gap-5">
          <button>
            <MdOutlineNotificationsActive size={20} />
          </button>
          <button>
            <MdOutlineMessage size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
