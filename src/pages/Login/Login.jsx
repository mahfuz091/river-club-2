import { useState } from "react";
import axiosInstance from "../../axios/axios-instance";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { username, password };
    try {
      const response = await axiosInstance.post("/users/connect", user);
      const accessToken = response.data.username;
      const data = response.data;

      // Store the access token in localStorage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem('user', JSON.stringify(data))
      navigate("/");

      // console.log('Response:', response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className=' flex lg:justify-center items-center  login_bg relative'>
      <div className='overlay'></div>
      <form
        onSubmit={handleSubmit}
        className=' lg:py-[60px] px-[20px] lg:px-[70px] login'
      >
        <div className='text-center'>
          <h3 className='font-semibold text-[32px] md:text-2xl mb-[10px]'>
            Login
          </h3>
          <p className='mb-[45px]'>Welcome Back!</p>
        </div>
        <div className='md:px-12 lg:px-0'>
          <div className='mb-5 '>
            <label className='font-medium block mb-[14px]' htmlFor=''>
              Username
            </label>
            <input
              className='border-[#DDDEDE] border w-full  px-[16px] py-[21px] rounded-full placeholder-[#C9C9C9] bg-[#FCFCFC]'
              placeholder='Enter your username'
              required
              type='text'
              name='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className=''>
            <label className='font-medium block mb-[14px]' htmlFor=''>
              Password
            </label>
            <input
              className='border-[#DDDEDE] border w-full  px-[16px] py-[21px] rounded-full placeholder-[#C9C9C9] bg-[#FCFCFC]'
              placeholder='Enter password'
              required
              type='password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p className='font-medium text-[#F06D23] mt-5 text-end'>
            Forget Password
          </p>
          <button
            type='submit'
            className=' mt-[30px] w-full rounded-full font-medium text-[19px] bg-[#F06D23] py-[15px] text-white mb-[53px]'
          >
            Log in
          </button>
          <p className='text-[14px] md:text-base text-center'>
            Dont have and account?{" "}
            <a href='#' className='text-[#F06D23] font-semibold'>
              Create an account
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
