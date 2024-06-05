import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import myImg from "../assets/profile.jpg";
import { useAuth } from "../context/AuthContext";
import StatusSvg from "./StatusSvg";
import ChatSvg from "./ChatSvg";
import MorevertIcon from "./MorevertIcon";
import { getAllUsers, getUserById } from "../services/user";
import UserModal from "./UserModal";
import { createChatRoom } from "../services/chat-room";

function Header({ isModalOpen, setIsModalOpen, setRooms, setLoading }) {
  const { currentUser, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const handleProfileClick = () => {
    navigate("/profile");
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const openUsersModal = () => {
    setIsModalOpen(true);
  };

  const handleLogout = async () => {
    // Perform logout logic here if needed
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.log("error.....", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const allUsers = await getAllUsers();
      setUsers([...allUsers.filter((user) => user.id !== currentUser.uid)]);
    } catch (error) {}
  };

  const createNewChat = async (user) => {
    try {
      setLoading(true);
      const userChatRoom = await createChatRoom(
        currentUser.uid,
        user.id,
        "personal"
      );
      console.log("userChatRoom", userChatRoom);
      const recipientUser = await getUserById(user.id);
      const newChatRoom = {
        groupPhoto: "",
        id: userChatRoom.id,
        name: "Personal Chat",
        type: "personal",
        recipient: recipientUser,
      };
      setRooms((previousRooms) => [...previousRooms, newChatRoom]);
    } catch (error) {
    } finally {
      setIsModalOpen(false);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className="py-2 px-3 bg-gray-200 flex flex-row justify-between items-center">
      <div>
        <button className="flex" onClick={handleProfileClick}>
          <img
            className="w-10 h-10 rounded-full"
            src={currentUser.photoURL}
            loading="lazy"
          />
          <p className="p-2">{currentUser.displayName}</p>
        </button>
      </div>

      <div className="flex">
        {/* <div>
          <StatusSvg />
        </div> */}
        <div className="mr-3 flex items-center mb-[2px]">
          <button onClick={openUsersModal} className="flex items-center">
            <ChatSvg />
          </button>
        </div>
        <div className="relative flex">
          <button onClick={toggleMenu} className="flex items-center">
            <MorevertIcon />
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-8 w-fit bg-white rounded-md shadow-lg z-10">
              <button
                onClick={handleLogout}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
      {isModalOpen && (
        <UserModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          users={users}
          handleSelectChat={createNewChat}
        />
      )}
    </div>
  );
}

export default Header;
