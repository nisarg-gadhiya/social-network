import React from "react"
import { Outlet } from "react-router-dom"
import Footer from "../components/common/Footer"

const AuthLayout = () => {
  return (
    <div className="auth-layout">
      <div className="auth-container">
        <div className="auth-content">
          <Outlet />
        </div>
        <div className="auth-background">
          <div className="auth-overlay">
            <div className="auth-message">
              <h1>Connect with like-minded individuals</h1>
              <p>Join our community and expand your network</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default AuthLayout
