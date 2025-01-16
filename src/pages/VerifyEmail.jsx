import React, { useEffect, useState } from 'react';
import OTPInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import { signup, sendOtp } from '../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { signupData, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    // Fallback to localStorage if Redux state is empty
    const storedData = JSON.parse(localStorage.getItem('signupData'));
    if (!signupData && !storedData) {
      console.error('Signup data is missing');
      navigate('/signup'); // Redirect back to signup
    }
  }, [signupData, navigate]);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    // Use signupData from Redux or localStorage
    const data = signupData || JSON.parse(localStorage.getItem('signupData'));
    if (!data) {
      console.error('Signup data is missing');
      return;
    }

    const { accountType, firstName, lastName, email, password, confirmPassword } = data;

    // Dispatch the signup action
    dispatch(signup(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate));
  };

  return (
    <div className='flex justify-center items-center max-w-full w-full my-auto mx-auto'>
      {
        loading ? (
          <div>
            <div className="spinner"></div>
          </div>
        ) : (
          <div className='flex flex-col justify-center items-center max-w-md w-full p-8 bg-gray-700 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-md shadow-green-300'>
          <h1 className='font-serif text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>Verify Email</h1>
          <form onSubmit={handleOnSubmit} className='flex flex-col gap-y-2'>
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span>-</span>}
              renderInput={(props) => (
                  <input 
                      {...props}
                      style={{
                          boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                      }}    
                      className="w-[48px] lg:w-[60px] border-0 bg-gray-500 rounded-[0.5rem] text-white aspect-square text-center focus:border-0 focus:outline-2 focus:outline-green-300"
                  /> 
              )}
            />

              <button type="submit" className='font-serif mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'>
                  Verify Email
              </button>
          </form>

          <div>
              <button onClick={() => dispatch(sendOtp(signupData.email))}
                  className='font-serif mt-5 w-full py-3 px-4 bg-gray-700 text-white font-bold rounded-lg shadow-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'    
              >
                  Resend code
              </button>
          </div>
        </div>

        )
      }
    </div>
  )
}

export default VerifyEmail