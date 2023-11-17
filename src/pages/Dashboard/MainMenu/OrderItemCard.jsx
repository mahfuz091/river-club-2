import React, { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { ToggleContext } from "../../../context/ToggleProvider";
import MoreItems from "./MoreItems";
import axiosInstance from "../../../axios/axios-instance";
import Modal2 from "./Modal2";
import ShowCommentModal from "./ShowCommentModal";

const OrderItemCard = ({ item, handleDelete, username }) => {
  console.log(item);
  const [storesItem, setStoresItem] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [isFetched, setIsFetched] = useState(false);

  const [show, setShow] = useState(false);

  const [comment, setComment] = useState([]);
  const [opComment, setOpComment] = useState("");
  // console.log(comment);
  const [produitComment, setproduitComment] = useState([]);
  // console.log(produitComment);
  const [opCm, setOpCm] = useState("");

  const { control, setControl } = useContext(ToggleContext);

  const [value, setValue] = useState(item.data.qty);

  const handleMore = () => {
    setShow(!show);
  };



  // console.log(produitComment);

  useEffect(() => {
    const getStoredItem = JSON.parse(localStorage.getItem("item"));
    if (getStoredItem) {
      setStoresItem(getStoredItem);
    }
    setValue(item.data.qty);
  }, [control, item.data.qty]);
  const setIncrease = (id) => {
    // console.log("C");
    setValue(parseInt(value) + 1);
    storesItem.map((item) => {
      // console.log(item.data.qty);

      if (item.data.uuid === id) {
        item.data.qty = parseInt(value) + 1;

        // console.log(item.data.qty);
        // console.log(storesItem);
        localStorage.setItem("item", JSON.stringify(storesItem));
        setControl(!control);
      }
    });
  };
  const setDecrease = (id) => {
    if (value <= 1) {
      handleDelete(id);
    } else {
      setValue(parseInt(value) - 1);
      storesItem.map((item) => {
        // console.log(item.data.qty);

        if (item.data.uuid === id) {
          item.data.qty = parseInt(value) - 1;

          // console.log(item.data.qty);
          // console.log(storesItem);
          localStorage.setItem("item", JSON.stringify(storesItem));
          setControl(!control);
        }
      });
    }
  };
  const [suuid, setSuuid] = useState("");
  const [sid, setSid] = useState("");
  const [scomment, setScomment] = useState(false);

  const handleComment = (id, uuid) => {
    console.log(id, uuid);
    setSuuid(uuid);
    setSid(id);

  };

  const [inputValue, setInputValue] = useState("");

  const handleAddComment = (id, uuid) => {
    const newOption = [];
    const previousItem = JSON.parse(localStorage.getItem("item"));

    if (previousItem) {
      const IsThisItem = previousItem?.find((pIt) => pIt.data.uuid === uuid);
      console.log(IsThisItem);
      if (IsThisItem) {
        const OpItem = IsThisItem?.data?.options.find(
          (oIt) => oIt.data.id === id
        );
        console.log(OpItem);
        OpItem.data.comment = inputValue;
        const newOPItem = IsThisItem?.data?.options.filter(
          (oIt) => oIt.data.id !== id
        );
        const newOption = [...newOPItem, OpItem];
        previousItem.options = newOption;
        localStorage.setItem("item", JSON.stringify(previousItem));
      }
    }
  };

  return (
    <>
      <div className='order-items w-full relative mb-3 '>
        <div className='flex w-full items-center justify-between   gap-[14px]'>
          <img src={item.data?.image} alt='' />
          <div>
            <div className='flex justify-between items-center '>
              <h4>{item.data?.name}</h4>
              <button
                onClick={() => handleDelete(item.data.uuid)}
                className='delete-btn_header '
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  viewBox='0 0 20 20'
                  fill='none'
                >
                  <path
                    d='M17.5 4.16663H2.50002C2.27901 4.16663 2.06704 4.25442 1.91076 4.4107C1.75448 4.56698 1.66669 4.77895 1.66669 4.99996C1.66669 5.22097 1.75448 5.43293 1.91076 5.58921C2.06704 5.7455 2.27901 5.83329 2.50002 5.83329H4.16669V15.8333C4.16689 16.4963 4.43034 17.132 4.89914 17.6008C5.36794 18.0696 6.00371 18.3331 6.66669 18.3333H13.3334C13.9963 18.3331 14.6321 18.0697 15.1009 17.6009C15.5697 17.1321 15.8332 16.4963 15.8334 15.8333V5.83329H17.5C17.721 5.83329 17.933 5.7455 18.0893 5.58921C18.2456 5.43293 18.3334 5.22097 18.3334 4.99996C18.3334 4.77895 18.2456 4.56698 18.0893 4.4107C17.933 4.25442 17.721 4.16663 17.5 4.16663ZM9.16669 13.3333C9.16669 13.5543 9.07889 13.7663 8.92261 13.9226C8.76633 14.0788 8.55437 14.1666 8.33335 14.1666C8.11234 14.1666 7.90038 14.0788 7.7441 13.9226C7.58782 13.7663 7.50002 13.5543 7.50002 13.3333V9.16663C7.50002 8.94561 7.58782 8.73365 7.7441 8.57737C7.90038 8.42109 8.11234 8.33329 8.33335 8.33329C8.55437 8.33329 8.76633 8.42109 8.92261 8.57737C9.07889 8.73365 9.16669 8.94561 9.16669 9.16663V13.3333ZM12.5 13.3333C12.5 13.5543 12.4122 13.7663 12.2559 13.9226C12.0997 14.0788 11.8877 14.1666 11.6667 14.1666C11.4457 14.1666 11.2337 14.0788 11.0774 13.9226C10.9212 13.7663 10.8334 13.5543 10.8334 13.3333V9.16663C10.8334 8.94561 10.9212 8.73365 11.0774 8.57737C11.2337 8.42109 11.4457 8.33329 11.6667 8.33329C11.8877 8.33329 12.0997 8.42109 12.2559 8.57737C12.4122 8.73365 12.5 8.94561 12.5 9.16663V13.3333Z'
                    fill='#3E3E3E'
                    fill-opacity='0.5'
                  />
                  <path
                    d='M8.33333 3.33329H11.6667C11.8877 3.33329 12.0996 3.2455 12.2559 3.08922C12.4122 2.93293 12.5 2.72097 12.5 2.49996C12.5 2.27895 12.4122 2.06698 12.2559 1.9107C12.0996 1.75442 11.8877 1.66663 11.6667 1.66663H8.33333C8.11232 1.66663 7.90036 1.75442 7.74408 1.9107C7.5878 2.06698 7.5 2.27895 7.5 2.49996C7.5 2.72097 7.5878 2.93293 7.74408 3.08922C7.90036 3.2455 8.11232 3.33329 8.33333 3.33329Z'
                    fill='#3E3E3E'
                    fill-opacity='0.5'
                  />
                </svg>
              </button>
            </div>
            <div className='flex w-full items-center justify-between'>
              <p className='price mr-[53px] lg:mr-[60px]'>
                {item.data?.price} Dhs
              </p>
              <div className='input-group mr-[10px] '>
                <button onClick={() => setDecrease(item.data.uuid)}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='12'
                    height='3'
                    viewBox='0 0 12 3'
                    fill='none'
                    className='plus-minus'
                  >
                    <path
                      d='M0 2.9917H12V-0.00683594H0V2.9917Z'
                      fill='#999999'
                    />
                  </svg>
                </button>
                <p>{value}</p>
                <button onClick={() => setIncrease(item.data.uuid)}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='11'
                    height='11'
                    viewBox='0 0 11 11'
                    fill='none'
                    className='plus-minus'
                  >
                    <path
                      d='M4.35671 -0.00488281V4.45764H-0.000152588V6.52722H4.35671V10.9897H6.64298V6.52722H10.9998V4.45764H6.64298V-0.00488281H4.35671Z'
                      fill='#F06D23'
                    />
                  </svg>
                </button>
              </div>

              <button className='delete-btn '>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  viewBox='0 0 20 20'
                  fill='none'
                >
                  <path
                    d='M17.5 4.16663H2.50002C2.27901 4.16663 2.06704 4.25442 1.91076 4.4107C1.75448 4.56698 1.66669 4.77895 1.66669 4.99996C1.66669 5.22097 1.75448 5.43293 1.91076 5.58921C2.06704 5.7455 2.27901 5.83329 2.50002 5.83329H4.16669V15.8333C4.16689 16.4963 4.43034 17.132 4.89914 17.6008C5.36794 18.0696 6.00371 18.3331 6.66669 18.3333H13.3334C13.9963 18.3331 14.6321 18.0697 15.1009 17.6009C15.5697 17.1321 15.8332 16.4963 15.8334 15.8333V5.83329H17.5C17.721 5.83329 17.933 5.7455 18.0893 5.58921C18.2456 5.43293 18.3334 5.22097 18.3334 4.99996C18.3334 4.77895 18.2456 4.56698 18.0893 4.4107C17.933 4.25442 17.721 4.16663 17.5 4.16663ZM9.16669 13.3333C9.16669 13.5543 9.07889 13.7663 8.92261 13.9226C8.76633 14.0788 8.55437 14.1666 8.33335 14.1666C8.11234 14.1666 7.90038 14.0788 7.7441 13.9226C7.58782 13.7663 7.50002 13.5543 7.50002 13.3333V9.16663C7.50002 8.94561 7.58782 8.73365 7.7441 8.57737C7.90038 8.42109 8.11234 8.33329 8.33335 8.33329C8.55437 8.33329 8.76633 8.42109 8.92261 8.57737C9.07889 8.73365 9.16669 8.94561 9.16669 9.16663V13.3333ZM12.5 13.3333C12.5 13.5543 12.4122 13.7663 12.2559 13.9226C12.0997 14.0788 11.8877 14.1666 11.6667 14.1666C11.4457 14.1666 11.2337 14.0788 11.0774 13.9226C10.9212 13.7663 10.8334 13.5543 10.8334 13.3333V9.16663C10.8334 8.94561 10.9212 8.73365 11.0774 8.57737C11.2337 8.42109 11.4457 8.33329 11.6667 8.33329C11.8877 8.33329 12.0997 8.42109 12.2559 8.57737C12.4122 8.73365 12.5 8.94561 12.5 9.16663V13.3333Z'
                    fill='white'
                  />
                  <path
                    d='M8.33333 3.33329H11.6667C11.8877 3.33329 12.0996 3.2455 12.2559 3.08922C12.4122 2.93293 12.5 2.72097 12.5 2.49996C12.5 2.27895 12.4122 2.06698 12.2559 1.9107C12.0996 1.75442 11.8877 1.66663 11.6667 1.66663H8.33333C8.11232 1.66663 7.90036 1.75442 7.74408 1.9107C7.5878 2.06698 7.5 2.27895 7.5 2.49996C7.5 2.72097 7.5878 2.93293 7.74408 3.08922C7.90036 3.2455 8.11232 3.33329 8.33333 3.33329Z'
                    fill='white'
                  />
                </svg>
              </button>
              <div className=' ml-[20px] flex flex-col  '>
                <button
                  className='comment-btn '
                  onClick={() =>
                    document.getElementById("my_modal_1").showModal()
                  }
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='20'
                    height='20'
                    viewBox='0 0 20 20'
                    fill='none'
                  >
                    <path
                      d='M10 17.5C11.4834 17.5 12.9334 17.0601 14.1668 16.236C15.4001 15.4119 16.3614 14.2406 16.9291 12.8701C17.4968 11.4997 17.6453 9.99168 17.3559 8.53683C17.0665 7.08197 16.3522 5.7456 15.3033 4.6967C14.2544 3.64781 12.918 2.9335 11.4632 2.64411C10.0083 2.35472 8.50032 2.50325 7.12987 3.07091C5.75943 3.63856 4.58809 4.59986 3.76398 5.83323C2.93987 7.0666 2.5 8.51664 2.5 10C2.5 11.24 2.8 12.4092 3.33333 13.4392L2.5 17.5L6.56083 16.6667C7.59083 17.2 8.76083 17.5 10 17.5Z'
                      stroke='#3E3E3E'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                  </svg>
                </button>
              </div>
              {/* You can open the modal using document.getElementById('ID').showModal() method */}

              <dialog id='my_modal_1' className='modal'>
                <div className='modal-box'>
                  <form method='dialog'>
                    {/* if there is a button in form, it will close the modal */}
                    <button className='close-btn absolute right-[10px] top-[10px]'>
                      ✕
                    </button>
                  </form>
                  <h3 className='comment-title'>Comment</h3>
                  <p className='px-[20px] username'>Username : {username}</p>
                  <p className='px-[20px] description'>
                    {item?.data?.comment}
                  </p>
                  <form method='dialog'>
                    <button className='ok-btn'>Ok</button>
                  </form>
                </div>
              </dialog>
            </div>
          </div>
        </div>

        {item?.data?.options?.length > 0 ? (
          <>
            <div className='more-items'>
              <button onClick={() => handleMore()} className='more-btn'>
                More Similar Items
              </button>

              {show ? (
                <>
                  {item.data.options?.map((op, index) => (
                    <MoreItems
                      key={index}
                      scomment={scomment}
                      setScomment={setScomment}
                      op={op}
                      uuid={item.data.uuid}
                      handleComment={handleComment}
                      setShowModal={setShowModal}
                      setShowModal2={setShowModal2}
                      showModal={showModal}
                      showModal2={showModal2}
                      control={control}
                      setOpComment={setOpComment}
                    ></MoreItems>
                  ))}
                </>
              ) : (
                ""
              )}
            </div>
          </>
        ) : (
          ""
        )}
      </div>
      {showModal ? (
        <>
          <Modal2
            setShowModal={setShowModal}
            handleComment={handleComment}
            suuid={suuid}
            sid={sid}
            handleAddComment={handleAddComment}
            setControl={setControl}
            control={control}
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
        </>
      ) : null}
      {showModal2 ? (
        <ShowCommentModal
          setShowModal2={setShowModal2}
          opComment={opComment}
        ></ShowCommentModal>
      ) : null}
    </>
  );
};

export default OrderItemCard;
