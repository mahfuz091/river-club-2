import React, { useEffect, useState } from "react";

import Modal2 from "./Modal2";

const MoreItems = ({
  op,
  handleComment,
  setShowModal,
  showModal,
  setShowModal2,
  showModal2,
  uuid,
  setScomment,
  scomment,
  control,
  setOpComment,
}) => {
  console.log(op);

  useEffect(() => {
    const previousItem = JSON.parse(localStorage.getItem("item"));

    if (previousItem) {
      const IsThisItem = previousItem?.find((pIt) => pIt.data.uuid === uuid);
      console.log(IsThisItem);
      if (IsThisItem) {
        const OpItem = IsThisItem?.data?.options.find(
          (oIt) => oIt.data.id === op.data.id
        );
        console.log(OpItem);
        if (OpItem.comment) {
          setScomment(true);
        }
      }
    }
  }, [control]);

  return (
    <>
      <div className='flex items-baseline justify-between pt-[8px]   pr-[10px] lg:pr-0  transition-all ease-in-out '>
        <h2 className='w-[150px]'>{op.data.name}</h2>
        <p className='price '>{op.data.price} Dhs</p>
        {op.data.comment ? (
          <button
            onClick={() => {
              setShowModal2(true);
              setOpComment(op.data.comment);
            }}
            className='comment-btn '
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
        ) : (
          <button
            className='add-comment-btn '
            onClick={() => {
              setShowModal(true);
              handleComment(op.data.id, uuid);
            }}
          >
            {/* <img src={icon} alt='' /> */}

            <svg
              width='20px'
              height='20px'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <g id='SVGRepo_bgCarrier' stroke-width='0' />

              <g
                id='SVGRepo_tracerCarrier'
                stroke-linecap='round'
                stroke-linejoin='round'
              />

              <g id='SVGRepo_iconCarrier'>
                {" "}
                <g clip-path='url(#clip0_429_11161)'>
                  {" "}
                  <path
                    d='M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 13.4876 3.36093 14.891 4 16.1272L3 21L7.8728 20C9.10904 20.6391 10.5124 21 12 21Z'
                    stroke='#292929'
                    stroke-width='2.5'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />{" "}
                  <path
                    d='M12 9.00104V15.001'
                    stroke='#292929'
                    stroke-width='2.5'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />{" "}
                  <path
                    d='M9 12.001H15'
                    stroke='#292929'
                    stroke-width='2.5'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />{" "}
                </g>{" "}
                <defs>
                  {" "}
                  <clipPath id='clip0_429_11161'>
                    {" "}
                    <rect width='24' height='24' fill='white' />{" "}
                  </clipPath>{" "}
                </defs>{" "}
              </g>
            </svg>
          </button>
        )}
      </div>
      {/* {showModal ? (
        <>
          <Modal2 setShowModal={setShowModal} op={op} uuid={uuid} />
        </>
      ) : null} */}
    </>
  );
};

export default MoreItems;
