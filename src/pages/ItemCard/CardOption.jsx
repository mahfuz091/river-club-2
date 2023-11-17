import React, { useEffect, useState } from "react";
import OptionCards from "./OptionCards";

const CardOption = ({
  singleOption,
  handleOK,
  setAddItem,
  addToItem,
  selectedItem,
  handleItemClick,
  handleItemAdd,
  selectedOption,
  setInputValue,
  inputValue,
  handleOpOk,
}) => {
  // console.log(singleOption);
  return (
    <div
      // onClick={() => {
      //   addToItem(singleOption);
      //   handleItemClick(singleOption.id);
      // }}
      className={
        selectedItem === singleOption.id
          ? "modal-card bg-slate-100 px-[20px]  mb-[20px]"
          : "modal-card  px-[20px]  mb-[20px]"
      }
    >
      <h2 className='mb-[10px]  font-bold'>
        Choisir {singleOption.categoryID}
      </h2>
      {singleOption.options?.map((option, index) => (
        <OptionCards
          key={index}
          option={option}
          selectedItem={selectedItem}
          handleItemClick={handleItemClick}
          handleOK={handleOK}
          setAddItem={setAddItem}
          addToItem={addToItem}
          handleItemAdd={handleItemAdd}
          selectedOption={selectedOption}
          setInputValue={setInputValue}
          inputValue={inputValue}
          handleOpOk={handleOpOk}
        ></OptionCards>
      ))}
      {/* <img src={singleOption.image} alt='' />
      <div>
        <h4>{singleOption.name}</h4>
        <p>{singleOption.price} Dhs</p>
      </div> */}
    </div>
  );
};

export default CardOption;
