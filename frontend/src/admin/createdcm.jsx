import React, { useState } from 'react';
import { User, Mail, Lock, Phone, Calendar, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({
    fullname: '', email: '', password: '', confirmPassword: '',
    phone: '', gender: '', dob: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullname.trim()) newErrors.fullname = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.dob) newErrors.dob = 'Date of Birth is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    alert('Signup successful!');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-500 via-orange-100 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-8 animate-fade-in-up">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <User className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
            <p className="text-gray-500">Join the WASH community</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input name="fullname" placeholder="Full Name" Icon={User} value={formData.fullname} onChange={handleChange} error={errors.fullname} />
            <Input name="email" type="email" placeholder="Email" Icon={Mail} value={formData.email} onChange={handleChange} error={errors.email} />
            <Input name="password" type="password" placeholder="Password" Icon={Lock} value={formData.password} onChange={handleChange} error={errors.password} />
            <Input name="confirmPassword" type="password" placeholder="Re-enter Password" Icon={Lock} value={formData.confirmPassword} onChange={handleChange} error={errors.confirmPassword} />
            <Input name="phone" placeholder="Phone" Icon={Phone} value={formData.phone} onChange={handleChange} error={errors.phone} />
            
            {/* Gender */}
            <div>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full py-3 px-4 border rounded-xl bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="">Select Gender</option>
                <option>Female</option>
                <option>Male</option>
                <option>Other</option>
              </select>
              {errors.gender && <p className="text-red-500 text-sm mt-1 animate-shake">{errors.gender}</p>}
            </div>

            {/* DOB */}
            <Input name="dob" type="date" placeholder="Date of Birth" Icon={Calendar} value={formData.dob} onChange={handleChange} error={errors.dob} />

            <button
              type="submit"
              className="w-full py-4 px-6 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:scale-105 flex items-center justify-center space-x-2 group"
            >
              <span>Sign Up</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              Already have an account?{' '}
              <button
                className="text-orange-500 hover:underline font-medium"
                onClick={() => navigate('/login')}
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const Input = ({ name, type = 'text', placeholder, Icon, value, onChange, error }) => (
  <div className="relative group">
    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            {Icon && <Icon className="w-5 h-5 text-gray-400" />}
    </div>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full pl-12 pr-4 py-3 bg-gray-50 border rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 ${
        error ? 'border-red-400 focus:ring-red-500' : 'border-gray-300'
      }`}
    />
    {error && <p className="text-red-500 text-sm mt-1 animate-shake">{error}</p>}
  </div>
);

export default Signup;