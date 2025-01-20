import { useState } from "react";
import GlideGoPng from "../../public/GlideGoLogo.png";
import { Link } from "react-router-dom";

const CaptainRegister = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    status: "",
    vehicleColor: "",
    vehicleCapacity: "",
    vehicleNumberPlate: "",
    vehicleType: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "firstName" || name === "lastName") {
      setFormData({
        ...formData,
        fullName: {
          ...formData.fullName,
          [name]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setFormData({
      fullName: {
        firstName: "",
        lastName: "",
      },
      email: "",
      password: "",
      status: "",
      vehicleColor: "",
      vehicleCapacity: "",
      vehicleNumberPlate: "",
      vehicleType: "",
    });
    // Add form submission logic here (API call, form validation, etc.)
  };

  return (
    <div className="container min-h-screen mx-auto p-8 bg-cover bg-center h-screen bg-[url('https://tse2.mm.bing.net/th?id=OIG4.VGj7VRQHiej.900iOhPd&pid=ImgGn')] relative">
      <Link to="/">
        <img
          src={GlideGoPng}
          alt="GlideGo"
          className="w-16 h-16 rounded-full absolute left-0 top-0 p-2 m-3 z-[999]"
        />
      </Link>
      <div className="max-w-xl mx-auto max-h-screen  bg-opacity-25 p-10 rounded-xl shadow-xl backdrop-blur-md overflow-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="firstName"
                className="block text-teal-300 font-medium"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-teal-300 font-medium"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-teal-300 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-teal-300 font-medium"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
          <div>
            <label htmlFor="status" className="block text-teal-300 font-medium">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            >
              <option value="">Select Status</option>
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="vehicleColor"
                className="block text-teal-300 font-medium"
              >
                Vehicle Color
              </label>
              <input
                type="text"
                id="vehicleColor"
                name="vehicleColor"
                value={formData.vehicleColor}
                onChange={handleChange}
                className="w-full p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="vehicleCapacity"
                className="block text-teal-300 font-medium"
              >
                Vehicle Capacity
              </label>
              <input
                type="number"
                id="vehicleCapacity"
                name="vehicleCapacity"
                value={formData.vehicleCapacity}
                onChange={handleChange}
                className="w-full p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="vehicleNumberPlate"
              className="block text-teal-300 font-medium"
            >
              Vehicle Number Plate
            </label>
            <input
              type="text"
              id="vehicleNumberPlate"
              name="vehicleNumberPlate"
              value={formData.vehicleNumberPlate}
              onChange={handleChange}
              className="w-full p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="vehicleType"
              className="block text-teal-300 font-medium"
            >
              Vehicle Type
            </label>
            <input
              type="text"
              id="vehicleType"
              name="vehicleType"
              value={formData.vehicleType}
              onChange={handleChange}
              className="w-full p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-1 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default CaptainRegister;
