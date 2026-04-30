import React, { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle forgot password
    setSubmitted(true);
  };

  return (
    <div className="forgot-password-page">
      <form onSubmit={handleSubmit} className="forgot-password-form">
        <h1>Forgot Password</h1>
        {!submitted ? (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Reset Password</button>
          </>
        ) : (
          <p>Check your email for reset instructions</p>
        )}
      </form>
    </div>
  );
};

export default ForgotPassword;
