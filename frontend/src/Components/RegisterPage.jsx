import React, { useState } from "react";
import "../Style/RegisterPage.css";
import LeftImg from "../assets/leftSide.webp";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    name: "",
    userName: "",
    email: "",
    age: "",
    gender: "male",
    phoneNumber: "",
    address: "",
  });
  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setRegisterData({ ...registerData, [name]: value });
  }
  async function handleForm(e) {
    e.preventDefault();
    try {
      console.log(registerData);
      const resp = await fetch("http://localhost:8800/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });
      const data = await resp.json();
      console.log(data);
      if (data.status === "success") {
        alert(data.message);
        navigate("/verifyOTP");
        
        setRegisterData({
          name: "",
          userName: "",
          email: "",
          age: "",
          gender: "male",
          phoneNumber: "",
          address: "",
        });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="register">
      <div
        className="leftSide"
        style={{
          backgroundImage: `url(${LeftImg})`,
        }}
      ></div>
      <div className="rightSide">
        <h1> Register Page</h1>

        <form id="contact-form" onSubmit={handleForm}>
          <label htmlFor="name">Full Name</label>
          <input
            name="name"
            placeholder="Enter full name..."
            type="text"
            value={registerData.name}
            onChange={handleChange}
          />

          <label htmlFor="userName">User Name</label>
          <input
            name="userName"
            placeholder="Enter userName..."
            type="text"
            value={registerData.userName}
            onChange={handleChange}
          />
          <label htmlFor="email">Email</label>
          <input
            name="email"
            placeholder="Enter email..."
            type="email"
            value={registerData.email}
            onChange={handleChange}
          />
          <label htmlFor="age">Age</label>
          <input
            name="age"
            placeholder="Enter age..."
            type="number"
            value={registerData.age}
            onChange={handleChange}
          />
          <label htmlFor="gender">Gender</label>
          {/* <div className="gender">
            <span>Male</span>
            <input
              name="gender"
              placeholder=""
              type="radio"
              value={registerData.gender}
              onChange={handleChange}
            />
          </div>
          <div className="gender">
            <span>Female</span>
            <input
              name="gender"
              placeholder=""
              type="radio"
              value={registerData.gender}
              onChange={handleChange}
            />
          </div> */}
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            name="phoneNumber"
            placeholder="Enter phone number..."
            type="text"
            value={registerData.phoneNumber}
            onChange={handleChange}
          />
          <label htmlFor="address">Address</label>
          <input
            name="address"
            placeholder="Enter address number..."
            type="text"
            value={registerData.address}
            onChange={handleChange}
          />
          <button type="submit">Verify Email</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
