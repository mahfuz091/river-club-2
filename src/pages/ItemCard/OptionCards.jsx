import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

const OptionCards = ({
  option,
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
  const [id, setId] = useState([]);

  useEffect(() => {
    const id = selectedItem.find((item) => item === option.id);
    setId(id);
  }, [selectedItem]);

  // console.log(option);
  return (
    <div>
      <div>
        <Toaster position='top-right' reverseOrder={false} />
      </div>
      <div
        onClick={() => {
          // addToItem(option);
          handleItemAdd(option);
          handleItemClick(option?.id);
        }}
        className={
          id === option?.id
            ? " modal-card-select  flex items-center gap-[15px] mb-[20px]"
            : "modal-card   flex items-center gap-[15px] mb-[20px]"
        }
      >
        <img src={option?.image} alt='' />
        <div>
          <h4>{option?.name}</h4>
          <p>{option?.price} Dhs</p>
        </div>
      </div>
      {/* <input
                type='text'
                name=''
                id=''
                className='modal-input'
                placeholder='Write something...'

                onChange={(e) => setInputValue(e.target.value)}
            /> */}
    </div>
  );
};

export default OptionCards;
