import { useState } from "react";
import GlideGoPng from "../../public/GlideGoLogo.png";
import { Link } from "react-router-dom";

const CaptainLogin = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setFormData({
      email: "",
      password: "",
    });
    // Add login logic here (API call, form validation, etc.)
  };

  return (
    <div className="container mx-auto p-8 bg-cover bg-center h-screen bg-[url('https://tse2.mm.bing.net/th?id=OIG4.VGj7VRQHiej.900iOhPd&pid=ImgGn')] relative">
      <Link to="/">
        <img
          src={GlideGoPng}
          alt="GlideGo"
          className="w-16 h-16 rounded-full absolute left-0 top-0 p-2 m-3"
        />
      </Link>
      <div className="max-w-lg mx-auto bg-teal-900 bg-opacity-50 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-teal-500 mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-lg text-teal-400">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="p-3 py-1 text-white border bg-teal-700 bg-opacity-50 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-lg text-teal-400">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="p-3 py-1 text-white border bg-teal-700 bg-opacity-50 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-6 w-full p-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition duration-300"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-white">
            New here?
            <Link
              to="/captains/register"
              className="text-teal-200 hover:underline ml-1"
            >
              Create an Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CaptainLogin;
