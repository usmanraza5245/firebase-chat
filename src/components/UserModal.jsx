// UserModal.js
import React, { useState } from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    minWidth: "600px",
    maxHeight: "600px",
  },
};

Modal.setAppElement("#root");
const UserModal = ({ isOpen, onRequestClose, users, handleSelectChat }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">User List</h2>
        <ul className="space-y-2">
          {users.map((user) => (
            <li
              key={user.id}
              className={`flex items-center px-1 gap-5 cursor-pointer p-2 ${
                selectedUser?.id === user.id && "active"
              }`}
              onClick={() => setSelectedUser(user)}
            >
              <img
                src={user.photoURL}
                alt="Profile pic"
                className="w-10 h-10 rounded-full"
                loading="lazy"
              />
              <div className="flex flex-col">
                <h5 className="text-lg font-semibold">{user.displayName}</h5>
                <span className="mr-2">{user.email}</span>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex justify-end gap-3 pt-3">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={onRequestClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => handleSelectChat(selectedUser)}
          >
            Select
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default UserModal;
