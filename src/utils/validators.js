/**
 * Validate personal information form
 * @param {Object} values - Form values
 * @returns {Object} Validation errors
 */
export const validatePersonalInfo = (values) => {
    const errors = {}
  
    if (!values.firstName) {
      errors.firstName = "First name is required"
    }
  
    if (!values.lastName) {
      errors.lastName = "Last name is required"
    }
  
    if (!values.location) {
      errors.location = "Location is required"
    }
  
    if (!values.occupation) {
      errors.occupation = "Occupation is required"
    }
  
    if (!values.bio) {
      errors.bio = "Bio is required"
    } else if (values.bio.length < 10) {
      errors.bio = "Bio must be at least 10 characters"
    } else if (values.bio.length > 500) {
      errors.bio = "Bio must be less than 500 characters"
    }
  
    return errors
  }
  
  /**
   * Validate login form
   * @param {Object} values - Form values
   * @returns {Object} Validation errors
   */
  export const validateLogin = (values) => {
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
  
  /**
   * Validate registration form
   * @param {Object} values - Form values
   * @returns {Object} Validation errors
   */
  export const validateRegistration = (values) => {
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
  
    if (!values.confirmPassword) {
      errors.confirmPassword = "Please confirm your password"
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Passwords do not match"
    }
  
    if (!values.agreeTerms) {
      errors.agreeTerms = "You must agree to the terms and conditions"
    }
  
    return errors
  }
  
  /**
   * Validate message form
   * @param {Object} values - Form values
   * @returns {Object} Validation errors
   */
  export const validateMessage = (values) => {
    const errors = {}
  
    if (!values.content) {
      errors.content = "Message cannot be empty"
    } else if (values.content.length > 1000) {
      errors.content = "Message is too long (maximum 1000 characters)"
    }
  
    return errors
  }
  
  