import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import loginBg from "../assets/signup-signin.svg";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const LogIn = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate(); // Use useNavigate hook
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Must be at least 6 characters")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await signIn(values.email, values.password);
        toast.success("User logged in successfully");
        if (!!response.user) {
          navigate("/");
        }
      } catch (error) {
        console.log("error...", error.code);
        if (error.code === "auth/invalid-credential") {
          console.log("Invalid credentials.");
          return toast.error("Invalid credentials");
        } else if (error.code === "auth/user-not-found") {
          return toast.error("No user found with this email.");
        } else if (error.code === "auth/too-many-requests") {
          return toast.error(
            "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later."
          );
        } else {
          return toast.error("Something went wrong");
        }
      }
    },
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="hidden md:flex md:w-1/2">
          <img
            src={loginBg}
            alt="Login background"
            className="object-cover w-full h-full"
            loading="lazy"
          />
        </div>
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-semibold text-gray-700 text-center">
            Welcome Back
          </h2>
          <p className="text-xl text-gray-600 text-center">
            Login to your account
          </p>
          <form className="mt-4" onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                className={`w-full px-4 py-2 bg-gray-200 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500"
                    : ""
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                className={`w-full px-4 py-2 bg-gray-200 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500"
                    : ""
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>
            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2 text-gray-700">Remember Me</span>
              </label>
              {/* <a href="#" className="text-sm text-gray-600 hover:underline">
                Forgot Password?
              </a> */}
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? "Submitting..." : "Log In"}
              </button>
            </div>
          </form>
          <p className="mt-8 text-center text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-indigo-500 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
