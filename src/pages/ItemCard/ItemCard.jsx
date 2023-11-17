import React, { useState } from "react";

import ItemModal2 from "./ItemModal2";
import Modal2 from "../Dashboard/MainMenu/Modal2";

const ItemCard = ({ singleData, setControl, control }) => {
  const [showModal, setShowModal] = useState(false);
  const { name, image, price } = singleData;
  // console.log(singleData);
  const [value, setValue] = useState(1);
  const setIncrease = () => {
    setValue(parseInt(value) + 1);
  };
  const setDecrease = () => {
    if (value > 0) {
      setValue(parseInt(value) - 1);
    }
  };
  return (
    <>
      <div className='card relative'>
        <img src='/images/img-1.png' alt='' />
        <h2>{name}</h2>
        <button onClick={() => setShowModal(true)} className='add-btn'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            viewBox='0 0 20 20'
            fill='none'
          >
            <path
              d='M10 5V15M15 10H5'
              stroke='white'
              stroke-width='1.5'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
          </svg>
        </button>
        <div className='flex gap-[5px] items-center ml-[10px]'>
          <p className='price'>{price} Dhs</p>
          <div className='input-group'>
            <button className='' onClick={() => setDecrease()}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='12'
                height='3'
                viewBox='0 0 12 3'
                fill='none'
                className='plus-minus'
              >
                <path d='M0 2.9917H12V-0.00683594H0V2.9917Z' fill='#999999' />
              </svg>
            </button>
            <p id='qty'>{value}</p>
            <button className='' onClick={() => setIncrease()}>
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
        </div>
      </div>
      {showModal ? (
        <ItemModal2
          singleData={singleData}
          setShowModal={setShowModal}
          value={value}
          setControl={setControl}
          control={control}
        ></ItemModal2>
      ) : null}
    </>
  );
};

export default ItemCard;
