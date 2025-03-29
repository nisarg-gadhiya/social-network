"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "../hooks/useForm"
import { useAuth } from "../hooks/useAuth"
import Input from "../components/common/Input"
import Button from "../components/common/Button"
import Card from "../components/common/Card"

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [authError, setAuthError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = (values) => {
    const errors = {}

    if (!values.email) {
      errors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email is invalid"
    }

    if (!values.password) {
      errors.password = "Password is required"
    }

    return errors
  }

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useForm(
    {
      email: "",
      password: "",
      rememberMe: false,
    },
    validateForm,
  )

  const onSubmit = async (formValues) => {
    setAuthError("")
    setIsLoading(true)

    try {
      await login(formValues.email, formValues.password)
      navigate("/dashboard")
    } catch (error) {
      console.error("Login error:", error)
      setAuthError("Invalid email or password. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Welcome Back</h1>
        <p className="text-gray-600 mt-2">Sign in to your account</p>
      </div>

      <Card>
        {authError && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{authError}</div>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && errors.email}
            required
          />

          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && errors.password}
            required
          />

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                checked={values.rememberMe}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link to="/forgot-password" className="text-blue-600 hover:underline">
                Forgot your password?
              </Link>
            </div>
          </div>

          <Button type="submit" fullWidth disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </Card>
    </div>
  )
}

export default Login
