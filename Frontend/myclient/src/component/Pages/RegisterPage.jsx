import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
  const[userName , setUserName] = useState();
  const[email , setEmail] = useState();
  const[password , setPassword] = useState()
  const[role , setRole] = useState('reader');
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleRegister = async(e) => {
    e.preventDefault();
    setError('');
    setPasswordError('');
    setLoading(true);
    // Check if password is at least 8 characters
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long.');
      setLoading(false);
      return;
    }
    try {
      // Send registration request to backend
      const response = await axios.post('http://localhost:5006/api/register', { userName, email, password, role ,bio });
      
      if (response.status === 200) {
        // Redirect to login page after successful registration
        navigate('/login');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: '400px' }}>
        <h3 className="text-center mb-4">Register</h3>
         {error && <div className="alert alert-danger">{error}</div>}
          {passwordError && <div className="alert alert-warning">{passwordError}</div>}
        <form onSubmit={handleRegister}>
          {/* User Name */}
          <div className="mb-3">
            <label htmlFor="userName" className="form-label">
              User Name
            </label>
            <input
              type="text"
              className="form-control"
              id="userName"
              name="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password with Hide/Show Icon */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                id="password"
                name="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Role */}
          <div className="mb-3">
            <label htmlFor="role" className="form-label">
              Role
            </label>
            <select
              className="form-select"
              id="role"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="Admin">Admin</option>
              <option value="Developer">Manger</option>
              <option value="Developer">Developer</option>
              <option value="Intern">Intren</option>
              <option value="Tester">Tester</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-3" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
        </form>
        <div className="text-center">
            <p>Already have an account? <a href="/login">Login Here</a></p>
          </div>
      </div>
    </div>
  );
};

export default RegisterPage;
