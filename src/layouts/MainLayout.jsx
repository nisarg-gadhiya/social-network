"use client"
import React from "react"
import { Outlet, Navigate } from "react-router-dom"
import Header from "../components/common/Header"
import Footer from "../components/common/Footer"
import { useAuth } from "../hooks/useAuth"
import LoadingSpinner from "../components/common/LoadingSpinner"

const MainLayout = () => {
  const { user, loading } = useAuth()

  if (loading) {
    return <LoadingSpinner />
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  return (
    <div className="main-layout">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
