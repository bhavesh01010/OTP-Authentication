import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "../Style/verifyOTP.css";
import OTPImg from "../assets/OTPImg.jpg";
import { useLocation, useNavigate } from "react-router-dom";
const VerifyOTP = () => {
  const location=useLocation()
  console.log(location.state)
  const navigate = useNavigate();
  const inputRef = useRef([]);

  const [OTP, setOtp] = useState(new Array(4).fill(""));

  useEffect(() => {
    if (inputRef.current[0]) {
      inputRef.current[0].focus();
    }
  }, []);

  function handleChange(index, e) {
    const value = e.target.value;
    if (isNaN(value)) return;
    const newOtp = [...OTP];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 4 && inputRef.current[index + 1]) {
      inputRef.current[index + 1].focus();
    }
  }

  function handleKeyDown(index, e) {
    console.log(e.key);
    if (
      e.key === "Backspace" &&
      !OTP[index] &&
      index > 0 &&
      inputRef.current[index - 1]
    ) {
      inputRef.current[index - 1].focus();
    }
  }

  function handleClick(index) {
    inputRef.current[index].setSelectionRange(1, 1);
  }

  async function handleSubmit() {
    try {
      const combinedOTP = OTP.join("");
      console.log(combinedOTP);

      if (combinedOTP.length == 4) {
        console.log(location.state.userName)
        const payload = {
          otp: combinedOTP,
          userName: location.state.userName,
        };
        
        console.log(payload);
        const resp = await fetch("http://localhost:8800/verifyOtp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        const data = await resp.json();
        console.log(data)
        if (data.status === "success") {
          navigate("/home");
        } else {
          alert(data.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div
      className="verifyOTP">
      <div className="main-box">
        <h1>Enter OTP</h1>
        <div>
          {OTP.map((value, index) => {
            return (
              <input
                key={index}
                ref={(input) => (inputRef.current[index] = input)}
                type="text"
                value={value}
                onChange={(e) => handleChange(index, e)}
                onClick={() => handleClick(index)}
                onKeyDown={(e) => handleKeyDown(index, e)}
              />
            );
          })}
        </div>
        <button className="resend-btn">Resend OTP</button>
        <button className="submit-btn" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default VerifyOTP;
