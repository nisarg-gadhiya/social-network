"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "../hooks/useForm"
import { useAuth } from "../hooks/useAuth"
import Input from "../components/common/Input"
import Button from "../components/common/Button"
import Card from "../components/common/Card"

const Register = () => {
  const navigate = useNavigate()
  const { signup } = useAuth()
  const [authError, setAuthError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = (values) => {
    const errors = {}

    if (!values.name) {
      errors.name = "Name is required"
    }

    if (!values.email) {
      errors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email is invalid"
    }

    if (!values.password) {
      errors.password = "Password is required"
    } else if (values.password.length < 6) {
      errors.password = "Password must be at least 6 characters"
    }

    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Passwords do not match"
    }

    return errors
  }

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useForm(
    {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    },
    validateForm,
  )

  const onSubmit = async (formValues) => {
    if (!formValues.agreeTerms) {
      setAuthError("You must agree to the terms and conditions")
      return
    }

    setAuthError("")
    setIsLoading(true)

    try {
      await signup(formValues.email, formValues.password, formValues.name)
      navigate("/onboarding")
    } catch (error) {
      console.error("Registration error:", error)
      setAuthError("Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Create an Account</h1>
        <p className="text-gray-600 mt-2">Join our community</p>
      </div>

      <Card>
        {authError && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{authError}</div>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Full Name"
            name="name"
            placeholder="Enter your full name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.name && errors.name}
            required
          />

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
            placeholder="Create a password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && errors.password}
            helperText="Password must be at least 6 characters"
            required
          />

          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.confirmPassword && errors.confirmPassword}
            required
          />

          <div className="mb-6">
            <div className="flex items-center">
              <input
                id="agreeTerms"
                name="agreeTerms"
                type="checkbox"
                checked={values.agreeTerms}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="agreeTerms" className="ml-2 block text-sm text-gray-700">
                I agree to the{" "}
                <Link to="/terms" className="text-blue-600 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-blue-600 hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>
            {touched.agreeTerms && errors.agreeTerms && (
              <p className="mt-1 text-sm text-red-600">{errors.agreeTerms}</p>
            )}
          </div>

          <Button type="submit" fullWidth disabled={isLoading}>
            {isLoading ? "Creating account..." : "Sign up"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </Card>
    </div>
  )
}

export default Register
