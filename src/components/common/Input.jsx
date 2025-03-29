"use client"
import React from "react";
import { forwardRef } from "react"

const Input = forwardRef(
  (
    {
      label,
      name,
      type = "text",
      placeholder,
      value,
      onChange,
      onBlur,
      error,
      helperText,
      required = false,
      disabled = false,
      className = "",
      containerClassName = "",
      labelClassName = "",
      inputClassName = "",
      errorClassName = "",
      helperClassName = "",
      ...props
    },
    ref,
  ) => {
    const inputId = `input-${name}`

    return (
      <div className={`mb-4 ${containerClassName}`}>
        {label && (
          <label htmlFor={inputId} className={`block text-sm font-medium text-gray-700 mb-1 ${labelClassName}`}>
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <input
          ref={ref}
          id={inputId}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          className={`
          w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500
          ${error ? "border-red-500" : "border-gray-300"}
          ${disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed" : "bg-white"}
          ${inputClassName}
        `}
          {...props}
        />

        {error && <p className={`mt-1 text-sm text-red-600 ${errorClassName}`}>{error}</p>}

        {helperText && !error && <p className={`mt-1 text-sm text-gray-500 ${helperClassName}`}>{helperText}</p>}
      </div>
    )
  },
)

Input.displayName = "Input"

export default Input
