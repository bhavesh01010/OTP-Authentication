import React, { useState } from "react";
import "../Style/verifyOTP.css";
import OTPImg from "../assets/OTPImg.jpg";
const VerifyOTP = () => {
  const [otp, setOtp] = useState(new Array(4).fill(""));
  console.log(otp);
  function handleChange(index,e){
    const value=e.target.value;
    const newOtp=[...otp]
    newOtp[index]=value;
    setOtp(newOtp)
    
  }
  return (
    <div
      className="verifyOTP"
      // style={{
      //     backgroundImage:  `url(${OTPImg})`,
      // }}
    >
      <div className="main-box">
        <h1>Enter OTP</h1>
        <div>
          {otp.map((value,index) => {
            return (
              <>
                <input 
                key={index}
                type="text" value={value}
                
                onChange={(e)=>handleChange(index,e)} />
              </>
            );
          })}
        </div>
        <button className="resend-btn">Resend OTP</button>
        <button className="submit-btn">Submit</button>
      </div>
    </div>
  );
};

export default VerifyOTP;
