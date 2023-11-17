import React, { useState } from "react";

const Login2 = () => {
  const [value, setvalue] = useState("")
  console.log(value);
  return (
    <div className=' flex lg:justify-center items-center  login_bg relative'>
      <div className='overlay'></div>
      <div className=' lg:py-[60px] px-[20px] md:px-[50px] lg:px-[70px] md:flex gap-[150px] login'>
        <div className=''>
          <h3 className='text-center md:text-left font-semibold text-[32px] md:text-2xl mb-[10px]'>
            Login
          </h3>
          <p className='text-center md:text-left  mb-[144px]'>Welcome Back!</p>
          {/* <p className='select-title'>Select a waiter </p>
          <div className='flex md:block justify-between items-center gap-[10px]'>
            <button className='select-btn mb-[10px]'>Parc Jeu</button>
            <button className='select-btn mb-[10px]'>Parc Jeu</button>
            <button className='select-btn'>Parc Jeu</button>
          </div> */}
        </div>
        <div>
          <div className=''>
            <label className='font-medium block mb-[14px]' htmlFor=''>
              Password
            </label>
            <input
              className='border-[#DDDEDE] border w-[320px]  px-[16px] py-[21px] rounded-[8px] placeholder-[#C9C9C9] bg-[#FCFCFC]'
              placeholder='Enter password'
              type='password'
              name=''
              id=''
              value={value}
            />
          </div>
          <div className='login-button-group'>
            <button className='number' onClick={() => setvalue(value + 1)}>1</button>
            <button className='number' onClick={() => setvalue(value + 2)}>2</button>
            <button className='number' onClick={() => setvalue(value + 3)}>3</button>
            <button className='number' onClick={() => setvalue(value + 4)}>4</button>
            <button className='number' onClick={() => setvalue(value + 5)}>5</button>
            <button className='number' onClick={() => setvalue(value + 6)}>6</button>
            <button className='number' onClick={() => setvalue(value + 7)}>7</button>
            <button className='number' onClick={() => setvalue(value + 8)}>8</button>
            <button className='number' onClick={() => setvalue(value + 9)}>9</button>
            <button className='login-number number'>Login</button>
            <button className='number' onClick={() => setvalue(value + 0)}>0</button>
            <button className='number-cancel number' onClick={() => setvalue("")}>C</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login2;
