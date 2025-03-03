import { useContext, useState } from "react";
import GlideGoPng from "../../public/GlideGoLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { userDataContext } from "../context/UserContext";
import axios from "axios";

const UserLogin = () => {
  const { user, setUser } = useContext(userDataContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/login`,
      formData
    );
    if (response.status === 201) {
      const data = response.data  
      setUser(data.user)
        localStorage.setItem("token",data.token)
        navigate("/homeUser")
    }
    setFormData({
      email: "",
      password: "",
    });
    // Add login logic here (API call, form validation, etc.)
  };

  return (
    <div className="container mx-auto p-8 bg-cover bg-center h-screen bg-[url('https://tse4.mm.bing.net/th?id=OIG4.WrbfZ9VHz3wgm1uckTfr&pid=ImgGn')] relative">
      <Link to="/">
        <img
          src={GlideGoPng}
          alt="GlideGo"
          className="w-16 h-16 rounded-full absolute left-0 top-0 p-2 m-3"
        />
      </Link>
      <div className="max-w-lg mx-auto bg-[#D9C8A0] bg-opacity-35 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-[#9C6644] mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-lg text-[#705D46]">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="p-3 py-1 border border-[#D9C8A0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C3A580] bg-[#FFF7DF] text-[#705D46]"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-lg text-[#705D46]">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="p-3 py-1 border border-[#D9C8A0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C3A580] bg-[#FFF7DF] text-[#705D46]"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-6 w-full p-3 bg-[#F1DCA7] text-[#705D46] font-semibold rounded-lg hover:bg-[#ECD7A5] transition duration-300"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-[#ca8531]">
            New here?
            <Link
              to="/users/register"
              className="text-[#9C6644] font-semibold hover:underline ml-1"
            >
              Create an Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
