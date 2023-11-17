import React, { useContext, useEffect, useState } from "react";
import ItemCard from "../../ItemCard/ItemCard";
import axiosInstance from "../../../axios/axios-instance";
import { ToggleContext } from "../../../context/ToggleProvider";
import OrderItemCard from "./OrderItemCard";
import SearchItems from "../../SearchItems/SearchItems";

const MainMenu = () => {
  const { openOrderDetailsToggle, control, setControl, filteredData } =
    useContext(ToggleContext);
  const [storesItem, setStoresItem] = useState([]);

  const [totalQty, setTotalQty] = useState();
  // console.log(totalQty);

  const [username, setUsername] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);


  useEffect(() => {
    const user = localStorage.getItem("accessToken");
    const loginUser = JSON.parse(localStorage.getItem("user"));
    if (loginUser.role === "admin") {
      setIsAdmin(true)

    }

    setUsername(user);


  }, []);

  const [totalPrice, setTotalPrice] = useState();

  const [data, setData] = useState([]);

  const [cats, setCats] = useState([]);
  const [catName, setCatName] = useState(null);
  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  };
  useEffect(() => {
    async function getCats() {
      try {
        const response = await axiosInstance.get("/cats");
        // console.log(response.data);
        setCats(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    getCats();
  }, []);
  const [serveur, setServeur] = useState([])
  const [serveurCode, setServeurCode] = useState('')
  useEffect(() => {
    async function getServeur() {
      try {
        const response = await axiosInstance.get("/servs");
        // console.log(response.data);
        setServeur(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    getServeur();
  }, []);
  useEffect(() => {

    async function getServeurCode() {
      try {
        const response = await axiosInstance.get(`/servs/username/${username}`);
        // console.log(response.data);
        setServeurCode(response.data?.code);
      } catch (error) {
        console.error(error);
      }
    }
    getServeurCode();
  }, [serveur]);
  // console.log(serveur);

  const fetchDataByCategory = async (categoryName) => {
    setData([]);
    try {
      const response = await axiosInstance.get(
        `/prods/category/${categoryName}`
      );
      setData(response.data);
      // console.log(response.data)
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCategoryClick = (categoryName, index) => {
    setToggleState(index);
    fetchDataByCategory(categoryName);
  };
  useEffect(() => {
    handleCategoryClick("BOISSON CHAUDE", 1);
  }, []);

  useEffect(() => {
    const getStoredItem = JSON.parse(localStorage.getItem("item"));
    if (getStoredItem) {
      setStoresItem(getStoredItem);
    }
  }, [control]);
  useEffect(() => {
    let totalQty = 0;
    let totalPrice = 0;
    storesItem.forEach((item) => {
      totalQty += parseInt(item.data?.qty);
      const price = parseFloat(item.data?.price);
      const qty = parseInt(item.data?.qty);
      totalPrice += price * qty;
    });
    setTotalPrice(totalPrice);
    setTotalQty(totalQty);
  }, [storesItem]);

  const handleDelete = (id) => {
    console.log(id);
    const leaveItem = storesItem.filter((item) => item.data.uuid !== id);
    if (leaveItem) {
      setControl(!control);
      localStorage.setItem("item", JSON.stringify(leaveItem));
    } else {
      localStorage.removeItem("item");
      setControl(!control);
    }
  };

  return (
    <div className='main-container xl:flex gap-[30px] '>
      <div
        className={
          openOrderDetailsToggle
            ? "hidden"
            : "taking-order mb-0 lg:mb-6 xl:mb-0 transition-all"
        }
      >
        <h1 className='main-title'>Prise De Comman</h1>
        <div className='tabs-group lg:w-full xl:w-[500px] 2xl:w-full '>
          <div className='button-group'>
            {cats?.map((cate, index) => (
              <button
                key={index}
                cate
                className={
                  toggleState === index + 1 ? "tab tab-active " : "tab"
                }
                onClick={() => handleCategoryClick(cate.id, index + 1)}
              >
                <div className='tab-circle'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='30'
                    height='30'
                    viewBox='0 0 30 30'
                    fill='none'
                  >
                    <g clip-path='url(#clip0_1_1313)'>
                      <path
                        d='M15 1.28906C7.07168 1.28906 0.644531 7.71621 0.644531 15.6445C0.644531 19.3686 2.06279 22.7613 4.38844 25.3125L4.74217 25.3711H25.2579L25.6116 25.3125C27.9372 22.7613 29.3555 19.3686 29.3555 15.6445C29.3555 7.71621 22.9283 1.28906 15 1.28906Z'
                        fill='#FFBD86'
                      />
                      <path
                        d='M23.8956 4.0033H16.6677C16.1784 4.0033 15.7782 4.36359 15.7782 4.80392C15.7782 5.24419 16.1785 5.60437 16.6677 5.60437H17.0414C17.5307 5.60437 17.9309 5.96466 17.9309 6.40494C17.9309 6.84515 17.5306 7.20527 17.0414 7.20527H16.4737C15.9845 7.20527 15.5844 7.56568 15.5844 8.00584C15.5844 8.44611 15.9845 8.80628 16.4737 8.80628H20.6936L21.5112 7.20603C21.5054 7.20591 21.4997 7.20527 21.4938 7.20527H20.9654C20.4763 7.20527 20.076 6.84515 20.076 6.40494C20.076 5.96466 20.4763 5.60437 20.9654 5.60437H23.8956C24.3849 5.60437 24.7852 5.24419 24.7852 4.80392C24.7852 4.36359 24.3848 4.0033 23.8956 4.0033Z'
                        fill='#FFE5C2'
                      />
                      <path
                        d='M24.4618 12.269H23.7963C23.7736 12.763 23.7336 13.2518 23.6778 13.7339H24.4618C25.622 13.7339 26.5658 14.6777 26.5658 15.8379V16.8404C26.5658 18.0005 25.622 18.9443 24.4618 18.9443H22.3184C22.0973 19.4545 21.8534 19.9439 21.5872 20.4092H24.4619C26.4298 20.4092 28.0307 18.8082 28.0307 16.8404V15.8379C28.0307 13.87 26.4297 12.269 24.4618 12.269Z'
                        fill='#DFF6FD'
                      />
                      <path
                        d='M19.8919 22.7937C22.244 20.3729 23.8121 16.2567 23.8761 11.5645C23.8784 11.4005 23.7472 11.2657 23.5832 11.2657H6.41678C6.25271 11.2657 6.12152 11.4005 6.12381 11.5645C6.18779 16.2566 7.75594 20.3729 10.1081 22.7937H19.8919Z'
                        fill='#F2FBFF'
                      />
                      <path
                        d='M11.865 4.42383H11.3391L12.2877 5.3724C12.8103 5.54918 13.1878 6.044 13.1878 6.62555V12.4962H14.0667V6.62555C14.0667 5.41148 13.0791 4.42383 11.865 4.42383Z'
                        fill='white'
                      />
                      <path
                        d='M6.66977 0.0857812L1.31629 5.43926C1.20186 5.55369 1.20186 5.73914 1.31629 5.85357L5.73309 10.2704C5.84752 10.3848 6.03297 10.3848 6.14741 10.2704L10.1207 6.29713C10.2688 6.149 10.4598 6.05145 10.6667 6.01828L12.3073 5.75537C12.4677 5.72965 12.5314 5.53307 12.4165 5.41822L7.08409 0.0857812C6.96965 -0.0285938 6.78415 -0.0285938 6.66977 0.0857812Z'
                        fill='#D6694B'
                      />
                      <path
                        d='M2.88438 7.26309L8.48413 1.66334C8.51582 1.63165 8.55286 1.60897 8.59223 1.59403L7.08403 0.0858252C6.96959 -0.0286084 6.78415 -0.0286084 6.66971 0.0858252L1.31629 5.4393C1.20186 5.55374 1.20186 5.73918 1.31629 5.85362L2.82051 7.3579C2.83545 7.32356 2.85631 7.29116 2.88438 7.26309Z'
                        fill='#C4573A'
                      />
                      <path
                        d='M23.2091 6.43308C22.6343 6.1012 21.8988 6.31864 21.5968 6.90968L18.7424 12.4962H20.7121L23.6004 8.07101C23.964 7.5139 23.7852 6.76571 23.2091 6.43308Z'
                        fill='#CBC4CC'
                      />
                      <path
                        d='M22.366 7.53857C22.6172 7.04703 23.1681 6.81517 23.6771 6.94156C23.5801 6.73584 23.4219 6.55607 23.2091 6.4332C22.6343 6.10133 21.8988 6.31877 21.5968 6.9098L18.7424 12.4963H19.833L22.366 7.53857Z'
                        fill='#B5ADB6'
                      />
                      <path
                        d='M11.8709 22.7937H18.129C18.9139 22.2099 19.6451 21.4053 20.292 20.3989C21.2501 18.9083 21.9433 17.1065 22.3348 15.1329L22.1526 15.0743H7.84739L7.66516 15.1329C8.05663 17.1065 8.74985 18.9083 9.70797 20.3989C10.3548 21.4053 11.086 22.2098 11.8709 22.7937Z'
                        fill='#EA9B58'
                      />
                      <path
                        d='M11.7934 22.7351H14.8513C14.0956 22.1566 13.3911 21.3722 12.7655 20.3989C11.8073 18.9083 11.1142 17.1065 10.7226 15.1329H7.66516C8.05663 17.1065 8.74985 18.9083 9.70797 20.3989C10.3335 21.3721 11.0379 22.1564 11.7934 22.7351Z'
                        fill='#D88A55'
                      />
                      <path
                        d='M7.6652 15.1329H22.3348C22.4875 14.3631 22.5944 13.5671 22.6531 12.7533C22.6654 12.5831 22.5315 12.4376 22.3608 12.4376H7.63924C7.4685 12.4376 7.33467 12.583 7.34698 12.7533C7.40569 13.5671 7.5125 14.3631 7.6652 15.1329Z'
                        fill='#FFE5C2'
                      />
                      <path
                        d='M10.708 12.4376H7.63924C7.4685 12.4376 7.33467 12.583 7.34698 12.7533C7.40569 13.5671 7.5125 14.3631 7.66526 15.1329H10.734C10.5814 14.3631 10.4745 13.5671 10.4158 12.7533C10.4035 12.583 10.5373 12.4376 10.708 12.4376Z'
                        fill='#FED2A4'
                      />
                      <path
                        d='M7.95289 25.3711H22.047C22.9826 24.9531 23.6564 24.0183 23.7247 22.9196C23.7309 22.8193 23.6495 22.7351 23.549 22.7351H6.45096C6.35047 22.7351 6.26902 22.8193 6.27524 22.9196C6.3435 24.0183 7.01733 24.9531 7.95289 25.3711Z'
                        fill='#DFF6FD'
                      />
                      <path
                        d='M7.83008 25.3125H10.8823C10.0111 24.8699 9.39272 23.9696 9.3275 22.9196C9.32129 22.8193 9.40274 22.7351 9.50322 22.7351H6.45096C6.35047 22.7351 6.26902 22.8193 6.27524 22.9196C6.34045 23.9696 6.95885 24.8699 7.83008 25.3125Z'
                        fill='#C8EFFE'
                      />
                      <path
                        d='M6.60146 27.0117L6.30908 27.0703C8.7215 28.9082 11.7331 30 15 30C18.2669 30 21.2784 28.9082 23.6909 27.0703L23.4039 27.0117H6.60146Z'
                        fill='#D6694B'
                      />
                      <path
                        d='M6.30907 27.0703H23.6908C24.383 26.543 25.0262 25.9546 25.6116 25.3125H4.38843C4.97372 25.9546 5.6169 26.543 6.30907 27.0703Z'
                        fill='#C4573A'
                      />
                      <path
                        d='M7.03499 25.3125H4.38843C4.97378 25.9546 5.61696 26.543 6.30913 27.0703H23.6909C23.9841 26.8469 24.268 26.6119 24.5429 26.3672H9.05401C8.57958 26.3672 8.11985 26.2027 7.75312 25.9018L7.03499 25.3125Z'
                        fill='#A74B30'
                      />
                      <path
                        d='M18.7784 0.996094H15.8308C15.3417 0.996094 14.9414 1.35633 14.9414 1.79666C14.9414 2.23687 15.3417 2.59705 15.8308 2.59705H18.7784C19.2676 2.59705 19.6679 2.23687 19.6679 1.79666C19.6679 1.35633 19.2676 0.996094 18.7784 0.996094Z'
                        fill='#FFE5C2'
                      />
                    </g>
                    <defs>
                      <clipPath id='clip0_1_1313'>
                        <rect width='30' height='30' fill='white' />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <span>{cate.id}</span>
              </button>
            ))}
          </div>
        </div>

        <div className='content-tabs mt-[34px]'>
          <div
            className={
              toggleState === toggleState
                ? "content grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-[20px] lg:gap-[15px] active-content"
                : "hidden "
            }
          >
            {filteredData.length ? (
              <>
                <SearchItems filteredData={filteredData}></SearchItems>
              </>
            ) : (
              <>
                {data?.map((singleData, index) => (
                  <ItemCard
                    key={index}
                    singleData={singleData}
                    setControl={setControl}
                    control={control}
                  ></ItemCard>
                ))}
              </>
            )}
          </div>
          <div
            className={
              toggleState === 2
                ? "content grid md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-[15px]  active-content"
                : "hidden"
            }
          ></div>
        </div>
      </div>
      <div
        id='order'
        className={openOrderDetailsToggle ? "order-responsive order" : "order"}
      >
        <div className='lg:flex gap-[25px] items-center  order-header'>
          <h3 className='order-title'>Oder Details</h3>
          {isAdmin ? <><div class="dropdown">
            <button class="dropbtn">{username}</button>
            <div class="dropdown-content">
              {serveur?.map((serv, index) => <a key={index} href="#">{serv.username}</a>)}
            </div>
          </div></> : <><div className='select'>
            <p>{serveurCode}   {username}</p>
          </div></>}
        </div>
        <div className='orders-container'>
          {storesItem?.map((item, index) => (
            <OrderItemCard
              key={index}
              item={item}
              handleDelete={handleDelete}
              username={username}
            ></OrderItemCard>
          ))}
        </div>
        <div className='billing mt-[55px]'>
          <h2>Billing Details</h2>
          <hr className='w-[1px] line-billing' />
          <div className='total-qty'>
            <h4>Total Quantity:</h4>
            <p>{totalQty ? totalQty : 0}</p>
          </div>
          <div className='total-price'>
            <h4>Total Price:</h4>
            <p>{totalPrice ? totalPrice : 0} €</p>
          </div>
          <button className='print-btn'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='25'
              height='25'
              viewBox='0 0 25 25'
              fill='none'
            >
              <g clip-path='url(#clip0_1_1834)'>
                <path
                  d='M20.3047 5.14062V4.01562C20.3047 2.07711 18.7276 0.5 16.7891 0.5H8.16406C6.22555 0.5 4.64844 2.07711 4.64844 4.01562V5.14062H20.3047Z'
                  fill='white'
                />
                <path
                  d='M6.05469 15.4531V21.1719V22.3906V23.0938C6.05469 23.8704 6.68427 24.5 7.46094 24.5H17.4922C18.2689 24.5 18.8984 23.8704 18.8984 23.0938V22.3906V21.1719V15.4531H6.05469ZM14.3516 21.4531H10.6016C10.2133 21.4531 9.89844 21.1383 9.89844 20.75C9.89844 20.3617 10.2133 20.0469 10.6016 20.0469H14.3516C14.7399 20.0469 15.0547 20.3617 15.0547 20.75C15.0547 21.1383 14.7399 21.4531 14.3516 21.4531ZM14.3516 18.4531H10.6016C10.2133 18.4531 9.89844 18.1383 9.89844 17.75C9.89844 17.3617 10.2133 17.0469 10.6016 17.0469H14.3516C14.7399 17.0469 15.0547 17.3617 15.0547 17.75C15.0547 18.1383 14.7399 18.4531 14.3516 18.4531Z'
                  fill='white'
                />
                <path
                  d='M20.9609 6.54688H4.03906C2.10055 6.54688 0.523438 8.12398 0.523438 10.0625V15.6875C0.523438 17.626 2.10055 19.2031 4.03906 19.2031H4.64844V15.4531H4.22656C3.83825 15.4531 3.52344 15.1383 3.52344 14.75C3.52344 14.3617 3.83825 14.0469 4.22656 14.0469H5.35156H19.6016H20.7266C21.1149 14.0469 21.4297 14.3617 21.4297 14.75C21.4297 15.1383 21.1149 15.4531 20.7266 15.4531H20.3047V19.2031H20.9609C22.8995 19.2031 24.4766 17.626 24.4766 15.6875V10.0625C24.4766 8.12398 22.8995 6.54688 20.9609 6.54688ZM6.47656 10.9531H4.22656C3.83825 10.9531 3.52344 10.6383 3.52344 10.25C3.52344 9.86169 3.83825 9.54688 4.22656 9.54688H6.47656C6.86487 9.54688 7.17969 9.86169 7.17969 10.25C7.17969 10.6383 6.86487 10.9531 6.47656 10.9531Z'
                  fill='white'
                />
              </g>
              <defs>
                <clipPath id='clip0_1_1834'>
                  <rect
                    width='24'
                    height='24'
                    fill='white'
                    transform='translate(0.5 0.5)'
                  />
                </clipPath>
              </defs>
            </svg>
            Print
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
