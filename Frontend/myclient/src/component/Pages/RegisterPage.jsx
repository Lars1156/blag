import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../cssFiles/register.css'; // Import custom styles
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [role, setRole] = useState('Reader'); // Default role set to Reader
  const [image, setimage] = useState(null);
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleFileChange = (e) => {
    setimage(e.target.files[0]);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setPasswordError('');

    if (!userName || !email || !password || !role || !bio) {
      setError('Please fill in all required fields.');
      return;
    }

    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long.');
      return;
    }

    const formData = new FormData();
    formData.append('userName', userName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('role', role);
    formData.append('bio', bio);
    if (image) {
      formData.append('image', image);
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/api/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        navigate('/login');
      }
    } catch (err) {
      setError(err.response?.data?.msg || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg p-4 w-100" style={{ maxWidth: '500px' }}>
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

          {/* Password */}
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
                onChange={(e) => setPassword(e.target.value)}
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

          {/* Bio */}
          <div className="mb-3">
            <label htmlFor="bio" className="form-label">
              Bio
            </label>
            <textarea
              className="form-control"
              id="bio"
              name="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Write about yourself"
              rows="3"
              required
            ></textarea>
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
              <option value="admin">Admin</option>
              <option value="author">Author</option>
              <option value="reader">Reader</option>
            </select>
          </div>

          {/* Profile Picture */}
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Profile Picture
            </label>
            <input
              type="file"
              className="form-control"
              id="profilePicture"
              name="profilePicture"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <div className="text-center mt-3">
          <p>
            Already have an account? <a href="/login">Login Here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
