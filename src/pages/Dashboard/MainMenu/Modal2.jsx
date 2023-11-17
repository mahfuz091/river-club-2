import React, { useState } from "react";

const Modal2 = ({
  op,
  setShowModal,
  suuid,
  sid,
  handleAddComment,
  control,
  setControl,
  inputValue,
  setInputValue,
}) => {
  return (
    <div className='flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none '>
      <div className='relative  my-6 mx-auto w-[360px] h-1/2'>
        <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
          <div className='modal-box'>
            <form method='dialog'>
              {/* if there is a button in form, it will close the modal */}
              <button
                onClick={() => {
                  setShowModal(false);
                }}
                className='close-btn absolute right-[10px] top-[10px]'
              >
                ✕
              </button>
            </form>
            <div className="mt-[50px]"></div>
            <h2 className="ml-[20px] mb-3">Write Comment</h2>
            <input
              type='text'
              name=''
              id=''
              className='modal-input ml-[20px]'
              placeholder='Write something...'

              onChange={(e) => setInputValue(e.target.value)}
            />

            <button
              className='ok-btn'
              // className='ok-btn'
              onClick={() => {
                setShowModal(false);
                setControl(!control);
                handleAddComment(sid, suuid);
              }}
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal2;
