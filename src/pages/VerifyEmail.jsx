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
    const storedData = JSON.parse(localStorage.getItem('signupData'));
    if (!signupData && !storedData) {
      console.error('Signup data is missing');
      navigate('/signup'); // Redirect back to signup
    }
  }, [signupData, navigate]);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const data = signupData || JSON.parse(localStorage.getItem('signupData'));
    if (!data) {
      console.error('Signup data is missing');
      return;
    }

    const { accountType, firstName, lastName, email, password, confirmPassword } = data;

    dispatch(signup(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate));
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      {loading ? (
        <div>
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center max-w-md w-full p-8 bg-gray-800 bg-opacity-70 backdrop-blur-xl rounded-2xl shadow-lg">
          <h1 className="text-3xl sm:text-4xl font-bold text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text mb-6">
            Verify Email
          </h1>

          <form onSubmit={handleOnSubmit} className="flex flex-col w-full space-y-4">
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span>-</span>}
              renderInput={(props) => (
                <input
                  {...props}
                  style={{
                    boxShadow: 'inset 0px -1px 0px rgba(255, 255, 255, 0.18)',
                  }}
                  className="w-10 sm:w-12 md:w-14 bg-gray-700 text-white text-lg sm:text-xl rounded-lg p-2 text-center focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              )}
            />

            <button
              type="submit"
              className="mt-5 w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-transform duration-200 hover:scale-105"
            >
              Verify Email
            </button>
          </form>

          <div className="w-full mt-5">
            <button
              onClick={() => dispatch(sendOtp(signupData.email))}
              className="w-full py-3 bg-gray-700 text-white font-bold rounded-lg shadow-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-transform duration-200 hover:scale-105"
            >
              Resend Code
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
