import React, { useState } from 'react';
//import './Singup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your registration logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="container">
      {/* Left side - Form */}
      <div className="form-container">
        <div className="form-content">
          <h1 className="form-title">ECB Register</h1>
          <p className="form-subtitle">Enter your information to register</p>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstName">
                First Name<span className="required">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="John"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="lastName">
                Last Name<span className="required">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Doe"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">
                Email<span className="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john.doe@example.com"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">
                Password<span className="required">*</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="8-16 characters"
                required
                minLength={8}
                maxLength={16}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">
                Confirm Password<span className="required">*</span>
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="8-16 characters"
                required
                minLength={8}
                maxLength={16}
              />
            </div>
            
            <button type="submit" className="register-button">
              Register
            </button>
          </form>
        </div>
      </div>
      
      {/* Right side - Banner */}
      <div className="banner-container">
        <div className="bulb-icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <h2 className="banner-title">Electricity</h2>
        <h2 className="banner-title">Consumption</h2>
        <h2 className="banner-title">Bill</h2>
      </div>
    </div>
  );
};

export default Signup;