// src/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import { auth, storage } from "../services/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { createUser } from "../services/user";
import Loader from "../components/Loader";

const AuthContext = createContext();

const photoURL =
  "https://firebasestorage.googleapis.com/v0/b/fir-chat-1d306.appspot.com/o/profileImages%2Favatar.jpeg?alt=media&token=bc69b522-ec28-406f-96d8-85a86150376f";

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setIsAuthenticated(!!user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email, password) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setCurrentUser({
        ...userCredentials.user,
      });
      setIsAuthenticated(true);
      return userCredentials;
    } catch (error) {
      console.log("error...", error);
      throw error;
    }
  };

  const signUp = async ({ email, password, name }) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredentials.user, {
        displayName: name,
        photoURL,
      });
      const newUser = {
        displayName: name,
        email: userCredentials?.user?.email,
        photoURL: photoURL,
      };
      const userResponse = await createUser(
        newUser,
        userCredentials?.user?.uid
      );
      setCurrentUser({
        ...userCredentials.user,
        displayName: name,
      });
      setIsAuthenticated(true);
      return userCredentials;
    } catch (error) {
      console.log("error...", error.code);
      throw error;
    }
  };

  const logout = async () => {
    await signOut(auth);
    setCurrentUser(null);
    setIsAuthenticated(false);
    return true;
  };
  const uploadProfileImage = async (userId, image) => {
    try {
      const storageRef = ref(storage, `profileImages/${userId}`);
      await uploadBytes(storageRef, image);
      const photoURL = await getDownloadURL(storageRef);
      return photoURL;
    } catch (error) {
      throw error;
    }
  };
  const value = {
    currentUser,
    isAuthenticated,
    signIn,
    signUp,
    uploadProfileImage,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <Loader /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
