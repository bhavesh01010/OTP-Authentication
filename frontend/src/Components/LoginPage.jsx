import React from 'react'
import LeftImg from "../assets/leftSide.webp";
const LoginPage = () => {
  return (
    <div>
       <div className="login">
      <div
        className="leftSide"
        style={{
          backgroundImage:  `url(${LeftImg})`,
        }}
      ></div>
      <div className="rightSide">
        <h1> Login</h1>

        <form id="contact-form" method="POST">
          <label htmlFor="email">Email</label>
          <input name="email" placeholder="Enter email..." type="email" />
          <button type="submit"> Verify Email</button>
        </form>
      </div>
    </div>
    </div>
  )
}

export default LoginPage
