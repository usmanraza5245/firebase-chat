import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import myImg from "../assets/profile.jpg";
import { useAuth } from "../context/AuthContext";
import { updateProfile } from "firebase/auth";
import { updateUser } from "../services/user";
import { toast } from "react-toastify";

const Profile = () => {
  const { currentUser, uploadProfileImage } = useAuth();
  console.log("currentUser...", currentUser);
  const [profilePicture, setProfilePicture] = useState(currentUser.photoURL);
  const [fullName, setFullName] = useState(currentUser.displayName);
  const [email, setEmail] = useState(currentUser.email);
  const [image, setImage] = useState(null);
  const [imageBlob, setImageBlob] = useState(null);
  // const [oldPassword, setOldPassword] = useState("");
  // const [newPassword, setNewPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const arrayBuffer = e.target.result;
        const blob = new Blob([arrayBuffer], { type: file.type });

        // Save the blob in state
        setImageBlob(URL.createObjectURL(blob));
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newData = {
      displayName: fullName,
    };

    if (image) {
      try {
        const photoURL = await uploadProfileImage(currentUser.uid, image);
        newData.photoURL = photoURL;
        console.log("Profile image uploaded successfully:", photoURL);
      } catch (error) {
        console.error("Error uploading profile image:", error);
        // Optionally, you could handle the error by showing a message to the user
        return;
      }
    }

    try {
      await updateProfile(currentUser, newData);
      await updateUser(currentUser.uid, newData);
      console.log("Profile updated successfully");
      toast.success("Profile updated successfully");
      // Optionally, you could handle the success by showing a message to the user
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Error updating profile:", error);
      // Optionally, you could handle the error by showing a message to the user
    }
  };

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <button
          onClick={handleBackClick}
          className="absolute left-4 top-4 text-gray-600 hover:text-gray-900"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h1 className="text-2xl font-bold mb-4 text-center">Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col items-center space-y-4">
            <img
              className="w-24 h-24 rounded-full"
              src={imageBlob || profilePicture}
              alt="Profile"
              loading="lazy"
            />
            <label className="block">
              <span className="sr-only">Choose profile photo</span>
              <input
                type="file"
                className="hidden"
                id="profile-picture-input"
                onChange={handleProfilePictureChange}
              />
              <label
                htmlFor="profile-picture-input"
                className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Change Profile Picture
              </label>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              disabled
            />
          </div>

          {/* <div>
            <label className="block text-sm font-medium text-gray-700">
              Old Password
            </label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div> */}

          <button
            type="submit"
            className="w-full mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-500"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
