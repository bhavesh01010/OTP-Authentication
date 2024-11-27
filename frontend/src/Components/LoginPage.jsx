import React, { useState } from "react";
import "../Style/LoginPage.css";
import LeftImg from "../assets/leftSide.webp";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    userName: "",
  });
  function handleChange(e) {
    const name=e.target.name;
    const value=e.target.value;
    setFormData({...formData,[name]:value})
  }
  async function handleForm(e){
    e.preventDefault();
    console.log(formData)
    const resp=await fetch('http://localhost:8800',{
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
    const data=await resp.json();
    console.log(data)
    if(data.status==='success'){
      alert(data.message)
      navigate('/verifyOTP')
      setFormData({
        email: "",
        userName: "",
      })

    }else{
      alert(data.message)
    }
  }
  return (
    <div>
      <div className="login">
        <div
          className="leftSide"
          style={{
            backgroundImage: `url(${LeftImg})`,
          }}
        ></div>
        <div className="rightSide">
          <h1> Login</h1>

          <form id="contact-form" onSubmit={handleForm}>
            <label htmlFor="email">Email</label>
            <input
              name="email"
              placeholder="Enter email..."
              type="email"
              value={formData.value}
              onChange={handleChange}
            />
            <label htmlFor="userName">UserName</label>
            <input
              name="userName"
              placeholder="Enter UserName..."
              type="text"
              value={formData.value}
              onChange={handleChange}
            />
            <button type="submit"> Get OTP on email</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
