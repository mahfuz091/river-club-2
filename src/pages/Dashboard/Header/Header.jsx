import notification from "../../../assets/Images/notification.png";
import profile from "../../../assets/Images/profile.png";
import logo from "./Images/logo.png";
import cart from "./Images/cart.png";
import { useContext, useEffect, useState } from "react";
import { ToggleContext } from "../../../context/ToggleProvider";

const Header = ({ OpenSidebar }) => {
  const [storesItem, setStoresItem] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const { OpenOrderDetails, control, handleSubmit } = useContext(ToggleContext);
  useEffect(() => {
    const getStoredItem = JSON.parse(localStorage.getItem("item"));
    if (getStoredItem) {
      setStoresItem(getStoredItem);
    }
  }, [control]);

  return (
    <div className='header-bg'>
      <header className='header'>
        <div className='menu-icon '>
          <div className='icon' onClick={OpenSidebar}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
            >
              <path
                d='M21.2519 1.8197H13.8477C13.3402 1.8197 12.9238 2.23611 12.9238 2.7436V10.1478C12.9238 10.6597 13.3402 11.0717 13.8477 11.0717H21.2519C21.7637 11.0717 22.1758 10.6553 22.1758 10.1478V2.7436C22.1758 2.23611 21.7637 1.8197 21.2519 1.8197Z'
                fill='#F06D23'
              />
              <path
                d='M17.552 12.9238C14.9971 12.9238 12.9238 14.9972 12.9238 17.552C12.9238 20.1068 14.9971 22.1802 17.552 22.1802C20.1068 22.1759 22.1758 20.1068 22.1801 17.552C22.1758 14.9972 20.1068 12.9238 17.552 12.9238Z'
                fill='#F06D23'
              />
              <path
                d='M10.1478 12.9238H2.7436C2.23611 12.9238 1.8197 13.3402 1.8197 13.8477V21.252C1.8197 21.7638 2.23611 22.1759 2.7436 22.1759H10.1478C10.6597 22.1759 11.0717 21.7595 11.0717 21.252V13.8477C11.0717 13.3402 10.6597 12.9238 10.1478 12.9238Z'
                fill='#F06D23'
              />
              <path
                d='M10.1478 1.8197H2.7436C2.23611 1.8197 1.8197 2.23611 1.8197 2.7436V10.1478C1.8197 10.6597 2.23611 11.0717 2.7436 11.0717H10.1478C10.6597 11.0717 11.0717 10.6553 11.0717 10.1478V2.7436C11.0717 2.23611 10.6597 1.8197 10.1478 1.8197Z'
                fill='#F06D23'
              />
            </svg>
          </div>
          <img className='lg:hidden' src={logo} alt='' />
          <div className='cart-div relative'>
            <img
              onClick={OpenOrderDetails}
              className='lg:hidden'
              src={cart}
              alt=''
            />
            <div className='cart-number absolute top-[-5px] right-[-5px]'>
              {storesItem.length}
            </div>
          </div>
        </div>
        <div className='header-left '>
          <div className='hidden lg:flex justify-between items-center '>
            <form
              onChange={(e) => handleSubmit(e, searchValue)}
              className='lg:flex lg:relative'
            >
              <input
                onChange={(e) => setSearchValue(e.target.value)}
                type='search'
                name=''
                id=''
                className='header-search xl:w-[513px]'
                placeholder='Type here'
              />
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='25'
                height='24'
                viewBox='0 0 25 24'
                fill='none'
                className='absolute top-[16px] left-[15.52px]'
              >
                <path
                  d='M22.2343 20.29L18.5243 16.61C19.9644 14.8144 20.6618 12.5353 20.4731 10.2413C20.2844 7.94733 19.224 5.81281 17.5098 4.27667C15.7957 2.74053 13.5581 1.91954 11.2572 1.9825C8.95636 2.04546 6.76704 2.98759 5.13946 4.61517C3.51188 6.24275 2.56975 8.43207 2.50679 10.7329C2.44383 13.0338 3.26482 15.2714 4.80096 16.9855C6.3371 18.6997 8.47162 19.7601 10.7656 19.9488C13.0596 20.1375 15.3387 19.4401 17.1343 18L20.8143 21.68C20.9073 21.7738 21.0179 21.8482 21.1397 21.8989C21.2616 21.9497 21.3923 21.9758 21.5243 21.9758C21.6563 21.9758 21.787 21.9497 21.9089 21.8989C22.0308 21.8482 22.1414 21.7738 22.2343 21.68C22.4146 21.4936 22.5153 21.2444 22.5153 20.985C22.5153 20.7257 22.4146 20.4765 22.2343 20.29ZM11.5243 18C10.1398 18 8.78647 17.5895 7.63533 16.8203C6.48418 16.0511 5.58698 14.9579 5.05716 13.6788C4.52735 12.3997 4.38872 10.9923 4.65882 9.63439C4.92892 8.27653 5.5956 7.02925 6.57457 6.05028C7.55354 5.07131 8.80082 4.40463 10.1587 4.13453C11.5166 3.86443 12.924 4.00306 14.2031 4.53287C15.4822 5.06268 16.5754 5.95989 17.3446 7.11103C18.1138 8.26218 18.5243 9.61556 18.5243 11C18.5243 12.8565 17.7868 14.637 16.4741 15.9498C15.1613 17.2625 13.3808 18 11.5243 18Z'
                  fill='#6F767E'
                />
              </svg>
              <button className='search-btn'>Search</button>
            </form>

            <div className='flex  gap-[15px] ml-[45px] left-margin xl:ml-[130px] 2xl:ml-[300px]'>
              <div className='relative w-[62px] h-[49px]'>
                <img src={notification} alt='' />
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='10'
                  height='11'
                  viewBox='0 0 10 11'
                  fill='none'
                  className='absolute top-[11px] left-[26px]'
                >
                  <circle
                    cx='4.84094'
                    cy='5.45105'
                    r='4.80505'
                    fill='#F06D23'
                  />
                </svg>
              </div>
              <img className='w-[49px] h-[49px]' src={profile} alt='' />
            </div>
          </div>
        </div>
        <div className='header-right'>
          <div className='icon' />
          {/* <BsFillEnvelopeFill className='icon' />
        <BsPersonCircle className='icon' /> */}
        </div>
      </header>
    </div>
  );
};

export default Header;
