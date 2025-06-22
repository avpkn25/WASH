import React, { useState } from "react";
import { User, Mail, Phone, Calendar, Lock, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AddPerson() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.dob) newErrors.dob = "Date of Birth is required";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      // Map 'name' to 'fullName' for backend
      const payload = {
        fullName: formData.name,
        email: formData.email,
        phone: formData.phone,
        gender: formData.gender,
        dob: formData.dob,
        password: formData.password,
      };
      const res = await fetch("/api/user/create-dsp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include", // Ensure cookies (JWT) are sent
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to add person");
      }
      setLoading(false);
      alert("Person added successfully!");
      navigate("/dcmdashboard");
    } catch (err) {
      setLoading(false);
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-400 via-white to-pink-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 animate-fade-in-up">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <PlusCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Add New Person
            </h1>
            <p className="text-gray-500">
              Register a new individual under your center
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              name="name"
              placeholder="Full Name"
              Icon={User}
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
            />
            <Input
              name="email"
              type="email"
              placeholder="Email"
              Icon={Mail}
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />
            <Input
              name="phone"
              placeholder="Phone"
              Icon={Phone}
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
            />

            <Input
              name="password"
              type="password"
              placeholder="Password"
              Icon={Lock}
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
            />

            {/* Gender */}
            <div>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full py-3 px-4 border rounded-xl bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="">Select Gender</option>
                <option value="FEMALE">Female</option>
                <option value="MALE">Male</option>
                <option value="OTHER">Other</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-sm mt-1 animate-shake">
                  {errors.gender}
                </p>
              )}
            </div>

            {/* DOB */}
            <Input
              name="dob"
              type="date"
              placeholder="Date of Birth"
              Icon={Calendar}
              value={formData.dob}
              onChange={handleChange}
              error={errors.dob}
            />

            <button
              type="submit"
              className="w-full py-4 px-6 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:scale-105 flex items-center justify-center space-x-2 group"
            >
              <span>{loading ? "Adding Person..." : "Add Person"}</span>
              <PlusCircle
                className={`w-5 h-5 group-hover:translate-x-1 transition ${
                  loading ? "animate-spin" : ""
                }`}
              />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const Input = ({
  name,
  type = "text",
  placeholder,
  Icon,
  value,
  onChange,
  error,
}) => (
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
        error ? "border-red-400 focus:ring-red-500" : "border-gray-300"
      }`}
    />
    {error && (
      <p className="text-red-500 text-sm mt-1 animate-shake">{error}</p>
    )}
  </div>
);

export default AddPerson;
