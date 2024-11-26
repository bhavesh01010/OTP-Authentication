import React, { useState } from 'react'
import OTPImg from './assets/otpBg.jpg'
const VerifyOTP = () => {
    const [otp,setOtp]=useState(new Array(4).fill(""))
  return (
    <div style={{
        backgroundImage:  `url(${OTPImg})`,
      }}>
      <h1>Enter OTP</h1>
      {/* {otp.map((value,index)=>{
        <input id={index} type="text"
        value={value}
        />
          
      })} */}
    </div>
  )
}

export default VerifyOTP
