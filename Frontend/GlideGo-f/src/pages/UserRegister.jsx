import { useContext, useState } from "react";
import GlideGoPng from "../../public/GlideGoLogo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { userDataContext } from "../context/UserContext";

const UserRegister = () => {
  const { user, setUser } = useContext(userDataContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: {
      firstName: "",
      lastName: "",
    },
    email: " ",
    password: " ",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/register`,
      formData
    );
    if (response.status === 201) {
      const data = response.data;
      setUser(data.user); 
      localStorage.setItem("token",data.token)
      navigate("/homeUser");
    }
setFormData({
  fullName: {
    firstName: "",
    lastName: "",
  },
  email: " ",
  password: " ",
})
   
  };

  return (
    <div className="bg-cover bg-bottom bg-[url('https://tse1.mm.bing.net/th?id=OIG3.kuUAkaxym4tHy8Q6Egnr&pid=ImgGn')] h-screen w-full pt-8 bg-teal-900 flex flex-col justify-around items-center">
      <Link to="/">
        <img
          src={GlideGoPng}
          alt="GlideGo"
          className="w-16 h-16 rounded-full"
        />
      </Link>
      <div className="bg-transparent rounded-lg shadow-lg p-8 w-[80%] max-w-md -mt-44 pb-36">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-xl font-bold text-gray-700"
            >
              First Name{" "}
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              onChange={handleChange}
              required
              placeholder="Enter your first name"
              className="w-full px-3 py-2 border border-gray-300 text-white bg-teal-700 bg-opacity-75 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400"
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-xl font-bold text-gray-700"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              onChange={handleChange}
              placeholder="Enter your last name"
              className="w-full px-3 py-2 border border-gray-300 text-white bg-teal-700 bg-opacity-75 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-xl font-bold text-white"
            >
              Email{" "}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 text-white bg-teal-700 bg-opacity-75 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-xl font-bold text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              required
              placeholder="Create a password"
              className="w-full px-3 py-2 border border-gray-300 text-white bg-teal-700 bg-opacity-75 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserRegister;
