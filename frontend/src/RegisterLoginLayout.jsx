import React from 'react'
import {Outlet} from 'react-router-dom'

const RegisterLoginLayout = () => {
  return (
    <div>
      <LeftSide/>
      <Outlet/>
    </div>
  )
}

export default RegisterLoginLayout
