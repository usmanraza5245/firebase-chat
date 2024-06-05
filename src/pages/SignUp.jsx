import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import signupBg from "../assets/signup-signin.svg";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const SignUp = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Must be at least 6 characters")
        .required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      // Handle form submission
      try {
        const response = await signUp({
          name: values.name,
          email: values.email,
          password: values.password,
        });
        toast.success("User registered successfully");
        navigate("/");
      } catch (error) {
        if (error.code === "auth/email-already-in-use") {
          console.log("Email already in use.");
          toast.error("Email already in use.");
        } else if (error.code === "auth/invalid-email") {
          console.log("Invalid email.");
          toast.error("Invalid email.");
        } else if (error.code === "auth/operation-not-allowed") {
          console.log("Operation not allowed.");
          toast.error("Operation not allowed.");
        } else if (error.code === "auth/weak-password") {
          console.log("Weak password.");
          toast.error("Weak password.");
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
            src={signupBg}
            alt="Signup background"
            className="object-cover w-full h-full"
            loading="lazy"
          />
        </div>
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-semibold text-gray-700 text-center">
            Create an Account
          </h2>
          <form className="mt-4" onSubmit={formik.handleSubmit}>
            <div className="flex flex-wrap -mx-3 mb-4">
              <div className="w-full px-3 mb-4 md:mb-0">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  className={`w-full px-4 py-2 bg-gray-200 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                    formik.touched.name && formik.errors.name
                      ? "border-red-500"
                      : ""
                  }`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.name}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-4">
              <div className="w-full px-3 mb-4 md:mb-0">
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
            </div>
            <div className="flex flex-wrap -mx-3 mb-4">
              <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
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
              <div className="w-full md:w-1/2 px-3">
                <label className="block text-gray-700">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className={`w-full px-4 py-2 bg-gray-200 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                      ? "border-red-500"
                      : ""
                  }`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                />
                {formik.touched.confirmPassword &&
                formik.errors.confirmPassword ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.confirmPassword}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? "Signing Up..." : "Sign Up"}
              </button>
            </div>
          </form>
          <p className="mt-8 text-center text-gray-600">
            Already have an account?
            <Link to="/" className="text-indigo-500 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
