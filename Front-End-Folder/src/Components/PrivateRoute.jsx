import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children, role }) => {
  const isValid = localStorage.getItem("valid")
  const userRole = localStorage.getItem("role")

  if (!isValid) return <Navigate to="/" />
  if (role && userRole !== role) return <Navigate to="/" />

  return children
}

export default PrivateRoute
